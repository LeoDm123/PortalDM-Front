import React, { createContext, useContext, useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate, useLocation } from "react-router-dom";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <MenuContext.Provider value={{ value, handleChange }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};

const VerticalTabs = () => {
  const { handleChange } = useMenuContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/Main") setValue(0);
    else if (path === "/PedidosMats") setValue(1);
    else if (path === "/GestionarClientes") setValue(2);
    else if (path === "/BaseDatosMats") setValue(3);
    else if (path === "/Presupuestos") setValue(4);
    else if (path === "/Config") setValue(6);
  }, [location.pathname]);

  return (
    <Tabs value={value} onChange={handleChange} orientation="vertical">
      <Tab
        icon={<DashboardIcon />}
        iconPosition="start"
        label="Dashboard"
        onClick={() => {
          setValue(0);
          navigate("/Main");
        }}
        sx={{
          backgroundColor:
            value === 0 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 0 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<ShoppingCartIcon />}
        iconPosition="start"
        label="Pedidos"
        onClick={() => {
          setValue(1);
          navigate("/PedidosMats");
        }}
        sx={{
          backgroundColor:
            value === 1 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 1 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<PeopleIcon />}
        iconPosition="start"
        label="Clientes"
        onClick={() => {
          setValue(2);
          navigate("/GestionarClientes");
        }}
        sx={{
          backgroundColor:
            value === 2 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 2 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<InventoryIcon />}
        iconPosition="start"
        label="Inventario"
        onClick={() => {
          setValue(3);
          navigate("/BaseDatosMats");
        }}
        sx={{
          backgroundColor:
            value === 3 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 3 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<RequestQuoteIcon />}
        iconPosition="start"
        label="Presupuestos"
        onClick={() => {
          setValue(4);
          navigate("/Presupuestos");
        }}
        sx={{
          backgroundColor:
            value === 4 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 4 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<BarChartIcon />}
        iconPosition="start"
        label="Informes"
        onClick={() => {
          setValue(5);
          // Agrega la ruta para el informe
        }}
        sx={{
          backgroundColor:
            value === 5 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 5 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
      <Tab
        icon={<ManageAccountsIcon />}
        iconPosition="start"
        label="ABM Usuarios"
        onClick={() => {
          setValue(6);
          navigate("/Config");
        }}
        sx={{
          backgroundColor:
            value === 6 ? "rgba(1, 102, 43, 0.15)" : "transparent",
          justifyContent: "flex-start",
          boxShadow:
            value === 6 ? "0 4px 12px 0 rgba(0,0,0,0.16)" : "transparent",
          "&:hover": {
            color: "rgba(1, 102, 43)",
          },
          textTransform: "Initial",
          fontSize: "15px",
        }}
      />
    </Tabs>
  );
};

export { MenuProvider, useMenuContext, VerticalTabs };
