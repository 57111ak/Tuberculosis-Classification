import React, { useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

export const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    previewImageFile(file);
  };

  const previewImageFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post(
          "http://localhost:5000/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setPrediction(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Determine the text color based on prediction result
  const resultColor = prediction?.result === "Positive" ? "text-red-600" : "text-green-600";

  // Donut chart options
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Confidence', 'Remaining'],
    style:{
        fontSize:"108px"
    },
    colors: ['#00E396', '#f2f2f2'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff', '#000000'], // Change the colors of the labels
        fontSize: '14px', // Optionally adjust the font size
      },
    },

    
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
  };

  const chartSeries = [prediction?.confidence || 0, 100 - (prediction?.confidence || 0)];

  return (
    <div className="text-white w-full">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button className="bg-green-800 p-4 rounded-xl text-bold text-xl" type="submit">
          Predict
        </button>
      </form>
         
      {previewImage && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Image Preview:</h2>
          <img src={previewImage} alt="Preview" className="mt-2 w-full h-auto rounded-lg border max-w-md" />
        </div>
      )}

      {prediction && (
        <div className="mt-4">
          <div>
            <h2 className="text-3xl font-bold">Prediction Result:</h2>
            <p className="text-xl">
              Result: <span className={resultColor}>{prediction.result}</span>
            </p>
            <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
          </div>
          <div className="mt-4">
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
