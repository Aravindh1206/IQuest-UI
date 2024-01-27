// ImageUploadForm.js
import React, { useState, useRef } from 'react';
import '../styles/ImageUploadForm.css'; // Import your CSS file

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);

  const handleTakePicture = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL('image/png');
    setImage(capturedImage);
    videoRef.current.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., upload image)
    console.log('Image uploaded:', image);
  };

  return (
    <div className="upload-form-container">
    <div className="upload-form">
      <h1 className="form-title">Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image" className="form-label">Choose an image:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="button" onClick={handleTakePicture} className="btn btn-primary">Take a picture</button>
        <button type="button" onClick={handleCapture} className="btn btn-primary">Capture</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {image && (
        <div className="preview-container">
          <h2 className="preview-title">Preview:</h2>
          <img src={image} alt="Preview" className="image-preview" />
        </div>
      )}
      <video ref={videoRef} style={{ display: 'none' }} />
    </div>
    </div>
  );
};

export default ImageUploadForm;
