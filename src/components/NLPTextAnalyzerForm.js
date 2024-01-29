// NLPTextAnalyzerForm.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/NLPTextAnalyzerForm.css"; // Make sure to create this CSS file

const NLPTextAnalyzerForm = ({ onClose }) => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) {
      alert("Please enter some text to analyze.");
      return;
    }

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", { text: inputText });

      if (response.status === 200) {
        setResultText(response.data); // Assuming the response is the text you want to display
      } else {
        alert("Failed to analyze text. Please try again later.");
      }
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("An error occurred while analyzing the text.");
    }
  };

  return (
    <div className="text-analyzer-form-container">
      <div className="text-analyzer-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter text here..."
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Result..."
              value={resultText}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Analyze
          </button>
        </form>
      </div>
    </div>
  );
};

export default NLPTextAnalyzerForm;
