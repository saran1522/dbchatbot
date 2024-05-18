from flask import Flask, render_template, request, jsonify
import requests
from flask_cors import CORS

RASA_API_URL = 'http://localhost:5005/webhooks/rest/webhook'
app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/webhook', methods=['POST'])
def webhook():
    user_message = request.json['message']
    
    rasa_response = requests.post(RASA_API_URL, json={'message': user_message})
    rasa_response_json = rasa_response.json()

    bot_response = rasa_response_json[0]['text'] if rasa_response_json else 'Sorry, I didn\'t understand that.'

    return jsonify({'response': bot_response})


if __name__ == "__main__":
    app.run(debug=True, port=3000)
