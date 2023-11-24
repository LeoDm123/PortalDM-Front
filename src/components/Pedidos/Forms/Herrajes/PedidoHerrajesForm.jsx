import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UploadHerrajes from "../../UploadComponents/UploadHerrajes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../Title";
import { crearPedido } from "../../../../hooks/Pedidos/Herrajes/crearPedidoHerrajes";
import getCurrentDate from "../../../../hooks/getCurrentDate";

const PedidoHerrajesForm = ({ onClose, onSubmit }) => {
  const Today = getCurrentDate();
  const [uploadedData, setUploadedData] = useState([]);
  const [NroPedido, setNroPedido] = useState("");
  const [Obra, setObra] = useState("");
  const [Fecha, setFecha] = useState(Today);
  const [OrdenCompra, setOrdenCompra] = useState("");

  const handleFileUpload = async (jsonData) => {
    const dataToUpload = [];

    for (const row of jsonData) {
      if (
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      ) {
        const [Codigo, Descripcion, CantEntrega, Unidad, Recepciones] = row;

        dataToUpload.push({
          Codigo: String(Codigo),
          Descripcion,
          CantEntrega,
          Unidad: "u",
          Recepciones: [],
        });
      }
    }

    setUploadedData(dataToUpload);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (Obra === "" || NroPedido === "" || OrdenCompra === "" || Fecha === "") {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    try {
      crearPedido(Obra, Fecha, NroPedido, OrdenCompra, uploadedData);

      console.log("Todos los materiales han sido cargados con éxito.");

      setUploadedData([]);
      setObra("");
      setFecha("");
      setNroPedido("");
      setOrdenCompra("");
      onClose();
      onSubmit();
    } catch (error) {
      console.error("Error al crear el pedido:", error);

      console.error(
        "Error al actualizar la base de datos o al crear pedidos de herrajes:",
        error
      );
    }
  };

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Crear Pedido de Herrajes Nuevo</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-75"
          name="Obra"
          placeholder="Nombre de la Obra"
          value={Obra}
          onChange={(e) => setObra(e.target.value)}
          label="Nombre de la Obra"
        />
        <TextField
          type="date"
          className="form-control mt-3 ms-3 w-25"
          name="Fecha"
          placeholder="Fecha"
          value={Fecha}
          onChange={(e) => setFecha(e.target.value)}
          label="Fecha de Pedido"
        />
      </Grid>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-50"
          name="NroPedido"
          placeholder="Nro. de Pedido"
          value={NroPedido}
          onChange={(e) => setNroPedido(e.target.value)}
          label="Nro. de Pedido"
        />
        <TextField
          type="text"
          className="form-control mt-3 w-50 ms-3"
          name="OrdenCompra"
          placeholder="Nro. de Orden de Compra"
          value={OrdenCompra}
          onChange={(e) => setOrdenCompra(e.target.value)}
          label="Nro. de Orden de Compra"
        />
      </Grid>
      <UploadHerrajes onFileUpload={handleFileUpload} onClose={onClose} />
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
                <TableCell className="text-center fw-bold">Código</TableCell>
                <TableCell className="text-center fw-bold">
                  Descripción
                </TableCell>
                <TableCell className="text-center fw-bold">
                  Cant. a Entregar
                </TableCell>
                <TableCell className="text-center fw-bold">
                  Unidad de Medida
                </TableCell>
              </TableRow>
            </TableHead>
            {uploadedData.length > 0 && (
              <TableBody sx={{}}>
                {uploadedData.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center" sx={{ width: "10%" }}>
                      {material.Codigo}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Descripcion}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.CantEntrega}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.Unidad}
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

export default PedidoHerrajesForm;
