import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../DeleteButton";
import fetchUsers from "../../../hooks/Users/fetchUsers";

const UsersList = () => {
  const Users = fetchUsers();
  console.log("Users", Users);

  return (
    <div>
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 300,
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
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Apellido
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Correo Electrónico
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Usuario
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Categoría
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Users.map((usuario) => (
              <TableRow key={usuario._id}>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {usuario.Name}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.Apellido}
                </TableCell>
                <TableCell className="text-center">{usuario.email}</TableCell>
                <TableCell className="text-center">
                  {usuario.userName}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.userCategory}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton
                    onDelete={() => handleDeletePago(presupuesto._id, pago._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default UsersList;
