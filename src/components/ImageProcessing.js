// ImageUploadForm.js
import { Close } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";

const ImageProcessing = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Typography>Blog</Typography>

      <Button
        variant="outlined"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Test our Product
      </Button>

      <Modal
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageUploadForm onClose={() => handleCloseModal()} />
      </Modal>
    </>
  );
};
export default ImageProcessing;
