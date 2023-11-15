import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Title from "../../Title";
import UploadComponent from "../UploadComponent";
import FormatCurrency from "../../../hooks/formatCurrency";
import { crearMaterial } from "../../../hooks/crearMaterial";

const AgregarMatList = ({ open, onClose, onMatSubmit }) => {
  const [uploadedData, setUploadedData] = useState([]);
  const formatCurrency = FormatCurrency();

  const handleFileUpload = async (jsonData) => {
    const dataToUpload = [];

    for (const row of jsonData) {
      if (
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      ) {
        const [
          Codigo,
          Detalle,
          Categoria,
          Unidad,
          Ancho,
          Alto,
          Largo,
          Espesor,
          Costo,
          StockSeguridad,
          StockInicial,
          Proveedor,
        ] = row;

        dataToUpload.push({
          Codigo,
          Detalle,
          Categoria,
          Unidad,
          Ancho,
          Alto,
          Largo,
          Espesor,
          Costo,
          StockSeguridad,
          StockInicial,
          Proveedor,
        });
      }
    }

    setUploadedData(dataToUpload);
  };

  const handleConfirmUpload = async () => {
    console.log("UploadedData", uploadedData);
    try {
      for (const material of uploadedData) {
        await crearMaterial(
          material.Codigo,
          material.Detalle,
          material.Categoria,
          material.Unidad,
          material.Ancho,
          material.Alto,
          material.Largo,
          material.Espesor,
          material.Costo,
          material.StockSeguridad,
          material.StockInicial,
          material.Proveedor
        );
      }

      console.log("Todos los materiales han sido cargados con éxito.");
      setUploadedData([]);
      onClose();
    } catch (error) {
      console.error("Error al cargar los materiales:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
        }}
        className="CreateModal"
      >
        <UploadComponent onFileUpload={handleFileUpload} onClose={onClose} />
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            marginTop: 2,
          }}
        >
          <React.Fragment>
            <Title>Listado de Materiales a Cargar</Title>
            <Grid
              sx={{
                height: 500,
                overflow: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "dark",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "lightgray",
                  borderRadius: "5px",
                },
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold">
                      Código
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Detalle
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Categoría
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Unidad
                    </TableCell>
                    <TableCell className="text-center fw-bold">Ancho</TableCell>
                    <TableCell className="text-center fw-bold">Alto</TableCell>
                    <TableCell className="text-center fw-bold">Largo</TableCell>
                    <TableCell className="text-center fw-bold">
                      Espesor
                    </TableCell>
                    <TableCell className="text-center fw-bold">Costo</TableCell>
                    <TableCell className="text-center fw-bold">
                      Stock de Seguridad
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Stock Actual
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Proveedor
                    </TableCell>
                  </TableRow>
                </TableHead>
                {uploadedData.length > 0 && (
                  <TableBody sx={{}}>
                    {uploadedData.map((material, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="text-center"
                          sx={{ width: "10%" }}
                        >
                          {material.Codigo}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Detalle}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Categoria}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Unidad}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Ancho}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Alto}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Largo}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Espesor}
                        </TableCell>
                        <TableCell className="text-center" sx={{ width: "5%" }}>
                          {formatCurrency(material.Costo)}
                        </TableCell>
                        <TableCell className="text-center" sx={{ width: "5%" }}>
                          {material.StockSeguridad}
                        </TableCell>
                        <TableCell className="text-center" sx={{ width: "5%" }}>
                          {material.StockInicial}
                        </TableCell>
                        <TableCell className="text-center">
                          {material.Proveedor}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Grid>

            <Button onClick={handleConfirmUpload} sx={{ marginTop: 2 }}>
              Confirmar Carga
            </Button>
          </React.Fragment>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AgregarMatList;
