import io
import os
import torch
from torchvision import transforms
from PIL import Image
from flask import Flask, request, jsonify, send_file

app = Flask(__name__)

# Load the custom YOLOv5 model from the weights file
model = torch.hub.load('ultralytics/yolov5', 'custom', path='/Users/alaapjoshi/Developer/Hackathons/CropProphet/aiserver/best.pt', source='local')

# Set the model to evaluation mode
model.eval()


def process_image(image):
    # Preprocess the input image
    preprocess = transforms.Compose([
        transforms.Resize(640),
        transforms.ToTensor(),
    ])
    image_tensor = preprocess(image).unsqueeze(0)

    # Run inference on the model
    results = model(image_tensor)

    # Get the predicted image
    predicted_image = results.render()[0]

    return predicted_image


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if an image is sent as part of the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        # Get the uploaded image from the request
        image = request.files['image'].read()

        # Load the image using PIL
        image = Image.open(io.BytesIO(image))

        # Process the image using the YOLOv5 model
        processed_image = process_image(image)

        # Save the processed image to a temporary file
        temp_file = '/tmp/predicted_image.jpg'
        processed_image.save(temp_file)

        # Return the processed image as a response
        return send_file(temp_file, mimetype='image/jpeg')

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

