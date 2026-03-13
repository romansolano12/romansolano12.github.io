import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
CORS(app)  # Allows your GitHub Pages frontend to access this backend

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("CRITICAL ERROR: No GEMINI_API_KEY found in environment variables.")


def is_safe(user_input):
    forbidden_phrases = [
        "ignore all previous instructions",
        "system prompt",
        "forget everything you know",
        "developer mode",
        "write a story",
        "tell me a joke"
    ]
    query_lower = user_input.lower()
    return not any(phrase in query_lower for phrase in forbidden_phrases)

# 3. CORE AI LOGIC (RAG)
def get_ai_response(user_query):
    if not is_safe(user_query):
        return "ACCESS_DENIED: I only answer professional questions about Roman Gonzalez."

    try:
        # Load the "Brain"
        with open("portfolio_data.txt", "r") as f:
            context = f.read()
            
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Construct the specialized prompt
        prompt = f"""
        SYSTEM INSTRUCTIONS:
        You are the AI version of Roman Gonzalez. Use the provided context to answer.
        {context}

        USER QUESTION:
        {user_query}

        FINAL INSTRUCTION:
        1. Answer based ONLY on the context.
        2. Keep it professional and concise.
        3. If the answer isn't in the data, point them to Roman's LinkedIn.
        4. Do not offer personal contact info like phone numbers.
        """

        response = model.generate_content(prompt)
        return response.text
        
    except FileNotFoundError:
        return "ERROR: KNOWLEDGE_BASE_OFFLINE. Please alert the developer."
    except Exception as e:
        print(f"debug_error:{e}")
        return f"SYSTEM_COOLING: I'm processing high traffic right now. Please try again in 60 seconds or reach out to the real Roman on LinkedIn!"

# 4. THE WEB API ROUTE
@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.json
    user_query = data.get("message", "")
    
    if not user_query:
        return jsonify({"response": "NO_DATA_RECEIVED"}), 400

    ai_answer = get_ai_response(user_query)
    return jsonify({"response": ai_answer})

# 5. EXECUTION
if __name__ == "__main__":
    # Render provides a 'PORT' environment variable. 
    # If it's not there (like when you run locally), it defaults to 10000.
    port = int(os.environ.get("PORT", 10000))
    
    # host='0.0.0.0' tells the app to listen on all available network interfaces
    app.run(host='0.0.0.0', port=port)