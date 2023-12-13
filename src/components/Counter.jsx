import { React, useState } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Counter() {
  const [count, setCount] = useState(1);
  return (
    <Grid sx={{ display: "flex", alignItems: "center" }}>
      <TextField type="number" variant="outlined" value={count} />
      <Grid>
        <IconButton onClick={() => setCount(count + 1)}>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton onClick={() => setCount(count - 1)}>
          <ArrowDropDownIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
