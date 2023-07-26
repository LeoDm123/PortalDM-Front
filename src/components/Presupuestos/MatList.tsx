import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import "../../App.css";
import Grid from "@mui/material/Grid";
import MatFilterButton from "./MatFilterButton";

export default function MatList() {
  // Retrieve data from local storage and parse it as an array
  const rows = JSON.parse(localStorage.getItem("materials") || "[]");

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Materiales para Puertas de Madera</Title>
        <MatFilterButton />
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold">Detalle</TableCell>
              <TableCell className="text-center fw-bold">Categoría</TableCell>
              <TableCell className="text-center fw-bold">Ancho [m.]</TableCell>
              <TableCell className="text-center fw-bold">Alto [m.]</TableCell>
              <TableCell className="text-center fw-bold">Largo [m.]</TableCell>
              <TableCell className="text-center fw-bold">
                Espesor [mm.]
              </TableCell>
              <TableCell className="text-center fw-bold">Costo [$]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((materials) => (
              <TableRow key={materials.id}>
                {/* Nombre Cliente */}
                <TableCell className="text-start">
                  {materials.matDetail}
                </TableCell>
                <TableCell className="text-center">
                  {materials.matCategory}
                </TableCell>
                <TableCell className="text-center">
                  {materials.matAncho} m.
                </TableCell>
                <TableCell className="text-center">
                  {materials.matAlto} m.
                </TableCell>
                <TableCell className="text-center">
                  {materials.matLargo} m.
                </TableCell>
                <TableCell className="text-center">
                  {materials.matEspesor} mm.
                </TableCell>
                <TableCell className="text-center">
                  ${" "}
                  {materials.matPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
