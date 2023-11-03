import React from "react";
import fetchClientByID from "../../../hooks/fetchClientByID";

const ClientDataList = ({
  open,
  onClose,
  selectedClientIndex,
  onClientChange,
}) => {
  const ClientData = fetchClientByID(selectedClientIndex, onClientChange);

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
            <div className="d-flex w-50">
              <div>
                <p className="fw-bold">Teléfono:&nbsp;</p>
              </div>
              <div>
                <p>{ClientData.ClientTel}</p>
              </div>
            </div>
            <div className="d-flex w-50">
              <div>
                <p className="fw-bold">Estado:&nbsp;</p>
              </div>
              <div>
                <p>{ClientData.ClientStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDataList;
