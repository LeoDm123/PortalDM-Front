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
import InfoTerminacionButton from "../../../Buttons/Puertas/Terminaciones/InfoTerminacionButton";

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
    const fetchCostForMaterial = async () => {
      const updatedMats = await Promise.all(
        Terminaciones.map(async (terminacion) => {
          const materialesDeTerminacion = terminacion.Materiales;

          const detallesMateriales = await Promise.all(
            materialesDeTerminacion.map(async (materialTerminacion) => {
              const matchingMaterial = Materiales.find(
                (material) => material._id === materialTerminacion.ID
              );

              if (matchingMaterial) {
                const { Presentacion, Cantidad } = materialTerminacion;
                const Costo = matchingMaterial.Costo;

                const costoTotalMaterial = (Costo / Presentacion) * Cantidad;

                return { Costo, Presentacion, Cantidad, costoTotalMaterial };
              } else {
                return {
                  Costo: 0,
                  Presentacion: "No encontrado",
                  Cantidad: 0,
                  costoTotalMaterial: 0,
                };
              }
            })
          );

          const costoTotal = detallesMateriales.reduce(
            (acc, detalle) => acc + detalle.costoTotalMaterial,
            0
          );

          return {
            ...terminacion,
            costoTotal,
            detallesMateriales,
          };
        })
      );

      setMats(updatedMats);
    };

    fetchCostForMaterial();
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
              ></TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Mats.map((terminacion, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">
                  {terminacion.Detalle}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(terminacion.costoTotal)}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "5%" }}>
                  <DeleteButton onDelete={() => handleDeleteMaterial(index)} />
                </TableCell>
                <TableCell className="text-center" sx={{ width: "5%" }}>
                  <InfoTerminacionButton terminacionIndex={index} />
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
