import React, { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../components/Title";
import "../../App.css";
import Grid from "@mui/material/Grid";
import InfoFilterButton from "./InfoFIlterButton";

export default function InfoList() {
  const rows = JSON.parse(localStorage.getItem("info") || "[]");
  const [filteredInfo, setFilteredInfo] = useState("");

  const handleFilterChange = (selectedCategory) => {
    setFilteredInfo(selectedCategory);
  };

  const filteredRows = filteredInfo
    ? rows.filter((info) => info.infoCategory === filteredInfo)
    : rows;

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <div className="TitleButtonLayout">
          <Title>Materiales para Puertas de Madera</Title>
          <InfoFilterButton onFilterChange={handleFilterChange} />
        </div>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold MatListColumnXL">
                Detalle
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Producto
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Valor
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnS">
                Unidad de Medida
              </TableCell>
              <TableCell className="text-center fw-bold MatListColumnXXL">
                Descripción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((info) => (
              <TableRow key={info.id}>
                {/* Nombre Cliente */}
                <TableCell className="text-center MatListColumnXL">
                  {info.infoDetail}
                </TableCell>
                <TableCell className="text-center MatListColumnS">
                  {info.infoCategory}
                </TableCell>
                <TableCell className="text-center MatListColumnS">
                  {info.infoValue}
                </TableCell>
                <TableCell className="text-center MatListColumnS">
                  {info.infoUnit}
                </TableCell>
                <TableCell className="text-center MatListColumnXXL">
                  {info.infoDescription}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
