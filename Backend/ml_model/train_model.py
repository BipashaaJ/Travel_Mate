#genarate report AI part
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Sample training data (adjust with real data)
data = pd.DataFrame({
    'destination': ['beach', 'mountain', 'city'],
    'duration': [3, 5, 7],
    'weather': ['hot', 'cold', 'rainy'],
    'packing_list': [
        ['swimsuit', 'sunscreen', 'flip-flops'],
        ['hiking boots', 'warm layers', 'backpack'],
        ['comfortable shoes', 'map', 'jacket']
    ]
})

# Simple encoding function
def encode_features(row):
    return f"{row['destination']}_{row['duration']}_{row['weather']}"

data['features'] = data.apply(encode_features, axis=1)
X = data['features']
y = data['packing_list']

# Train Model
model = RandomForestClassifier()
model.fit(np.arange(len(X)).reshape(-1, 1), y)

# Save Model
joblib.dump(model, 'packing_model.pkl')
print("Model Saved Successfully!")




