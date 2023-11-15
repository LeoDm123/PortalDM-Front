import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";
import "../../../App.css";
import Grid from "@mui/material/Grid";
import MatFilterButton from "../MatFilterButton";
import DeleteButton from "../../DeleteButton";
import fetchMats from "../../../hooks/fetchMats";
import DeleteMat from "../../../hooks/deleteMatByID";
import VerMatButton from "../Buttons/VerMatButton";
import EditMatButton from "../Buttons/EditMatButton";

export default function MatList({ onMatSubmit, onMatChange }) {
  const Materiales = fetchMats(onMatSubmit, onMatChange);
  const { deleteMat, error } = DeleteMat();

  const handleDeleteMat = (matId) => {
    swal({
      title: "¿Desea eliminar el material?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        deleteMat(matId);
        fetchMats();
      }
    });
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <div className="TitleButtonLayout">
          <Title>Listado de Materiales</Title>
          <MatFilterButton />
        </div>
        <Grid
          sx={{
            height: 480,
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
                <TableCell className="text-center fw-bold">Código</TableCell>
                <TableCell className="text-center fw-bold">Detalle</TableCell>
                <TableCell className="text-center fw-bold">Categoría</TableCell>
                <TableCell className="text-center fw-bold">Proveedor</TableCell>

                <TableCell className="text-center fw-bold">
                  Stock de Seguridad
                </TableCell>
                <TableCell className="text-center fw-bold">
                  Stock Actual
                </TableCell>
                <TableCell className="text-center fw-bold"></TableCell>
                <TableCell className="text-center fw-bold"></TableCell>
                <TableCell className="text-center fw-bold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Materiales.map((materials) => (
                <TableRow key={materials.id}>
                  <TableCell className="text-center">
                    {materials.Codigo}
                  </TableCell>
                  <TableCell className="text-center">
                    {materials.Detalle}
                  </TableCell>
                  <TableCell className="text-center">
                    {materials.Categoria}
                  </TableCell>
                  <TableCell className="text-center">
                    {materials.Proveedor}
                  </TableCell>

                  <TableCell className="text-center" sx={{ width: "10%" }}>
                    {materials.StockSeguridad}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "10%" }}>
                    {materials.StockInicial}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "5%" }}>
                    <DeleteButton
                      onDelete={() => handleDeleteMat(materials._id)}
                    />
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "5%" }}>
                    <VerMatButton matID={materials._id} />
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "5%" }}>
                    <EditMatButton
                      matID={materials._id}
                      onMatChange={onMatChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </React.Fragment>
    </Grid>
  );
}
