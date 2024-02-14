import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Grid,
} from "@mui/material";
import DeleteButton from "../../../../DeleteButton";
import useFetchTerminaciones from "../../../../../hooks/Presupuestos/Puertas/Config/fetchTerminaciones";

const InfoInsumosTerminacionForm = ({ terminacionIndex, onMatsEdit }) => {
  const { loading, Terminaciones, fetchTerminaciones } =
    useFetchTerminaciones();
  const terminacion = Terminaciones[terminacionIndex];
  const mats = terminacion?.Materiales || [];

  const [editedMats, setEditedMats] = useState([...mats]);

  useEffect(() => {
    setEditedMats(mats);
  }, [mats]);

  const handleInputChange = (value, rowIndex, field) => {
    const updatedMats = [...editedMats];
    updatedMats[rowIndex][field] = value;
    setEditedMats(updatedMats);
    onMatsEdit(updatedMats);
  };

  return (
    <form id="matForm">
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 300,
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
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "60%" }}
                className="text-center fw-bold"
              >
                Descripcion
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "10%" }}
                className="text-center fw-bold"
              >
                Presentación
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "10%" }}
                className="text-center fw-bold"
              >
                Cantidad
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "15%" }}
                className="text-center fw-bold"
              >
                Unidad
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {editedMats.map((material, index) => (
              <TableRow key={index}>
                <TableCell sx={{ borderColor: "#fff" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    variant="standard"
                    value={material?.Descripcion || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, index, "Descripcion")
                    }
                  />
                </TableCell>
                <TableCell sx={{ borderColor: "#fff" }}>
                  <TextField
                    variant="standard"
                    value={material?.Presentacion || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, index, "Presentacion")
                    }
                  />
                </TableCell>
                <TableCell sx={{ borderColor: "#fff" }}>
                  <TextField
                    variant="standard"
                    value={material?.Cantidad || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, index, "Cantidad")
                    }
                  />
                </TableCell>
                <TableCell sx={{ borderColor: "#fff" }}>
                  <TextField
                    variant="standard"
                    value={material?.Unidad || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, index, "Unidad")
                    }
                  />
                </TableCell>
                <TableCell className="text-center" sx={{ borderColor: "#fff" }}>
                  <DeleteButton onDelete={() => handleDeleteMaterial(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </form>
  );
};

export default InfoInsumosTerminacionForm;
