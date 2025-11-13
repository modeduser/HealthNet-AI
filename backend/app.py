from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/triage", methods=["POST"])
def triage():
    data = request.json

    symptoms = data.get("symptoms", "").lower()
    bp = data.get("bp", "")
    temp = float(data.get("temperature", 98))
    hr = int(data.get("heart_rate", 80))

    # --- SIMPLE AI LOGIC (RULE-BASED MODEL) ---

    urgency = "Low"
    action = "Monitor patient and provide basic treatment."
    confidence = 0.72

    # High urgency rules
    if ("chest pain" in symptoms or "breath" in symptoms) or hr > 120 or temp > 102:
        urgency = "High"
        action = "Immediate referral to district hospital recommended."
        confidence = 0.92

    # Medium urgency rules
    elif temp > 100 or hr > 100 or "fever" in symptoms:
        urgency = "Medium"
        action = "Refer to nearby clinic within 24 hours."
        confidence = 0.85

    response = {
        "urgency": urgency,
        "recommended_action": action,
        "confidence": confidence
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(port=5000)
