from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("packing_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = f"{data['destination']}_{data['duration']}_{data['weather']}"
    
    # Dummy prediction logic (replace with actual model prediction)
    packing_items = model.predict(np.array([[features]]))[0]

    return jsonify({"packing_list": packing_items})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
