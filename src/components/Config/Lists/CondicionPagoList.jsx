import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../DeleteButton";
import useFetchCondicionPago from "../../../hooks/Config/fetchCondicionPago";
import DeleteCondicionPago from "../../../hooks/Config/deleteCondicionPago";
import AddCondicionPagoButton from "../Buttons/AddCondicionPagoButton";
import { Typography } from "@mui/material";
import { DividerTitle } from "../../Dividers";

const CondicionPagoList = () => {
  const { loading, condiciones, fetchCondiciones } = useFetchCondicionPago();
  const { deleteCondicionPago, error } = DeleteCondicionPago();
  const [onCondicionDelete, setOnCondicionDelete] = useState(false);
  const [onCondicionCreation, setOnCondicionCreation] = useState(false);

  const handleOnCondicionCreation = () => {
    setOnCondicionCreation(!onCondicionCreation);
  };

  const handleOnCondicionDelete = () => {
    setOnCondicionDelete(!onCondicionDelete);
  };

  useEffect(() => {
    fetchCondiciones();
  }, [onCondicionCreation, onCondicionDelete]);

  useEffect(() => {
    console.log("Condiciones", condiciones);
  }, [condiciones]);

  const handleDeleteCondicion = async (index) => {
    swal({
      title: "¿Desea eliminar la condición?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        await deleteCondicionPago(index);
        handleOnCondicionDelete();
      }
    });
  };

  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#01662b" }}>
          Condiciones de Pago
        </Typography>
        <AddCondicionPagoButton
          onCondicionCreation={handleOnCondicionCreation}
        />
      </Grid>
      <DividerTitle />
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 200,
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
          <TableBody>
            {condiciones.map((condicion, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{condicion}</TableCell>
                <TableCell className="text-center">
                  <DeleteButton onDelete={() => handleDeleteCondicion(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default CondicionPagoList;
