import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import "../../App.css";
import Grid from "@mui/material/Grid";

// Generate Order Data
function createData(
  id: number,
  nombre: string,
  sumaPres: number,
  desc: number,
  actualiz: number,
  pagos: number,
  extras: number
) {
  const IVA = sumaPres * 0.21;
  const TotalConIVA = sumaPres + IVA;
  const TotalConIVAyDesc = TotalConIVA - desc;
  const PagarTotal = TotalConIVAyDesc + actualiz - pagos + extras;

  return {
    id,
    nombre,
    sumaPres,
    desc,
    actualiz,
    pagos,
    extras,
    IVA,
    TotalConIVA,
    TotalConIVAyDesc,
    PagarTotal,
  };
}

const rows = [
  createData(0, "Nombre Apellido", 1500000, 50000, 30000, 700000, 10000),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function ListaClientes() {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Clientes Activos</Title>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center">Nombre</TableCell>
              <TableCell className="text-center">Total s/ IVA</TableCell>
              <TableCell className="text-center">IVA Total</TableCell>
              <TableCell className="text-center">Total c/ IVA</TableCell>
              <TableCell className="text-center">Total Descuentos</TableCell>
              <TableCell className="text-center">Total a Pagar</TableCell>
              <TableCell className="text-center">Total Actualización</TableCell>
              <TableCell className="text-center">Total Pagado</TableCell>
              <TableCell className="text-center">Total Extras</TableCell>
              <TableCell className="text-center">Saldo Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* Nombre Cliente */}
                <TableCell className="text-center">{row.nombre}</TableCell>
                {/* Suma de los presupuestos */}
                <TableCell className="text-center">
                  ${row.sumaPres.toLocaleString()}
                </TableCell>
                {/* IVA Total */}
                <TableCell className="text-center">
                  ${row.IVA.toLocaleString()}
                </TableCell>
                {/* Suma de los presupuestos + IVA */}
                <TableCell className="text-center">
                  ${row.TotalConIVA.toLocaleString()}
                </TableCell>
                {/* Suma de los descuentos */}
                <TableCell className="text-center">
                  ${row.desc.toLocaleString()}
                </TableCell>
                {/* Total a pagar con descuentos */}
                <TableCell className="text-center">
                  ${row.TotalConIVAyDesc.toLocaleString()}
                </TableCell>
                {/* Suma Actualizaciones */}
                <TableCell className="text-center">
                  ${row.actualiz.toLocaleString()}
                </TableCell>
                {/* Suma Pagos */}
                <TableCell className="text-center">
                  ${row.pagos.toLocaleString()}
                </TableCell>
                {/* Suma extras */}
                <TableCell className="text-center">
                  ${row.extras.toLocaleString()}
                </TableCell>
                {/* Total a Pagar */}
                <TableCell className="text-center">
                  ${row.PagarTotal.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          Ver todos los clientes
        </Link>
      </React.Fragment>
    </Grid>
  );
}
