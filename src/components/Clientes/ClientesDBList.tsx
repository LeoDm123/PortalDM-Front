import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import "../../App.css";
import Grid from "@mui/material/Grid";
import VerClienteButton from "./VerClienteButton";
import DeleteButton from "../DeleteButton";
import Swal from "sweetalert2";

export default function ClientesDBList() {
  // Retrieve data from local storage
  const [clientData, setClientData] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );

  const handleDeleteCliente = (clientIndex) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this client?",
      icon: "warning",
      customClass: { container: "DeleteSwalPos" },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedClientData = [...clientData];

        // Remove the client at the specified index
        const deletedClient = updatedClientData.splice(clientIndex, 1)[0]; // Get the deleted client

        localStorage.setItem("clients", JSON.stringify(updatedClientData));
        // Trigger a state update or re-render to reflect the changes in the UI if needed

        setClientData(updatedClientData);

        Swal.fire({
          title: "Deleted!",
          text: `The client ${deletedClient.ClientName} has been deleted.`,
          icon: "success",
          customClass: {
            container: "DeleteSwalPos", // Add your custom class here
          },
        });
      }
    });
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Base de Datos de Clientes</Title>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData &&
              clientData.map((client, index) => (
                <TableRow key={index}>
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
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <VerClienteButton selectedClientIndex={index} />
                    </div>
                    <DeleteButton onDelete={() => handleDeleteCliente(index)} />
                  </div>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
