import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { DividerTitle } from "../../../../Dividers";
import useFetchMaterialesMarco from "../../../../../hooks/Presupuestos/Puertas/Config/fetchMaterialMarco";
import AddMaterialMarcoButton from "../../../Buttons/Puertas/Materiales/AddMaterialMarcoButton";

const MaterialesMarcosList = () => {
  const { loading, materialesMarco, fetchMaterialesMarco } =
    useFetchMaterialesMarco();
  const [onConceptDelete, setOnConceptDelete] = useState(false);
  const [onConceptCreation, setOnConceptCreation] = useState(false);

  const handleOnConceptCreation = () => {
    setOnConceptCreation(!onConceptCreation);
  };

  const handleOnConceptDelete = () => {
    setOnConceptDelete(!onConceptDelete);
  };

  useEffect(() => {}, [onConceptCreation, onConceptDelete]);

  useEffect(() => {
    console.log("Materiales", materialesMarco);
  }, [materialesMarco]);

  const handleDeleteConcepto = async (index) => {
    swal({
      title: "¿Desea eliminar el concepto?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        handleOnConceptDelete();
      }
    });
  };

  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#01662b" }}>
          Materiales de Marco
        </Typography>
        <AddMaterialMarcoButton onConceptCreation={handleOnConceptCreation} />
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
            {materialesMarco.map((material, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{material}</TableCell>
                <TableCell className="text-center">
                  <DeleteButton onDelete={() => handleDeleteConcepto(index)} />
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
