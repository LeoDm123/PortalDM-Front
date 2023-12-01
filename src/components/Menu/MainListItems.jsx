import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WindowIcon from "@mui/icons-material/Window";
import Collapse from "@mui/material/Collapse";
import PowerInputIcon from "@mui/icons-material/PowerInput";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

function MainListItems() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => navigate("/Main")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/PedidosMats")}
          >
            <ListItemIcon>
              <PowerInputIcon />
            </ListItemIcon>
            <ListItemText primary="Perfiles" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/PedidosMats")}
          >
            <ListItemIcon>
              <RoomPreferencesIcon />
            </ListItemIcon>
            <ListItemText primary="Herrajes" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate("/PedidosMats")}
          >
            <ListItemIcon>
              <WindowIcon />
            </ListItemIcon>
            <ListItemText primary="Vidrios" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate("/GestionarClientes")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Informes" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/BaseDatosMats")}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <RequestQuoteIcon />
        </ListItemIcon>
        <ListItemText primary="Presupuestos" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/Config")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItemButton>
    </List>
  );
}

export default MainListItems;
