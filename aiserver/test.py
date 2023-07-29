import torch
from torchvision import transforms
from PIL import Image

def load_yolo_model(weights_path):
    # Load the YOLOv5 model
    model = torch.hub.load('ultralytics/yolov5', 'custom', path="/Users/alaapjoshi/Developer/Hackathons/CropProphet/aiserver/best.pt", source='local')
    model.eval()  # Set the model to evaluation mode
    return model

def process_image(image_path, model):
    # Load the test image using PIL
    image = Image.open(image_path)

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

if __name__ == '__main__':
    # Path to the YOLOv5 custom weights file
    weights_path = '/Users/alaapjoshi/Developer/Hackathons/CropProphet/aiserver/best.pt'  # Replace with your actual file path

    # Path to the test image
    test_image_path = '/Users/alaapjoshi/Developer/Hackathons/CropProphet/aiserver/009_d90b1349_jpg.rf.24ea5bda746c70ab03299aa9070c8356.jpg'  # Replace with your actual file path

    # Load the YOLOv5 model
    model = load_yolo_model(weights_path)

    # Process the test image using the YOLOv5 model
    processed_image = process_image(test_image_path, model)

    # Save the processed image
    processed_image.save('output.jpg')

    print("Inference completed. The processed image has been saved as 'output.jpg'.")
