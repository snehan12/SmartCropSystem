# 🌾 SmartCropSystem

An AI-powered **Crop Recommendation System** that analyzes soil and environmental parameters to suggest the most suitable crop for cultivation, along with water footprint analysis and irrigation suggestions.

---

## 📸 Overview

SmartCropSystem uses a **Machine Learning model (Random Forest Classifier)** trained on real agricultural data to predict the best crop based on:

- **Soil nutrients** — Nitrogen (N), Phosphorus (P), Potassium (K)
- **Environmental conditions** — Temperature, Humidity, Rainfall, pH

It also calculates the **water footprint** (blue, green, and grey water) for the recommended crop and provides **water-saving suggestions** tailored to the footprint.

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Python 3.11 | Runtime |
| Flask | REST API web framework |
| Flask-CORS | Cross-Origin Resource Sharing |
| Flasgger (Swagger) | API documentation |
| scikit-learn | Machine Learning (Random Forest) |
| pandas | Data processing |

---

## 📁 Project Structure

```
SmartCropSystem/
├── .gitignore
├── README.md
└── SmartCropSystem/
    └── frontend/
        ├── index.html
        ├── package.json
        ├── vite.config.ts
        ├── tailwind.config.js
        ├── tsconfig.json
        ├── .gitignore
        ├── src/
        │   ├── App.tsx                  # Root component & routing
        │   ├── main.tsx                 # Entry point
        │   ├── index.css                # Global styles
        │   ├── components/
        │   │   ├── Header.tsx           # Navigation header
        │   │   ├── HomePage.tsx         # Landing page
        │   │   ├── SoilInputForm.tsx    # Input form for soil data
        │   │   └── ResultsPage.tsx      # Crop recommendation results
        │   └── utils/
        │       └── api.ts               # API call utilities
        └── backend/
            ├── app.py                   # Flask API server
            ├── train_model.py           # ML model training script
            ├── requirements.txt         # Python dependencies
            ├── Crop_recommendation.csv  # Training dataset
            ├── Water_Footprint.csv      # Water footprint data
            └── crop_recommendation_model.pkl  # Trained ML model
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v18+ and **npm**
- **Python** 3.11+
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/SmartCropSystem.git
cd SmartCropSystem
```

---

### 2. Backend Setup (Flask + Python)

```bash
# Navigate to the backend folder
cd SmartCropSystem/frontend/backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the ML model (generates crop_recommendation_model.pkl)
python train_model.py

# Start the Flask server
python app.py
```

> The backend will start at **http://localhost:5000**

---

### 3. Frontend Setup (React + Vite)

Open a **new terminal**:

```bash
# Navigate to the frontend folder
cd SmartCropSystem/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

> The frontend will start at **http://localhost:5173**

---

## 🚀 Running the Application

Once both servers are running, open your browser and go to:

| Service | URL |
|---|---|
| 🌐 Frontend App | http://localhost:5173 |
| ⚙️ Backend API | http://localhost:5000 |
| 📖 Swagger API Docs | http://localhost:5000/apidocs |

---

## 🔌 API Reference

### `POST /predict`

Predicts the best crop based on soil and environmental inputs.

**Request Body (JSON):**

```json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 20.8,
  "humidity": 82.0,
  "ph": 6.5,
  "rainfall": 202.9
}
```

**Response:**

```json
{
  "crop": "rice",
  "explanation": "The recommended crop is rice because...",
  "water_footprint": {
    "blue_water": 38.5,
    "green_water": 105.61,
    "grey_water": 62.95,
    "total_water_footprint": 207.06
  },
  "water_saving_suggestions": [
    "Implement smart irrigation systems to optimize water usage.",
    "Practice crop rotation to improve soil health and reduce water needs."
  ]
}
```

---

## 🧠 Machine Learning Model

- **Algorithm**: Random Forest Classifier
- **Dataset**: `Crop_recommendation.csv` (2200 samples, 22 crop types)
- **Features**: N, P, K, temperature, humidity, pH, rainfall
- **Model Accuracy**: **99.32%** on test set
- **Framework**: scikit-learn

### Supported Crops (22 types)
rice, maize, chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil, pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya, coconut, cotton, jute, coffee

---

## 💧 Water Footprint Calculation

The system dynamically estimates water usage for each recommendation:

| Component | Description |
|---|---|
| 🔵 Blue Water | Surface/groundwater consumed |
| 🟢 Green Water | Rainwater absorbed by crops |
| ⚫ Grey Water | Water needed to dilute pollutants |

**Water-saving suggestions** are generated based on total footprint thresholds:
- **> 150 units**: High consumption — smart irrigation, crop rotation recommended
- **> 100 units**: Moderate — drip irrigation, soil monitoring recommended
- **≤ 100 units**: Efficient — continue current practices

---

## 📦 Dependencies

### Python (`requirements.txt`)
```
flask
flask-cors
flasgger
pandas
scikit-learn
```

### Node.js (`package.json`)
```
react, react-dom
lucide-react
vite, typescript
tailwindcss, autoprefixer, postcss
```

---

## 🛠️ Development Notes

- The **virtual environment** (`venv/`) is excluded from Git via `.gitignore`. Always recreate it locally using `pip install -r requirements.txt`.
- The **`node_modules/`** folder is excluded from Git. Run `npm install` after cloning.
- The trained model file (`crop_recommendation_model.pkl`) is included in the repo. If you update the dataset or training script, regenerate it with `python train_model.py`.
- The frontend communicates with the backend on `http://localhost:5000`. Make sure the Flask server is running before using the UI.

---



## 👩‍💻 Author

**Sneha**  
Built with ❤️ using React, Flask, and scikit-learn.
