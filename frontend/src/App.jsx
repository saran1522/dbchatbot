import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const listRef = useRef(null);
  useEffect(() => {
    const handleBotResponse = async (e) => {
      if (e.key === "Enter" && inputText) {
        setInput("");
        try {
          const apiUrl = "http://localhost:3000/webhook";
          const response = await axios.post(apiUrl, {
            message: inputText,
          });

          const splitString = response.data.response.split("->");
          const convo = { input: inputText, botResponse: splitString };
          setConversation((prevConvo) => [...prevConvo, convo]);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    document.addEventListener("keydown", handleBotResponse);

    return () => {
      document.removeEventListener("keydown", handleBotResponse);
    };
  }, [inputText]);

  function addQuestion(e) {
    setInput(e.target.innerText);
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [conversation]);

  return (
    <main className={`mainBox ${isDark ? "dark" : ""}`}>
      <div className="toggle">
        {isDark ? (
          <img src="\sun.png" alt="" onClick={() => setIsDark(false)} />
        ) : (
          <img src="\moon.png" alt="" onClick={() => setIsDark(true)} />
        )}
      </div>
      <section className="chatContainer">
        <div className="botHeader">
          <h1>Dayalbagh's Unique Model Of SDGs Achievement Explorer Chatbot</h1>
        </div>
        {conversation.length > 0 ? (
          <div className={`output ${isDark ? "dark" : ""}`}>
            {conversation.map((convo, i) => {
              return (
                <div key={i} className="conversationSet" ref={listRef}>
                  <div className="question">
                    <img src="user.png" alt="" />
                    {`${convo.input}`}
                  </div>
                  <div className="answer">
                    <img src="bot.png" alt="" />
                    {convo.botResponse.map((res, i) => {
                      return (
                        <p key={i}>
                          {i >= 1 && i < convo.botResponse.length
                            ? ` • ${res}`
                            : ` ${res} \n\n\n`}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="intro">
              <p className="introPara">
                I am the bot built to do conversation about dayalbagh and its
                sustainable development model.
              </p>
              <p>Here are some example Questions to start with:</p>
              <ul className="example-question">
                <li onClick={addQuestion}>What is dayalbagh?</li>
                <li onClick={addQuestion}>Education Model of dayalbagh</li>
                <li onClick={addQuestion}>
                  What are the agricultural practices in dayalbagh?
                </li>
                <li onClick={addQuestion}>Explain me Sigma Six QVA model</li>
                <li onClick={addQuestion}>
                  How dayalbagh is achieving sustainalbe devlelopment goals
                </li>
              </ul>
            </div>
          </>
        )}
        <div className={`inputBox ${isDark ? "dark" : ""}`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask something..."
          />
          <img
            src="https://icons8.com/icon/mUkoi5cNdORz/right-arrow"
            alt=""
            className="askIcon"
          />
        </div>
      </section>
    </main>
  );
}

export default App;
