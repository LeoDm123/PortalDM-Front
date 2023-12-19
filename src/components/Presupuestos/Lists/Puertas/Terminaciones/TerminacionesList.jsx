import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Paper,
} from "@mui/material";
import { DividerTitle } from "../../../../Dividers";
import useFetchTerminaciones from "../../../../../hooks/Presupuestos/Puertas/Config/fetchTerminaciones";
import AddTerminacionButton from "../../../Buttons/Puertas/Terminaciones/AddTerminacionButton";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";
import DeleteTerminaciones from "../../../../../hooks/Presupuestos/Puertas/Config/deleteTerminaciones";
import DeleteButton from "../../../../DeleteButton";
import FormatCurrency from "../../../../../hooks/formatCurrency";

const TerminacionesList = () => {
  const [onCreation, setOnCreation] = useState(false);
  const { loading, Terminaciones, fetchTerminaciones } =
    useFetchTerminaciones();
  const Materiales = fetchMats();
  const { deleteTerminaciones, error } = DeleteTerminaciones();
  const formatCurrency = FormatCurrency();
  const [Mats, setMats] = useState([]);

  const handleOnMaterialCreation = () => {
    setOnCreation(!onCreation);
  };

  useEffect(() => {
    if (Terminaciones.length === 0) {
      return;
    }

    const fetchCostForMaterial = async () => {
      const updatedMats = await Promise.all(
        Terminaciones.map(async (material) => {
          const matchingMaterial = Materiales.find(
            (m) => m._id === material.MatId
          );
          const costo = matchingMaterial
            ? matchingMaterial.Costo
            : "No disponible";

          return {
            Detalle: material.Detalle,
            Costo: costo,
          };
        })
      );

      setMats(updatedMats);
    };

    fetchCostForMaterial();
    fetchTerminaciones();
  }, [Terminaciones, Materiales, onCreation]);

  const handleDeleteMaterial = async (index) => {
    swal({
      title: "¿Desea eliminar el Material?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        deleteTerminaciones(index);
        fetchTerminaciones();
      }
    });
  };

  return (
    <Paper elevation={5} sx={{ p: 1 }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#01662b" }}>
          Terminaciones
        </Typography>
        <AddTerminacionButton />
      </Grid>
      <DividerTitle />
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 250,
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
                Detalle
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Precio
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Porc. %
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Terminaciones.map((aplique, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">{aplique.Detalle}</TableCell>
                <TableCell className="text-center">
                  {formatCurrency(aplique.Precio)}
                </TableCell>
                <TableCell className="text-center">
                  {aplique.Porcentaje}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton onDelete={() => handleDeleteMaterial(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
};

export default TerminacionesList;
