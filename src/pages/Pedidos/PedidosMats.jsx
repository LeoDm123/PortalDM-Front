import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../../App.css";
import Header from "../../components/Menu/Header";
import AddPedidoButton from "../../components/Pedidos/Buttons/AddPedidoButton";
import PedidosPerfilesList from "../../components/Pedidos/Lists/Perfiles/PedidoPerfilesList";
import PedidosHerrajesList from "../../components/Pedidos/Lists/Herrajes/PedidoHerrajesList";
import PedidosVidriosList from "../../components/Pedidos/Lists/Vidrios/PedidoVidriosList";
import PedidosMaderaList from "../../components/Pedidos/Lists/Madera/PedidoMaderaList";
import PedidosVariosList from "../../components/Pedidos/Lists/Varios/PedidoVariosList";

const PedidosMats = () => {
  const [onSubmit, setOnSubmit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    setOnSubmit(!onSubmit);
  };

  const optionComponents = [
    <PedidosPerfilesList onSubmit={onSubmit} />,
    <PedidosHerrajesList onSubmit={onSubmit} />,
    <PedidosVidriosList onSubmit={onSubmit} />,
    <PedidosMaderaList onSubmit={onSubmit} />,
    <PedidosVariosList onSubmit={onSubmit} />,
  ];

  return (
    <Header
      content={
        <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
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
                      label="Perfiles de PVC"
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
                      label="Herrajes de PVC"
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
                      label="Vidrios"
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
                      label="Insumos de Madera"
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
                      label="Insumos Varios"
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

                  <AddPedidoButton onSubmit={handleSubmit} />
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

export default PedidosMats;
