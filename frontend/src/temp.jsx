import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const listRef = useRef(null);
  useEffect(() => {
    // const controller = new AbortController();

    // const signal = controller.signal;
    const handleBotResponse = async (e) => {
      if (e.key === "Enter" && inputText) {
        setInput("");
        try {
          const apiUrl = "http://localhost:3000/webhook";
          const response = await axios.post(apiUrl, {
            message: inputText,
            // signal: signal,
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
      // controller.abort();
      document.removeEventListener("keydown", handleBotResponse);
    };
  }, [inputText]);

  function addQuestion(e) {
    setInput(e.target.innerText);
  }

  useEffect(() => {
    // Scroll the new element into view after it's added to the DOM
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [conversation]);

  return (
    <main className="mainBox">
      {/* <sidbar>History here</sidbar> */}
      <section className="chatContainer">
        <div className="botHeader">
          {/* <h1>Dayalbagh Model Chatbot</h1> */}
          <h1>Dayalbagh's Unique Model Of SDGs Achievement Explorer Chatbot</h1>
        </div>
        {conversation.length > 0 ? (
          <div className="output">
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
                {/* <li>Tell me the history of dayalbagh?</li> */}
                <li onClick={addQuestion}>Education Model of dayalbagh</li>
                <li onClick={addQuestion}>
                  What are the agricultural practices in dayalbagh?
                </li>
                {/* <li>Sprituality in dayalbagh</li> */}
                {/* <li>How dayalbagh is doing technological developments</li> */}
                <li onClick={addQuestion}>Explain me Sigma Six QVA model</li>
                <li onClick={addQuestion}>
                  How dayalbagh is achieving sustainalbe devlelopment goals
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="inputBox">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask something..."
            // placeholder={place}
          />
          {/* <button className="ask">
            <img
              src="https://icons8.com/icon/mUkoi5cNdORz/right-arrow"
              alt=""
              className="askIcon"
            />
            ask
          </button> */}
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
