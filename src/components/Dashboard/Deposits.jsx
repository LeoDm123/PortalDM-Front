import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import SaldosTotales from "../../hooks/saldoActivo";
import FormatCurrency from "../../hooks/formatCurrency";
import { useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

function getCurrentDate() {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString("es-AR", options);
}

export default function Deposits() {
  const { saldoActivo } = SaldosTotales();
  const formatCurrency = FormatCurrency();
  const navigate = useNavigate();

  const today = getCurrentDate();

  const handleClick = () => {
    navigate("/GestionarClientes");
  };

  return (
    <React.Fragment>
      <Title>Saldo a Cobrar</Title>
      <Typography component="p" variant="h4">
        {formatCurrency(saldoActivo)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        al {today}
      </Typography>
      <div>
        <Link color="primary" onClick={handleClick}>
          Ver saldos a cobrar
        </Link>
      </div>
    </React.Fragment>
  );
}
