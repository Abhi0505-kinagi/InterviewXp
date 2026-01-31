from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api/ml/*": {"origins": "*"}}) 
# Load models (gracefully handle missing files)
import os

def try_load(path):
    # try given path, then path relative to this file
    try:
        model = joblib.load(path)
        print(f"Loaded model from {path}")
        return model
    except FileNotFoundError:
        alt = os.path.join(os.path.dirname(__file__), path)
        try:
            model = joblib.load(alt)
            print(f"Loaded model from {alt}")
            return model
        except FileNotFoundError:
            print(f"Model file not found: {path} nor {alt}")
            return None
        except Exception as e2:
            print(f"Error loading model {alt}: {e2}")
            return None
    except Exception as e:
        print(f"Error loading model {path}: {e}")
        return None

sentiment_model = try_load("interview_sentiment_model.pkl")
selection_model = try_load("interview_selection_model.pkl")

CONFIDENCE_THRESHOLD = 0.65

def format_response(model_name, text, prediction, probability, label_map):
    decision = (
        "Selected" if probability >= CONFIDENCE_THRESHOLD else
        "Rejected" if probability <= (1 - CONFIDENCE_THRESHOLD) else
        "Review Required"
    )

    return {
        "status": "success",
        "model": model_name,
        "input_text": text,
        "result": {
            "label": label_map[prediction],
            "prediction": int(prediction),
            "confidence": round(float(probability), 3),
            "decision": decision
        }
    }

@app.route("/")
def home():
    status = "running" if (sentiment_model is not None and selection_model is not None) else "partial"
    details = {
        "sentiment_loaded": sentiment_model is not None,
        "selection_loaded": selection_model is not None
    }
    return jsonify({
        "status": status,
        "message": "ML Backend is running",
        "details": details
    })

@app.route("/predict/sentiment", methods=["POST"])
def predict_sentiment():
    data = request.json

    if not data or "text" not in data:
        return jsonify({
            "status": "error",
            "message": "Text field is required"
        }), 400

    if sentiment_model is None:
        return jsonify({"status": "error", "message": "Sentiment model not loaded"}), 500

    text = data["text"]

    prediction = sentiment_model.predict([text])[0]
    probability = sentiment_model.predict_proba([text])[0].max()

    label_map = {0: "Negative", 1: "Positive"}

    response = format_response(
        model_name="Interview Sentiment",
        text=text,
        prediction=float(prediction),
        probability=probability,
        label_map=label_map
    )

    return jsonify(response)

@app.route("/predict/selection", methods=["POST"])
def predict_selection():
    data = request.json

    if not data or "text" not in data:
        return jsonify({
            "status": "error",
            "message": "Text field is required"
        }), 400

    if selection_model is None:
        return jsonify({"status": "error", "message": "Selection model not loaded"}), 500

    text = data["text"]

    prediction = selection_model.predict([text])[0]
    probability = selection_model.predict_proba([text])[0].max()

    label_map = {0: "Rejected", 1: "Selected"}

    response = format_response(
        model_name="Interview Selection",
        text=text,
        prediction=float(prediction),
        probability=probability,
        label_map=label_map
    )

    return jsonify(response)

if __name__ == "__main__":
    import os
    PORT = int(os.environ.get("ML_PORT", 8000))
    HOST = os.environ.get("ML_HOST", "127.0.0.1")
    print(f"Starting ML Flask on {HOST}:{PORT}")
    app.run(debug=True, host=HOST, port=PORT)
