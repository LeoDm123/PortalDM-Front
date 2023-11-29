import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, TextField, Grid } from "@mui/material";
import UploadMatButton from "../Buttons/UploadMatButton";

const UploadMadera = ({ onFileUpload, onClose }) => {
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

        // Selecciona la primera hoja del libro (workbook.Sheets[1])
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir las filas desde la fila 16 hasta el final del archivo
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 15, // Comienza desde la fila 16
        });

        // Filtrar solo las columnas A, B y C
        const filteredData = jsonData.map((row) => {
          return [row[1], row[2], row[3], row[4], row[5], row[6]]; // Columnas  B, C, D, E, F y G
        });

        onFileUpload(filteredData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Grid
      display={"Flex"}
      sx={{
        width: "100%",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <UploadMatButton onChange={handleFileChange} />
      <TextField
        value={fileName}
        sx={{ width: "51.62%", marginX: 2 }}
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
  );
};

export default UploadMadera;
