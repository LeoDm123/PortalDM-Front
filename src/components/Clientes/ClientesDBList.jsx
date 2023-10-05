import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../js/Title";
import "../../App.css";
import Grid from "@mui/material/Grid";
import VerClienteButton from "./Buttons/VerClienteButton";
import DeleteButton from "../DeleteButton";
import serverAPI from "../../api/serverAPI";
import swal from "sweetalert";
import GoBackButton from "../GoBackButton";

export default function ClientesDBList({ onClientCreation }) {
  const [clientData, setClientData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientsData();
  }, [onClientCreation]);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get("/clients/obtenerClientes");
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const DeleteCliente = async (_id) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/clients/deleteCliente/${_id}`
      );

      if (deleteResp.data.message === "Client deleted successfully") {
        console.log(deleteResp);
      } else {
        console.log("Cancel operation failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCliente = (_id) => {
    swal({
      title: "¿Desea borrar el cliente?",
      text: "Una vez borrado, este no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Cliente borrado con éxito!", {
          icon: "success",
        });
        DeleteCliente(_id);
      }
    });
  };

  useEffect(() => {
    fetchClientsData();
  }, [handleDeleteCliente]);

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Title>Base de Datos de Clientes</Title>
          <GoBackButton handleClick={() => navigate(-1)} />
        </Grid>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold">Nombre</TableCell>
              <TableCell className="text-center fw-bold">Apellido</TableCell>
              <TableCell className="text-center fw-bold">
                Condicion de IVA
              </TableCell>
              <TableCell className="text-center fw-bold">CUIT</TableCell>
              <TableCell className="text-center fw-bold">DNI</TableCell>
              <TableCell className="text-center fw-bold">Dirección</TableCell>
              <TableCell className="text-center fw-bold">Teléfono</TableCell>
              <TableCell className="text-center fw-bold">Email</TableCell>
              <TableCell className="text-center fw-bold">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData &&
              clientData.map((client, index) => (
                <TableRow key={client._id}>
                  <TableCell className="text-center">
                    {client.ClientName}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientApellido}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientIVACond}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientCUIT}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientDNI}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientAdress}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientTel}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.ClientEmail}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <VerClienteButton selectedClientIndex={index} />
                      </div>
                      <DeleteButton
                        onDelete={() => handleDeleteCliente(client._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
