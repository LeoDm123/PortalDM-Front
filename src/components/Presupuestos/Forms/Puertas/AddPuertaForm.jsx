import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Title from "../../../Title";
import { DividerTitle } from "../../../Dividers";
import PersonalSwitch from "../../../Switch";

const AddPuertaForm = ({ onClose, onMatSubmit }) => {
  const [EnchapadoVisible, setEnchapadoVisible] = useState(false);
  const [Tipologia, setTipologia] = useState("");
  const [Hoja, setHoja] = useState("");
  const [Enchapado, setEnchapado] = useState("");
  const [Terminacion, setTerminacion] = useState("");
  const [Marco, setMarco] = useState("");
  const [Ancho, setAncho] = useState(0);
  const [Alto, setAlto] = useState(0);
  const [Cantidad, setCantidad] = useState(0);
  const [Vidrio, setVidrio] = useState("");
  const [AnchoVidrio, setAnchoVidrio] = useState(0);
  const [AltoVidrio, setAltoVidrio] = useState(0);
  const [CantVidrio, setCantVidrio] = useState(0);
  const [Apliques, setApliques] = useState("");
  const [MarcoEnv, setMarcoEnv] = useState(false);
  const [SinHerrajes, setSinHerrajes] = useState(false);
  const [PuertaPpal, setPuertaPpal] = useState(false);
  const [PuertaCorrediza, setPuertaCorrediza] = useState(false);

  const puertasIniciales = JSON.parse(localStorage.getItem("puertas")) || [];
  localStorage.setItem("puertas", JSON.stringify(puertasIniciales));

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const nuevaPuerta = {
      Tipologia,
      Hoja,
      Enchapado,
      Terminacion,
      Marco,
      Ancho,
      Alto,
      Cantidad,
      Vidrio,
      AnchoVidrio,
      AltoVidrio,
      CantVidrio,
      Apliques,
      MarcoEnv,
      SinHerrajes,
      PuertaCorrediza,
      PuertaPpal,
    };

    const puertasGuardadas = JSON.parse(localStorage.getItem("puertas")) || [];

    const nuevasPuertas = [...puertasGuardadas, nuevaPuerta];

    localStorage.setItem("puertas", JSON.stringify(nuevasPuertas));

    setTipologia(""),
      setMarco(""),
      setHoja(""),
      setAncho(0),
      setAlto(0),
      setCantidad(0),
      setVidrio(""),
      setAltoVidrio(0),
      setAnchoVidrio(0),
      setCantVidrio(0);
    setApliques(""),
      setSinHerrajes(false),
      setMarcoEnv(false),
      setPuertaPpal(false),
      setPuertaCorrediza(false);
  };

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <Title>Agregar Puerta</Title>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <DividerTitle />
      <Grid sx={{ marginY: 1 }}>
        <Typography>Características de Marco y Hoja</Typography>
      </Grid>
      <Grid display={"flex"} sx={{ marginTop: 2 }}>
        <TextField
          type="text"
          className="form-control me-3 w-25"
          name="Tipologia"
          placeholder="Tipología"
          value={Tipologia}
          onChange={(e) => setTipologia(e.target.value)}
          label="Tipología"
        />
        <TextField
          type="number"
          className="form-control me-3 w-25"
          name="Ancho"
          placeholder="Ancho"
          value={Ancho}
          onChange={(e) => setAncho(e.target.value)}
          label="Ancho [mm.]"
        />
        <TextField
          type="number"
          className="form-control me-3 w-25"
          name="Alto"
          placeholder="Alto"
          value={Alto}
          onChange={(e) => setAlto(e.target.value)}
          label="Alto [mm.]"
        />
        <TextField
          type="number"
          className="form-control  w-25"
          name="Cantidad"
          placeholder="Cantidad"
          value={Cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          label="Cantidad [u.]"
        />
      </Grid>
      <Grid display={"flex"}>
        <FormControl className="form-floating w-50">
          <InputLabel>Sección de Marco</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Marco"
            value={Marco}
            onChange={(e) => setMarco(e.target.value)}
          >
            <MenuItem disabled value="">
              Seleccionar una sección de marco
            </MenuItem>
            <MenuItem value='2" x 2"'>Marco 2" x 2" (Ancho: 5,08 cm.)</MenuItem>
            <MenuItem value='2" x 3"'>Marco 2" x 3" (Ancho: 7,62 cm.)</MenuItem>
            <MenuItem value='2" x 4"'>
              Marco 2" x 4" (Ancho: 10,16 cm.)
            </MenuItem>
            <MenuItem value='2" x 5"'>
              Marco 2" x 5" (Ancho: 12,70 cm.)
            </MenuItem>
            <MenuItem value='2" x 6"'>
              Marco 2" x 6" (Ancho: 15,24 cm.)
            </MenuItem>
            <MenuItem value='2" x 7"'>
              Marco 2" x 7" (Ancho: 17,78 cm.)
            </MenuItem>
            <MenuItem value='2" x 8"'>
              Marco 2" x 8" (Ancho: 20,32 cm.)
            </MenuItem>
            <MenuItem value='2" x 9"'>
              Marco 2" x 9" (Ancho: 22,86 cm.)
            </MenuItem>
            <MenuItem value='2" x 10"'>
              Marco 2" x 10" (Ancho: 25,40 cm.)
            </MenuItem>
            <MenuItem value='2" x 11"'>
              Marco 2" x 11" (Ancho: 27,94 cm.)
            </MenuItem>
            <MenuItem value='2" x 12"'>
              Marco 2" x 12" (Ancho: 30,48 cm.)
            </MenuItem>
            <MenuItem value='2" x 13"'>
              Marco 2" x 13" (Ancho: 33,02 cm.)
            </MenuItem>
            <MenuItem value='2" x 14"'>
              Marco 2" x 14" (Ancho: 35,56 cm.)
            </MenuItem>
            <MenuItem value='2" x 15"'>
              Marco 2" x 15" (Ancho: 38,10 cm.)
            </MenuItem>
            <MenuItem value='2" x 16"'>
              Marco 2" x 16" (Ancho: 40,64 cm.)
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-floating w-50 mx-3">
          <InputLabel>Tipo de Hoja</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Hoja"
            value={Hoja}
            onChange={(e) => setHoja(e.target.value)}
          >
            <MenuItem disabled value="">
              Seleccionar un tipo de hoja
            </MenuItem>
            <MenuItem value="hoja simple">Hoja Simple</MenuItem>
            <MenuItem value="hoja doble">Hoja Doble</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-floating w-50">
          <InputLabel htmlFor="categoria">Apliques</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Apliques"
            value={Apliques}
            onChange={(e) => setApliques(e.target.value)}
          >
            <MenuItem disabled value="">
              Seleccionar apliques
            </MenuItem>
            <MenuItem value="moldura aplicada">Con Moldura Aplicada</MenuItem>
            <MenuItem value="revestimiento alistonado simple">
              Revestimiento Alistonado Simple
            </MenuItem>
            <MenuItem value="revestimiento alistonado doble">
              Revestimiento Alistonado Doble
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <DividerTitle />
      <Grid sx={{ marginTop: 1 }}>
        <Typography>Características de Terminación</Typography>
      </Grid>
      <Grid display={"flex"}>
        <FormControl className="form-floating w-50 me-3">
          <InputLabel>Tipo de Terminación</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Terminacion"
            value={Terminacion}
            onChange={(e) => {
              setTerminacion(e.target.value);
              setEnchapadoVisible(e.target.value === "lustre poliuretánico");
              setEnchapado("");
            }}
          >
            <MenuItem disabled value="">
              Seleccionar un tipo de terminación
            </MenuItem>
            <MenuItem value="lustre poliuretánico">
              Lustre Poliuretánico
            </MenuItem>
            <MenuItem value="pintura e hidrolaca">Pintura e Hidrolaca</MenuItem>
            <MenuItem value="pintura base">Pintura Base</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className={`form-floating w-50 me-3 ${
            EnchapadoVisible ? "" : "disabled"
          }`}
        >
          <InputLabel>Tipo de Enchapado</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Enchapado"
            value={Enchapado}
            onChange={(e) => setEnchapado(e.target.value)}
            disabled={!EnchapadoVisible}
          >
            <MenuItem disabled value="">
              Seleccionar un tipo de enchapado
            </MenuItem>
            <MenuItem value="Cedro">Enchapado en Cedro</MenuItem>
            <MenuItem value="Paraíso">Enchapado en Paraíso</MenuItem>
            <MenuItem value="Petiribí">Enchapado en Petiribí</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <DividerTitle />
      <Grid sx={{ marginTop: 1 }}>
        <Typography>Características de Vidrio</Typography>
      </Grid>
      <Grid display={"flex"}>
        <FormControl className="form-floating w-50 me-3">
          <InputLabel>Tipo de Vidrio</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="Vidrio"
            value={Vidrio}
            onChange={(e) => setVidrio(e.target.value)}
          >
            <MenuItem disabled value="">
              Seleccionar un tipo de vidrio
            </MenuItem>
            <MenuItem value="Float-04">Float Incoloro 4mm.</MenuItem>
            <MenuItem value="Float-05">Float Incoloro 5mm.</MenuItem>
            <MenuItem value="Float-05G">Float Gris/Bce. 5mm.</MenuItem>
            <MenuItem value="Float-05T">Float Incoloro 5mm. Templado</MenuItem>
            <MenuItem value="Float-06">Float Incoloro 6mm.</MenuItem>
            <MenuItem value="Float-06G">Float Gris/Bce. 6mm.</MenuItem>
            <MenuItem value="Float-06T">Float Incoloro 6mm. Templado</MenuItem>
            <MenuItem value="Op-04">Opacid 4mm.</MenuItem>
            <MenuItem value="Lam-3+3">Laminado Incoloro 3+3mm.</MenuItem>
            <MenuItem value="Lam-3+3OP">Laminado Opalino 3+3mm.</MenuItem>
            <MenuItem value="Lam-4+4">Laminado Incoloro 4+4mm.</MenuItem>
            <MenuItem value="Lam-5+5">Laminado Incoloro 5+5mm.</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          className="form-control mt-3 me-3 w-25"
          name="AnchoVidrio"
          placeholder="AnchoVidrio"
          value={AnchoVidrio}
          onChange={(e) => setAnchoVidrio(e.target.value)}
          label="Ancho Vidrio [mm.]"
        />
        <TextField
          type="number"
          className="form-control mt-3 me-3 w-25"
          name="AltoVidrio"
          placeholder="AltoVidrio"
          value={AltoVidrio}
          onChange={(e) => setAltoVidrio(e.target.value)}
          label="Alto Vidrio [mm.]"
        />
        <TextField
          type="number"
          className="form-control mt-3 w-25"
          name="CantVidrio"
          placeholder="CantVidrio"
          value={CantVidrio}
          onChange={(e) => setCantVidrio(e.target.value)}
          label="Cantidad de Vidrios [u.]"
        />
      </Grid>

      <DividerTitle />
      <Grid sx={{ marginY: 1 }}>
        <Typography>Características Extra</Typography>
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <PersonalSwitch
          checked={MarcoEnv}
          onChange={() => setMarcoEnv(!MarcoEnv)}
          defaultChecked={false}
          label="Marco Envolvente"
        />
        <PersonalSwitch
          checked={SinHerrajes}
          onChange={() => setSinHerrajes(!SinHerrajes)}
          label="Sin colocación de Herrajes"
        />
        <PersonalSwitch
          checked={PuertaCorrediza}
          onChange={() => setPuertaCorrediza(!PuertaCorrediza)}
          defaultChecked={false}
          label="Puerta Corrediza"
        />
        <PersonalSwitch
          checked={PuertaPpal}
          onChange={() => setPuertaPpal(!PuertaPpal)}
          defaultChecked={false}
          label="Puerta Principal"
        />
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className="mt-2"
      >
        Agregar Puerta
      </Button>
    </form>
  );
};

export default AddPuertaForm;
