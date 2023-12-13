import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../../App.css";
import Header from "../../components/Menu/Header";
import PresPuertasForm from "../../components/Presupuestos/Forms/Puertas/PresPuertasForm";

const Presupuestos = () => {
  const [onSubmit, setOnSubmit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    setOnSubmit(!onSubmit);
  };

  const optionComponents = [<PresPuertasForm />];

  return (
    <Header
      content={
        <Container maxWidth="xl" sx={{ mt: 2, mb: 1 }}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12} display={"flex"}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 640,
                  width: "100%",
                }}
              >
                <Grid
                  sx={{
                    px: 1,
                    pt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ marginBottom: 1 }}
                  >
                    <Tab
                      label="Puertas"
                      sx={{
                        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",

                        "&:hover": {
                          color: "rgba(1, 102, 43)",
                        },
                        textTransform: "Initial",
                        fontSize: "15px",
                      }}
                    />
                    <Tab
                      label="Muebles"
                      sx={{
                        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",

                        "&:hover": {
                          color: "rgba(1, 102, 43)",
                        },
                        textTransform: "Initial",
                        fontSize: "15px",
                      }}
                    />
                    <Tab
                      label="Decks"
                      sx={{
                        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",

                        "&:hover": {
                          color: "rgba(1, 102, 43)",
                        },
                        textTransform: "Initial",
                        fontSize: "15px",
                      }}
                    />
                    <Tab
                      label="Extras"
                      sx={{
                        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",

                        "&:hover": {
                          color: "rgba(1, 102, 43)",
                        },
                        textTransform: "Initial",
                        fontSize: "15px",
                      }}
                    />
                  </Tabs>
                </Grid>
                {optionComponents[selectedTab]}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      }
    />
  );
};

export default Presupuestos;
