import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../../../App.css";
import PuertaCard from "../../Cards/Puertas/PuertasCard";

const ParametrosPuertasList = () => {
  return (
    <Grid>
      <Box>
        <Grid
          sx={{
            mb: 1,
            display: "flex",
            flexDirection: "column",
            height: 400,
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
        ></Grid>
      </Box>
    </Grid>
  );
};

export default ParametrosPuertasList;
