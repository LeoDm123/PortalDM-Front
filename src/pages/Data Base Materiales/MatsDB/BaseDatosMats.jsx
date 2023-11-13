import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../../components/Menu/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MatList from "../../../components/Data Base Materiales/Lists/MatList";
import "../../../App.css";
import AddMatButton from "../../../components/Data Base Materiales/Buttons/AddMatButton";
import ModifyMatButton from "../../../components/Data Base Materiales/ModifyMatButton";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const BaseDatosMats = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [onMatSubmit, setOnMatSubmit] = useState(false);
  const [onMatEdit, setOnMatEdit] = useState(false);

  const handleOnMatSubmit = () => {
    setOnMatSubmit(!onMatSubmit);
  };

  const handleOnMatEdit = () => {
    setOnMatEdit(!onMatEdit);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <div className="d-flex">
                <AddMatButton onMatSubmit={handleOnMatSubmit} />
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
                <MatList
                  onMatSubmit={onMatSubmit}
                  onMatChange={handleOnMatEdit}
                />
              </Paper>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default BaseDatosMats;
