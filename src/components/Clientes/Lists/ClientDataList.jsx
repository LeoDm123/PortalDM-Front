import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const ClientDataList = ({ open, onClose, selectedClientIndex }) => {
  const [ClientData, setClientData] = useState([]);
  const [onPay, setOnPay] = useState(true);

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get("/clients/obtenerClientes");
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const DeletePres = async (clientId, _id) => {
    try {
      const client = ClientData[selectedClientIndex];

      if (!client) {
        console.error("Cliente no encontrado.");
        return;
      }

      console.log(client.Presupuestos);

      const presupuestoToDelete = client.Presupuestos.find(
        (presupuesto) => presupuesto._id === _id
      );

      console.log(presupuestoToDelete._id);

      if (!presupuestoToDelete) {
        console.error(`Presupuesto con código ${_id} no encontrado.`);
        return;
      }

      const deleteResp = await serverAPI.delete(
        `/pres/deletePres/${clientId}/${presupuestoToDelete._id}`
      );

      if (deleteResp.data.message === "Presupuesto deleted successfully") {
        console.log(deleteResp);
        fetchClientsData();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePres = (codigo) => {
    swal({
      title: "¿Desea borrar el presupuesto?",
      text: "Una vez borrado, este no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Presupuesto borrado con éxito!", {
          icon: "success",
        });
        DeletePres(ClientData[selectedClientIndex]._id, codigo);
      }
    });
  };

  const handleOnPay = () => {
    setOnPay(!onPay);
  };

  useEffect(() => {
    fetchClientsData();
  }, [DeletePres, handleOnPay]);

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#01662b",
      },
      secondary: {
        main: "#6a6a6a",
      },
    },
  });

  return (
    <div>
      {ClientData[selectedClientIndex] && (
        <div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Cliente:&nbsp;</p>
            </div>
            <div>
              <p>
                {ClientData[selectedClientIndex].ClientName}{" "}
                {ClientData[selectedClientIndex].ClientApellido}
              </p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">CUIT:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientCUIT}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">DNI:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientDNI}</p>
            </div>
          </div>

          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Dirección:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientAdress}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Email:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientEmail}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Condición de facturación:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientIVACond}</p>
            </div>
          </div>

          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Teléfono:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData[selectedClientIndex].ClientTel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDataList;
