import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UploadVidrios from "../../UploadComponents/UploadVidrios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../Title";
import { crearPedido } from "../../../../hooks/Pedidos/Vidrios/crearPedidoVidrios";
import getCurrentDate from "../../../../hooks/getCurrentDate";

const PedidoVidriosForm = ({ onClose, onSubmit }) => {
  const Today = getCurrentDate();
  const [uploadedData, setUploadedData] = useState([]);
  const [NroPedido, setNroPedido] = useState("");
  const [Obra, setObra] = useState("");
  const [Cliente, setCliente] = useState("");
  const [Fecha, setFecha] = useState(Today);

  const handleFileUpload = async (jsonData) => {
    const dataToUpload = [];

    for (const row of jsonData) {
      if (
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      ) {
        const [Tipologia, Ancho, Alto, Cantidad, Composicion, Recepciones] =
          row;

        dataToUpload.push({
          Codigo: Tipologia + "-" + Ancho + "-" + Alto,
          Tipologia,
          Ancho,
          Alto,
          Cantidad,
          Composicion,
          Recepciones: [],
        });
      }
    }

    setUploadedData(dataToUpload);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (Obra === "" || NroPedido === "" || Fecha === "") {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    try {
      crearPedido(Cliente, Obra, Fecha, NroPedido, uploadedData);

      console.log("Todos los materiales han sido cargados con éxito.");

      setUploadedData([]);
      setCliente("");
      setObra("");
      setFecha("");
      setNroPedido("");
      onClose();
      onSubmit();
    } catch (error) {
      console.error("Error al crear el pedido:", error);

      console.error(
        "Error al actualizar la base de datos o al crear pedidos de vidrios:",
        error
      );
    }
  };

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Crear Pedido de Vidrios Nuevo</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-50"
          name="Obra"
          placeholder="Nombre del Cliente"
          value={Cliente}
          onChange={(e) => setCliente(e.target.value)}
          label="Nombre del Cliente"
        />
        <TextField
          type="text"
          className="form-control mx-3 mt-3 w-50"
          name="Obra"
          placeholder="Nombre de la Obra"
          value={Obra}
          onChange={(e) => setObra(e.target.value)}
          label="Nombre de la Obra"
        />
      </Grid>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 pe-3 w-50"
          name="NroPedido"
          placeholder="Nro. de Pedido"
          value={NroPedido}
          onChange={(e) => setNroPedido(e.target.value)}
          label="Nro. de Pedido"
        />

        <TextField
          type="date"
          className="form-control mt-3 w-25"
          name="Fecha"
          placeholder="Fecha"
          value={Fecha}
          onChange={(e) => setFecha(e.target.value)}
          label="Fecha de Pedido"
        />
      </Grid>
      <UploadVidrios onFileUpload={handleFileUpload} onClose={onClose} />
      <React.Fragment>
        <Title>Listado de Materiales a Cargar</Title>
        <Grid
          sx={{
            height: 280,
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
                <TableCell className="text-center fw-bold">Tipología</TableCell>
                <TableCell className="text-center fw-bold">
                  Ancho [mm.]
                </TableCell>
                <TableCell className="text-center fw-bold">
                  Alto [mm.]
                </TableCell>
                <TableCell className="text-center fw-bold">Cantidad</TableCell>
                <TableCell className="text-center fw-bold">
                  Composición
                </TableCell>
              </TableRow>
            </TableHead>
            {uploadedData.length > 0 && (
              <TableBody sx={{}}>
                {uploadedData.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center" sx={{ width: "10%" }}>
                      {material.Tipologia}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Ancho}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Alto}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Cantidad}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Composicion}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Grid>
      </React.Fragment>

      <Button
        variant="contained"
        color="primary"
        size="medium"
        type="submit"
        className="mt-4"
        sx={{ float: "right" }}
      >
        Crear Pedido
      </Button>
    </form>
  );
};

export default PedidoVidriosForm;
