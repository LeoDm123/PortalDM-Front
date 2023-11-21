import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadMatButton({ onChange }) {
  const handleFileChange = (e) => {
    onChange(e);
  };

  return (
    <Button
      sx={{ height: "100%" }}
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Seleccionar Archivo
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}
