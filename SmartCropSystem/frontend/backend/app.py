from flask import Flask, request, render_template
import pandas as pd
import pickle
import os
from flask import jsonify
from flask_cors import CORS
from flasgger import Swagger



app = Flask(__name__)
CORS(app) # Allow all origins
swagger = Swagger(app)

#app = Flask(__name__)

# Load the crop recommendation dataset
crop_data = pd.read_csv('Crop_recommendation.csv')

# Load the water footprint dataset
water_footprint_data = pd.read_csv('Water_Footprint.csv')

# Load the trained model
model_path = "crop_recommendation_model.pkl"

if os.path.exists(model_path):
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None
else:
    print(f"Model file not found at {model_path}")
    model = None

@app.route("/")
def home():
    return jsonify({"status": "Smart Crop System Backend API is running", "docs": "/apidocs"})


@app.route("/index")
def index():
    return jsonify({"status": "Smart Crop System Backend API is running", "docs": "/apidocs"})

#@app.route("/predict", methods=["POST"])
@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.get_json()

        N = int(data["N"])
        P = int(data["P"])
        K = int(data["K"])
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        ph = float(data["ph"])
        rainfall = float(data["rainfall"])

        input_features = [[N, P, K, temperature, humidity, ph, rainfall]]
        predicted_crop = model.predict(input_features)[0]

        explanation = generate_explanation(predicted_crop)
        water_footprint = calculate_water_footprint(predicted_crop, rainfall, temperature)
        water_saving_suggestions = generate_water_saving_suggestions(water_footprint['total_water_footprint'])

        return jsonify({
            "crop": predicted_crop,
            "explanation": explanation,
            "water_footprint": water_footprint,
            "water_saving_suggestions": water_saving_suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def calculate_water_footprint(crop, rainfall, temperature):
    """
    Dynamically calculate water footprint using rainfall and temperature.
    Replace with appropriate scientific models for real calculations.
    """
    # Placeholder formula for demonstration
    blue_water = max(0, 0.2 * rainfall - 0.1 * temperature)
    green_water = max(0, 0.5 * rainfall + 0.2 * temperature)
    grey_water = max(0, 0.3 * rainfall + 0.1 * temperature)
    # Calculate total water footprint
    total_water_footprint = blue_water + green_water + grey_water

    return {
        "blue_water": round(blue_water, 2),
        "green_water": round(green_water, 2),
        "grey_water": round(grey_water, 2),
        "total_water_footprint": round(total_water_footprint, 2),
    }

def generate_explanation(crop):
    """
    Generate a concise explanation for why the recommended crop is suitable.
    """
    crop_info = crop_data[crop_data['label'] == crop].iloc[0]

    explanation = (
        f"The recommended crop is {crop} because:\n"
        f"- It thrives well in soil with nitrogen levels around {crop_info['N']}.\n"
        f"- It requires phosphorus and potassium levels similar to {crop_info['P']} and {crop_info['K']}.\n"
        f"- This crop is suitable for temperatures around {crop_info['temperature']}°C "
        f"and humidity levels near {crop_info['humidity']}%.\n"
        f"- It prefers a soil pH of approximately {crop_info['ph']} and can handle rainfall "
        f"levels of about {crop_info['rainfall']} mm."
    )

    return explanation

def generate_water_saving_suggestions(water_footprint):
    """
    Generate water-saving suggestions based on the calculated water footprint.
    """
    if water_footprint > 150:
        return [
            "Implement smart irrigation systems to optimize water usage.",
            "Practice crop rotation to improve soil health and reduce water needs.",
            "Consider planting drought-resistant crops like sorghum or millet.",
            "Use mulch to reduce evaporation and increase soil moisture retention."
        ]
    elif water_footprint > 100:
        return [
            "Use drip irrigation for more targeted water delivery.",
            "Monitor soil moisture levels to avoid over-irrigation.",
            "Use rainwater harvesting systems to collect and store water."
        ]
    else:
        return [
            "Keep up with efficient water practices to maintain low consumption.",
            "Continue using native crops and minimal irrigation methods."
        ]

if __name__ == "__main__":
    app.run(debug=True)
