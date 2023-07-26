import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Saldo a Cobrar</Title>
      <Typography component="p" variant="h4">
        $3.054.248,58
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 18 Julio, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver saldos a cobrar
        </Link>
      </div>
    </React.Fragment>
  );
}
