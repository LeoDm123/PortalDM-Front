import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../DeleteButton";
import useFetchConceptos from "../../../hooks/Config/fetchConceptos";
import DeleteConcepto from "../../../hooks/Config/deleteConcepto";

const ConceptoPagoList = ({ onConceptCreation }) => {
  const { loading, conceptos, fetchConceptos } = useFetchConceptos();
  const { deleteConcepto, error } = DeleteConcepto();
  const [onConceptDelete, setOnConceptDelete] = useState(false);

  const handleOnConceptDelete = () => {
    setOnConceptDelete(!onConceptDelete);
  };

  useEffect(() => {
    fetchConceptos();
  }, [onConceptCreation, onConceptDelete]);

  useEffect(() => {
    console.log("Conceptos", conceptos);
  }, [conceptos]);

  const handleDeleteConcepto = async (index) => {
    swal({
      title: "¿Desea eliminar el concepto?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        await deleteConcepto(index);
        handleOnConceptDelete();
      }
    });
  };

  return (
    <div>
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 240,
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
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Detalle
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conceptos.map((concepto, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{concepto}</TableCell>
                <TableCell className="text-center">
                  <DeleteButton onDelete={() => handleDeleteConcepto(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default ConceptoPagoList;
