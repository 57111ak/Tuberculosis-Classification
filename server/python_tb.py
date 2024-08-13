import argparse
import json
import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Replace with the correct path to your model
model = load_model('model.h5')

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image at path {image_path} could not be read.")
    image = cv2.resize(image, (224, 224))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def postprocess_prediction(prediction):
    class_names = ['Negative', 'Positive']
    predicted_class = class_names[np.argmax(prediction)]
    confidence = np.max(prediction) * 100
    return {'result': predicted_class, 'confidence': confidence}

def annotate_image(image_path, output_path, prediction):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image at path {image_path} could not be read.")
    label = f"TB: {prediction['result']} ({prediction['confidence']:.2f}%)"
    cv2.putText(image, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
    if not cv2.imwrite(output_path, image):
        raise IOError(f"Failed to write image to {output_path}")

def main():
    parser = argparse.ArgumentParser(description='Predict TB from X-ray images.')
    parser.add_argument('--input', required=True, help='Path to input image')
    parser.add_argument('--output', required=True, help='Path to output image')
    args = parser.parse_args()

    image = preprocess_image(args.input)
    prediction = model.predict(image)
    result = postprocess_prediction(prediction)
    annotate_image(args.input, args.output, result)

    print(json.dumps(result))

if __name__ == '__main__':
    main()
