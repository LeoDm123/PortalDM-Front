import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "../App.css";
import Header from "../components/Menu/Header";
import UsersList from "../components/Config/Lists/UsersLists";
import AddUserButton from "../components/Config/Buttons/AddUserButton";

const defaultTheme = createTheme();

const Config = () => {
  const [onUserCreation, setOnUserCreation] = useState(false);

  const handleOnUserCreation = () => {
    setOnUserCreation(!onUserCreation);
  };

  console.log("onUserCreation-Config", onUserCreation);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid>
              <AddUserButton onUserCreation={handleOnUserCreation} />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                  }}
                >
                  <UsersList onUserCreation={onUserCreation} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                ></Paper>
              </Grid>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default Config;
