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

// Retrieve data from local storage
const clientData = JSON.parse(localStorage.getItem("clients")) || [];

//FORMATO DE MONEDA
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(value);
};

// Generate Order Data for presupuestos
function createPresupuestoRow(presupuesto) {
  const { PresupuestoCodigo, CondicionFacturacion, Precio, IVA, Total } =
    presupuesto;

  return {
    PresupuestoCodigo,
    CondicionFacturacion,
    Precio,
    IVA,
    Total,
  };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function ListaClientes() {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Presupuestos Activos según Cliente</Title>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold">Nombre</TableCell>
              <TableCell className="text-center fw-bold">Codigo</TableCell>
              <TableCell className="text-center fw-bold">Facturac.</TableCell>
              <TableCell className="text-center fw-bold">Precio</TableCell>
              <TableCell className="text-center fw-bold">IVA</TableCell>
              <TableCell className="text-center fw-bold">Total</TableCell>
              <TableCell className="text-center fw-bold">
                Total Pagado
              </TableCell>
              <TableCell className="text-center fw-bold">
                Actualización
              </TableCell>
              <TableCell className="text-center fw-bold">Extras</TableCell>
              <TableCell className="text-center fw-bold">Total Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData.map((client, clientIndex) => (
              <React.Fragment key={clientIndex}>
                {client.Presupuestos.map((presupuesto, presupuestoIndex) => (
                  <TableRow key={presupuestoIndex}>
                    <TableCell className="text-center">
                      {client.ClientName && client.ClientApellido
                        ? `${client.ClientName} ${client.ClientApellido}`
                        : "Nombre no disponible"}
                    </TableCell>
                    <TableCell className="text-center">
                      {presupuesto.PresupuestoCodigo}
                    </TableCell>
                    <TableCell className="text-center">
                      {presupuesto.CondicionFacturacion}%
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(presupuesto.Precio)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(presupuesto.IVA)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(presupuesto.Total)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(
                        presupuesto.pagos
                          ? presupuesto.pagos
                              .filter((pago) => pago.EstadoConcepto === 0)
                              .reduce((sum, pago) => sum + pago.MontoPago, 0)
                          : 0
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(
                        presupuesto.pagos
                          ? presupuesto.pagos
                              .filter((pago) => pago.EstadoConcepto === 1)
                              .reduce((sum, pago) => sum + pago.MontoPago, 0)
                          : 0
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(
                        presupuesto.pagos
                          ? presupuesto.pagos
                              .filter((pago) => pago.EstadoConcepto === 2)
                              .reduce((sum, pago) => sum + pago.MontoPago, 0)
                          : 0
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(
                        presupuesto.Total -
                          (presupuesto.TotalPagado || 0) +
                          (presupuesto.Actualizacion || 0) +
                          (presupuesto.Extras || 0)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
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
