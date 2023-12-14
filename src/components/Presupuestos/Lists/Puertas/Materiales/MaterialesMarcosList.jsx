import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { DividerTitle } from "../../../../Dividers";
import useFetchMaterialesMarco from "../../../../../hooks/Presupuestos/Puertas/Config/fetchMaterialMarco";
import AddMaterialMarcoButton from "../../../Buttons/Puertas/Materiales/AddMaterialMarcoButton";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";
import DeleteMaterialesMarco from "../../../../../hooks/Presupuestos/Puertas/Config/deleteMaterialMarco";
import DeleteButton from "../../../../DeleteButton";
import FormatCurrency from "../../../../../hooks/formatCurrency";

const MaterialesMarcosList = () => {
  const [onCreation, setOnCreation] = useState(false);
  const { loading, materialesMarco, fetchMaterialesMarco } =
    useFetchMaterialesMarco();
  const Materiales = fetchMats();
  const { deleteMaterialesMarco, error } = DeleteMaterialesMarco();
  const formatCurrency = FormatCurrency();
  const [Mats, setMats] = useState([]);

  const handleOnMaterialCreation = () => {
    setOnCreation(!onCreation);
  };

  useEffect(() => {
    if (materialesMarco.length === 0) {
      return;
    }

    const fetchCostForMaterial = async () => {
      const updatedMats = await Promise.all(
        materialesMarco.map(async (material) => {
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
    fetchMaterialesMarco();
  }, [materialesMarco, Materiales, onCreation]);

  const handleDeleteMaterial = async (index) => {
    swal({
      title: "¿Desea eliminar el Material?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        deleteMaterialesMarco(index);
        fetchMaterialesMarco();
      }
    });
  };

  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#01662b" }}>
          Materiales de Marco
        </Typography>
        <AddMaterialMarcoButton />
      </Grid>
      <DividerTitle />
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 430,
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
                <TableCell className="text-center">
                  {material.Detalle}
                </TableCell>
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
    </div>
  );
};

export default MaterialesMarcosList;
