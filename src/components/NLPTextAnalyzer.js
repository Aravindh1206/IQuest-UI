// NLPTextAnalyzer.js
import { Close } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import NLPTextAnalyzerForm from "./NLPTextAnalyzerForm"; // Replace with your actual form component for NLP Text Analysis

const NLPTextAnalyzer = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Typography>NLP Text Analysis</Typography>

      <Button
        variant="outlined"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Analyze Text
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="nlp-text-analyzer-modal-title"
        aria-describedby="nlp-text-analyzer-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ outline: 'none' }}>
          <NLPTextAnalyzerForm onClose={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
};

export default NLPTextAnalyzer;
