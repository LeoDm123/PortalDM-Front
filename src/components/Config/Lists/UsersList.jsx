import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../DeleteButton";
import fetchUsers from "../../../hooks/Users/fetchUsers";
import DeleteUser from "../../../hooks/Users/deleteUser";

const UsersList = ({ onUserCreation }) => {
  const [onUserDelete, setOnUserDelete] = useState(false);
  const Users = fetchUsers(onUserCreation, onUserDelete);
  const { deleteUser, error } = DeleteUser();

  const handleUserDelete = () => {
    setOnUserDelete(!onUserDelete);
  };

  console.log("onUserDelete-List", onUserDelete);

  const handleDeleteUser = (userId) => {
    swal({
      title: "¿Desea eliminar el usuario?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        deleteUser(userId);
        handleUserDelete();
      }
    });
  };

  return (
    <div>
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 290,
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
                Dirección
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Teléfono
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
                DNI
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
                  {usuario.userName}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.userApellido}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.userDireccion}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.userTelefono}
                </TableCell>
                <TableCell className="text-center">
                  {usuario.userEmail}
                </TableCell>
                <TableCell className="text-center">{usuario.userDNI}</TableCell>
                <TableCell className="text-center">
                  {usuario.userCategoria}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton
                    onDelete={() => handleDeleteUser(usuario._id)}
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
