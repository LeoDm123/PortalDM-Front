import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import fetchMatByID from "../../../../hooks/fetchMatByID";

const MatDetails = ({ open, onClose, matID }) => {
  const [Codigo, setCodigo] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Ancho, setAncho] = useState(0);
  const [Alto, setAlto] = useState(0);
  const [Largo, setLargo] = useState(0);
  const [Espesor, setEspesor] = useState(0);
  const [Costo, setCosto] = useState(0);
  const [StockInicial, setStockInicial] = useState(0);
  const [StockSeguridad, setStockSeguridad] = useState(0);
  const [Proveedor, setProveedor] = useState("");
  const matByID = fetchMatByID(matID);

  useEffect(() => {
    if (
      matID !== null &&
      typeof matByID === "object" &&
      Object.keys(matByID).length > 0
    ) {
      setCodigo(matByID.Codigo);
      setDetalle(matByID.Detalle);
      setCategoria(matByID.Categoria);
      setAncho(matByID.Ancho);
      setAlto(matByID.Alto);
      setLargo(matByID.Largo);
      setEspesor(matByID.Espesor);
      setCosto(matByID.Costo);
      setUnidad(matByID.Unidad);
      setStockInicial(matByID.StockInicial);
      setStockSeguridad(matByID.StockSeguridad);
      setProveedor(matByID.Proveedor);
    }
  }, [matID, matByID]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        {matByID && (
          <Grid>
            <div className="d-flex justify-content-between mb-2">
              <h1 className="h3">Detalles de material</h1>
              <HighlightOffIcon onClick={onClose} fontSize="large" />
            </div>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-75"
                name="Detalle"
                placeholder="Detalle"
                value={Detalle}
                label="Detalle"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 ms-3 w-25"
                name="Unidad"
                placeholder="Unidad"
                value={Unidad}
                label="Unidad"
                disabled
              />
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Codigo"
                placeholder="Codigo"
                value={Codigo}
                label="Codigo"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 mx-3 w-50"
                name="Categoria"
                placeholder="Categoria"
                value={Categoria}
                label="Categoria"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Proveedor"
                placeholder="Proveedor"
                value={Proveedor}
                label="Proveedor"
                disabled
              />
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Ancho"
                placeholder="Ancho"
                value={Ancho}
                label="Ancho [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Alto"
                placeholder="Alto"
                value={Alto}
                label="Alto [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 me-3 w-25"
                name="Largo"
                placeholder="Largo"
                value={Largo}
                label="Largo [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 w-25"
                name="Espesor"
                placeholder="Espesor"
                value={Espesor}
                label="Espesor [mm]"
                disabled
              />
            </Grid>

            <Grid display={"flex"} className="w-100">
              <TextField
                type="text"
                className="form-control my-3 me-3 w-50"
                name="StockInicial"
                placeholder="StockInicial"
                value={StockInicial}
                label="Stock Inicial"
                disabled
              />
              <TextField
                type="text"
                className="form-control my-3 me-3 w-50"
                name="StockSeguridad"
                placeholder="StockSeguridad"
                value={StockSeguridad}
                label="Stock de Seguridad"
                disabled
              />
              <TextField
                type="text"
                className="form-control my-3 w-50"
                name="Costo"
                placeholder="Costo"
                value={Costo}
                label="Costo Unitario"
                disabled
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Modal>
  );
};

export default MatDetails;
