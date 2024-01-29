import { Button } from "@mui/base";
import { Close } from "@mui/icons-material";
import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/ImageUploadForm.css";

const ImageUploadForm = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null); // State to store the response from the API
  const videoRef = useRef(null);

  const handleTakePicture = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL("image/png");
    setImage(capturedImage);
    videoRef.current.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("http://3.239.196.132:80/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setResult(response.data); // Store the response data in the state
      } else {
        alert("Failed to send image. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending image:", error);
      alert("An error occurred while sending the image.");
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-form">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "right" }}>
          <Button onClick={onClose}>
            <Close />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
          <div class="file-input-container">
                <input type="file" id="file-input" class="file-input" accept="image/*" />
                <p>Upload Image</p>
                <button type="button" className="browse-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Browse File</button>
          </div>
          <button
            type="button"
            onClick={handleTakePicture}
            className="btn btn-primary"
          >
            Take a picture
          </button>
          <button
            type="button"
            onClick={handleCapture}
            className="btn btn-primary"
          >
            Capture
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {image && (
          <div className="preview-container">
            <h2 className="preview-title">Preview:</h2>
            <img src={image} alt="Preview" className="image-preview" />
          </div>
        )}
        {result && (
          <div className="result-container">
            <h2 className="result-title">Result:</h2>
            <p className="result-text">{result}</p>
          </div>
        )}
        <video ref={videoRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default ImageUploadForm;
