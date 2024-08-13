const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Path to the model JSON file
const modelPath = path.join(__dirname, 'models/model.json');
let model;

// Load the TensorFlow.js model
async function loadModel() {
    try {
        model = await tf.loadGraphModel(`file://${modelPath}`);
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

// Load the model when the server starts
loadModel();

// Image annotation function
function annotateImage(imagePath, outputPath, prediction) {
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Input file is missing: ${imagePath}`);
    }

    sharp(imagePath)
        .resize(224, 224)
        .toBuffer((err, data) => {
            if (err) throw err;

            sharp(data)
                .composite([{
                    input: Buffer.from(`<svg>
                        <rect x="10" y="10" width="200" height="50" fill="rgba(255,0,0,0.5)" />
                        <text x="20" y="40" font-size="20" fill="white">${prediction.result}: ${prediction.confidence.toFixed(2)}%</text>
                    </svg>`),
                    top: 0,
                    left: 0
                }])
                .toFile(outputPath, (err) => {
                    if (err) throw err;
                    console.log('Annotated image saved:', outputPath);
                });
        });
}

// Endpoint for image upload and prediction
app.post('/predict', upload.single('image'), async (req, res) => {
    try {
        if (!model) {
            return res.status(500).send('Model is not loaded');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imagePath = path.join(__dirname, req.file.path);
        const outputImage = `${req.file.buffer}`;
        console.log(outputImage)
        const outputImagePath = path.join(__dirname, 'uploads', outputImage);

        // Load image into tensor
        const imageBuffer = fs.readFileSync(imagePath);
        const tfImage = tf.node.decodeImage(imageBuffer);
        const resizedImage = tf.image.resizeBilinear(tfImage, [224, 224]);
        const inputTensor = resizedImage.expandDims(0).toFloat().div(tf.scalar(255));

        // Run inference
        const prediction = model.predict(inputTensor);
        const predictionArray = prediction.arraySync()[0];

        // Post-process prediction
        const classNames = ['Negative', 'Positive']; // Update this array based on your model's class names
        const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
        const result = classNames[maxIndex];
        const confidence = Math.max(...predictionArray) * 100;

        const predictionResult = { result, confidence };

        // Annotate image
        // annotateImage(imagePath, outputImagePath, predictionResult);

        // Cleanup
        fs.unlinkSync(imagePath);

        // Send response
        res.json({
            result: predictionResult.result,
            confidence: predictionResult.confidence,
            annotatedImage: outputImage
        });
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).send('Error during prediction');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
