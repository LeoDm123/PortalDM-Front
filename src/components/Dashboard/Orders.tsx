import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";

// Generate Order Data
function createData(
  id: number,
  codigo: string,
  detalle: string,
  cantidad: number,
  fecha: string,
  obra: string,
  pedido: string,
  orden: string
) {
  return { id, codigo, detalle, cantidad, fecha, obra, pedido, orden };
}

const rows = [
  createData(
    0,
    "221856.001",
    "Rueda para mosquitero EDS y EX Slide Pres. 100 u.",
    100,
    "18/5/2023",
    "Anadon, Hugo",
    "0001-000049",
    "0001-000142"
  ),
  createData(
    1,
    "227848.001",
    "Remate inferior puerta calle (Aluminio) Euro-Design 60 Pres. 6 m.",
    12,
    "18/5/2023",
    "Anadon, Hugo",
    "0001-000049",
    "0001-000142"
  ),
  createData(
    2,
    "555320.014",
    "Cuarto caña 17 mm Bco-Negro M. Pres. 5,8 m.",
    139.2,
    "6/2/2023",
    "Petraglia, Federico",
    "0001-000044",
    "0001-000134"
  ),
  createData(
    3,
    "510343.091",
    "Marco N3 Euro-Design Slide Mar-Negro M./Negro M. Pres. 5,8 m.",
    23.2,
    "6/2/2023",
    "Petraglia, Federico",
    "0001-000044",
    "0001-000134"
  ),
  createData(
    4,
    "570470.029",
    "Contramarco 60 mm Mar-Turn Pres. 5,8 m.",
    34.8,
    "25/10/2022",
    "Extras Seleme",
    "0001-000041",
    "0001-000125"
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Materiales Pendientes de Entrega</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Detalle</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Fecha de pedido</TableCell>
            <TableCell>Obra</TableCell>
            <TableCell>Nro. de Pedido</TableCell>
            <TableCell>Nro. de O.C.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.codigo}</TableCell>
              <TableCell>{row.detalle}</TableCell>
              <TableCell>{row.cantidad}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.obra}</TableCell>
              <TableCell>{row.pedido}</TableCell>
              <TableCell>{row.orden}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver pedidos
      </Link>
    </React.Fragment>
  );
}
