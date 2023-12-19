import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Paper,
} from "@mui/material";
import { DividerTitle } from "../../../../Dividers";
import useFetchMaterialesRelleno from "../../../../../hooks/Presupuestos/Puertas/Config/fetchMaterialRelleno";
import AddMaterialRellenoButton from "../../../Buttons/Puertas/Materiales/AddMaterialRellenoButton";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";
import DeleteMaterialesRelleno from "../../../../../hooks/Presupuestos/Puertas/Config/deleteMaterialRelleno";
import DeleteButton from "../../../../DeleteButton";
import FormatCurrency from "../../../../../hooks/formatCurrency";

const MaterialesRellenoList = () => {
  const [onCreation, setOnCreation] = useState(false);
  const { loading, materialesRelleno, fetchMaterialesRelleno } =
    useFetchMaterialesRelleno();
  const Materiales = fetchMats();
  const { deleteMaterialesRelleno, error } = DeleteMaterialesRelleno();
  const formatCurrency = FormatCurrency();
  const [Mats, setMats] = useState([]);

  const handleOnMaterialCreation = () => {
    setOnCreation(!onCreation);
  };

  useEffect(() => {
    if (materialesRelleno.length === 0) {
      return;
    }

    const fetchCostForMaterial = async () => {
      const updatedMats = await Promise.all(
        materialesRelleno.map(async (material) => {
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
    fetchMaterialesRelleno();
  }, [materialesRelleno, Materiales, onCreation]);

  const handleDeleteMaterial = async (index) => {
    swal({
      title: "¿Desea eliminar el Material?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        deleteMaterialesRelleno(index);
        fetchMaterialesRelleno();
      }
    });
  };

  return (
    <Paper elevation={5} sx={{ p: 1 }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#01662b" }}>
          Materiales de Relleno
        </Typography>
        <AddMaterialRellenoButton />
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
          <TableBody>
            {Mats.map((material, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">{material.Detalle}</TableCell>
                <TableCell className="text-center">
                  {formatCurrency(material.Costo)}
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

export default MaterialesRellenoList;
