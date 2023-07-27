import React from "react";
import { useState } from "react";
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

interface MatListProps {
  handleFilterChange: (selectedCategory: string) => void;
}

interface Material {
  id: number;
  matDetail: string;
  matCategory: string;
  matAncho: number;
  matAlto: number;
  matLargo: number;
  matEspesor: number;
  matPrice: number;
}

export default function MatList() {
  const rows = JSON.parse(localStorage.getItem("materials") || "[]");
  const [filteredMats, setFilteredMats] = useState("");

  const handleFilterChange = (selectedCategory: string) => {
    setFilteredMats(selectedCategory);
  };

  const filteredRows = filteredMats
    ? rows.filter(
        (materials: Material) => materials.matCategory === filteredMats
      )
    : rows;

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Materiales para Puertas de Madera</Title>
        <MatFilterButton onFilterChange={handleFilterChange} />
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold MatListColumnXL">
                Detalle
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnXL">
                Categoría
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Ancho [m.]
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Alto [m.]
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Largo [m.]
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Espesor [mm.]
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnM">
                Costo [$]
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((materials: Material) => (
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
