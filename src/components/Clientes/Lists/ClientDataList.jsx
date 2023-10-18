import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const ClientDataList = ({ open, onClose, selectedClientIndex }) => {
  const [ClientData, setClientData] = useState([]);

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get(
        `/clients/obtenerClientePorId/${selectedClientIndex}`
      );
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      {ClientData && (
        <div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Cliente:&nbsp;</p>
            </div>
            <div>
              <p>
                {ClientData.ClientName} {ClientData.ClientApellido}
              </p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">CUIT:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientCUIT}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">DNI:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientDNI}</p>
            </div>
          </div>

          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Dirección:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientAdress}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Email:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientEmail}</p>
            </div>
          </div>
          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Condición de facturación:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientIVACond}</p>
            </div>
          </div>

          <div className="d-flex w-100">
            <div>
              <p className="fw-bold">Teléfono:&nbsp;</p>
            </div>
            <div>
              <p>{ClientData.ClientTel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDataList;
