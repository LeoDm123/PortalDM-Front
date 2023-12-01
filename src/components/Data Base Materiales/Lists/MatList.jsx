import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";
import "../../../App.css";
import Grid from "@mui/material/Grid";
import MatFilterButton from "../Buttons/MatFilterButton";
import fetchMats from "../../../hooks/Materiales/fetchMats";
import MatsOptionsButton from "../Buttons/MatOptionsButton";

export default function MatList({ onMatSubmit, onMatChange }) {
  const Materiales = fetchMats(onMatSubmit, onMatChange);
  const [selectedCategory, setSelectedCategory] = useState("Mostrar Todos");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchMats(undefined, undefined, category);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title>Listado de Materiales</Title>
            <MatFilterButton onFilterChange={handleCategoryChange} />
          </Grid>
        </Grid>
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
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1", width: "10%" }}
                >
                  Código
                </TableCell>
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1", width: "35%" }}
                >
                  Descripción
                </TableCell>
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1", width: "15%" }}
                >
                  Categoría
                </TableCell>
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1", width: "15%" }}
                >
                  Proveedor
                </TableCell>

                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1" }}
                >
                  Stock de Seguridad
                </TableCell>
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1" }}
                >
                  Stock Actual
                </TableCell>
                <TableCell
                  className="text-center fw-bold"
                  sx={{ backgroundColor: "#E1E3E1" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Materiales.filter(
                (material) =>
                  selectedCategory === "" ||
                  selectedCategory === "Mostrar Todos" ||
                  material.Categoria === selectedCategory
              ).map((materials) => (
                <TableRow key={materials.id}>
                  <TableCell className="text-center" sx={{ width: "5%" }}>
                    {materials.Codigo}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "40%" }}>
                    {materials.Descripcion}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "15%" }}>
                    {materials.Categoria}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "15%" }}>
                    {materials.Proveedor}
                  </TableCell>

                  <TableCell className="text-center" sx={{ width: "10%" }}>
                    {materials.StockSeguridad}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "10%" }}>
                    {materials.Stock !== 0
                      ? `${parseFloat(materials.Stock).toFixed(2)} ${
                          materials.Unidad
                        }`
                      : materials.Stock}
                  </TableCell>

                  <TableCell colSpan={2} sx={{ width: "5%" }}>
                    <MatsOptionsButton
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
