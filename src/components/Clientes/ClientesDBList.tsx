import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import "../../App.css";
import Grid from "@mui/material/Grid";
import VerClienteButton from "./VerClienteButton";

export default function ClientesDBList() {
  // Retrieve data from local storage
  const clientData = JSON.parse(localStorage.getItem("clients"));

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
                  <VerClienteButton />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
