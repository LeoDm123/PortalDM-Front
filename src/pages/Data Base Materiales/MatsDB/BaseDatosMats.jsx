import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../../components/Menu/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MatList from "../../../components/Data Base Materiales/MatList";
import "../../../App.css";
import AddMatButton from "../../../components/Data Base Materiales/AddMatButton";
import ModifyMatButton from "../../../components/Data Base Materiales/ModifyMatButton";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const BaseDatosMats = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <div className="d-flex">
                <AddMatButton />
                <ModifyMatButton />
              </div>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 550,
                  width: "100%",
                }}
              >
                <MatList />
              </Paper>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default BaseDatosMats;
