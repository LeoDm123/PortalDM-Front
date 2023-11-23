import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, TextField, Grid } from "@mui/material";
import UploadMatButton from "../Buttons/UploadMatButton";

const UploadPerfiles = ({ onFileUpload, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Selecciona la segunda hoja del libro (workbook.Sheets[1])
        const sheetName = workbook.SheetNames[1];
        const sheet = workbook.Sheets[sheetName];

        // Convertir las filas desde la fila 11 hasta el final del archivo
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 10, // Comienza desde la fila 11
        });

        // Filtrar solo las columnas B, C, D y E
        const filteredData = jsonData.map((row) => {
          return [row[1], row[2], row[3], row[4], row[6]]; // Columnas B, C, D y E
        });

        onFileUpload(filteredData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Grid>
      <div className="d-flex justify-content-between mb-2"></div>
      <Grid
        display={"Flex"}
        sx={{ width: "100%", alignItems: "center", marginTop: 3 }}
      >
        <UploadMatButton onChange={handleFileChange} />
        <TextField
          value={fileName}
          sx={{ width: "48%", marginX: 2 }}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "100%" }}
          onClick={handleFileUpload}
        >
          Cargar a Pedido
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadPerfiles;
