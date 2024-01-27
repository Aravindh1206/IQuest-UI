// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navigation";
import ImageProcessing from "./components/ImageProcessing";
import Aviation from "./components/Aviation";
import NLPTextAnalyzer from "./components/NLPTextAnalyzer";
import ButtonAppBar from "./components/NewNavBar";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <ButtonAppBar />
      <Routes>
        <Route exact path="/" component={App} />
        <Route path="/image-processing" element={<ImageProcessing />} />
        <Route path="/aviation" element={<Aviation />} />
        <Route path="/nlp-text-analyzer" element={<NLPTextAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
