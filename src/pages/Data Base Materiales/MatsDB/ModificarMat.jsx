import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../js/Title";
import "../../../App.css";
import ModifyIconButton from "../../../components/Data Base Materiales/ModifyIconButton";
import SaveChangesButton from "../../../components/Data Base Materiales/SaveChangesButton";
import GoBackButton from "../../../components/GoBackButton";
import CloseButton from "../../../components/CloseButton";
import DeleteButton from "../../../components/DeleteButton";

const ModificarMat = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [editableMaterial, setEditableMaterial] = useState(null);
  const [updatedMaterial, setUpdatedMaterial] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [updatedDetail, setUpdatedDetail] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedAncho, setUpdatedAncho] = useState(NaN);
  const [updatedAlto, setUpdatedAlto] = useState(NaN);
  const [updatedLargo, setUpdatedLargo] = useState(NaN);
  const [updatedEspesor, setUpdatedEspesor] = useState(NaN);
  const [updatedPrice, setUpdatedPrice] = useState(NaN);

  useEffect(() => {
    setEditableMaterial(selectedMaterial);
  }, [selectedMaterial]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedMaterial(null);
    setEditableMaterial(null);
  };

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    setEditableMaterial(material);
    setUpdatedMaterial(material);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleMaterialInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "matDetail":
        setUpdatedDetail(value);
        break;
      case "matCategory":
        setUpdatedCategory(value);
        break;
      case "matAncho":
        setUpdatedAncho(parseFloat(value));
        break;
      case "matAlto":
        setUpdatedAlto(parseFloat(value));
        break;
      case "matLargo":
        setUpdatedLargo(parseFloat(value));
        break;
      case "matEspesor":
        setUpdatedEspesor(parseFloat(value));
        break;
      case "matPrice":
        setUpdatedPrice(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const rows = JSON.parse(localStorage.getItem("materials") || "[]");

  const searchedMaterials = searchTerm
    ? rows.filter((material) =>
        material.matDetail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMaterial || !editableMaterial) {
      return;
    }

    const updatedMaterialCopy = { ...selectedMaterial };

    if (updatedDetail.trim() !== "") {
      updatedMaterialCopy.matDetail = updatedDetail.trim();
    }
    if (updatedCategory.trim() !== "") {
      updatedMaterialCopy.matCategory = updatedCategory.trim();
    }

    if (!isNaN(updatedAncho)) {
      const parsedAncho = parseFloat(updatedAncho);
      updatedMaterialCopy.matAncho = isNaN(parsedAncho)
        ? updatedMaterialCopy.matAncho
        : parsedAncho;
    }
    if (!isNaN(updatedAlto)) {
      const parsedAlto = parseFloat(updatedAlto);
      updatedMaterialCopy.matAlto = isNaN(parsedAlto)
        ? updatedMaterialCopy.matAlto
        : parsedAlto;
    }
    if (!isNaN(updatedLargo)) {
      const parsedLargo = parseFloat(updatedLargo);
      updatedMaterialCopy.matLargo = isNaN(parsedLargo)
        ? updatedMaterialCopy.matLargo
        : parsedLargo;
    }
    if (!isNaN(updatedEspesor)) {
      const parsedEspesor = parseFloat(updatedEspesor);
      updatedMaterialCopy.matEspesor = isNaN(parsedEspesor)
        ? updatedMaterialCopy.matEspesor
        : parsedEspesor;
    }
    if (!isNaN(updatedPrice)) {
      const parsedPrice = parseFloat(updatedPrice);
      updatedMaterialCopy.matPrice = isNaN(parsedPrice)
        ? updatedMaterialCopy.matPrice
        : parsedPrice;
    }

    const updatedMaterialIndex = rows.findIndex(
      (material) => material.id === updatedMaterialCopy.id
    );

    if (updatedMaterialIndex !== -1) {
      const updatedRows = [...rows];
      updatedRows[updatedMaterialIndex] = updatedMaterialCopy;

      localStorage.setItem("materials", JSON.stringify(updatedRows));

      setSelectedMaterial(updatedMaterialCopy);

      setUpdatedDetail("");
      setUpdatedCategory("");
      setUpdatedAncho(NaN);
      setUpdatedAlto(NaN);
      setUpdatedLargo(NaN);
      setUpdatedEspesor(NaN);
      setUpdatedPrice(NaN);
    }
  };

  const handleGoBack = () => {
    setSelectedMaterial(null);
    setUpdatedDetail("");
    setUpdatedCategory("");
    setUpdatedAncho(NaN);
    setUpdatedAlto(NaN);
    setUpdatedLargo(NaN);
    setUpdatedEspesor(NaN);
    setUpdatedPrice(NaN);
  };

  const handleDeletedMaterial = () => {
    if (!selectedMaterial) {
      return;
    }

    const updatedRows = rows.filter(
      (material) => material.id !== selectedMaterial.id
    );

    localStorage.setItem("materials", JSON.stringify(updatedRows));

    setSelectedMaterial(null);
    setEditableMaterial(null);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Paper
          sx={{
            p: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="MatListModal"
        >
          <>
            <div className="TitleButtonLayout">
              <Title>Modificar Material</Title>
              <CloseButton handleClick={onClose} />
            </div>
            <div>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Ingrese el nombre del material"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {selectedMaterial ? (
              <div className="mt-3 ms-1">
                <div className="TitleButtonLayout">
                  <h4>Material seleccionado</h4>
                  <GoBackButton handleClick={handleGoBack} />
                </div>
                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Detalle:</p>
                    <p>{selectedMaterial.matDetail}</p>
                  </div>

                  <form
                    className="d-flex align-items-center w-50 my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="w-50" htmlFor="updatedDetail">
                      Modificar Detalle:
                    </label>
                    <input
                      type="text"
                      id="updatedDetail"
                      name="matDetail"
                      className="form-control"
                      value={updatedDetail || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>
                {/* Resto del código similar */}
                {/* ... */}
              </div>
            ) : searchTerm === "" ? (
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Detalle
                    </TableCell>
                    {/* Resto de las columnas de la tabla */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="text-start">
                        {material.matDetail}
                      </TableCell>
                      {/* Resto de las celdas de la fila */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : searchedMaterials.length > 0 ? (
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Detalle
                    </TableCell>
                    {/* Resto de las columnas de la tabla */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchedMaterials.map((material) => (
                    <TableRow
                      className="align-items-center justify-content-center"
                      key={material.id}
                    >
                      <TableCell className="text-start">
                        {material.matDetail}
                      </TableCell>
                      {/* Resto de las celdas de la fila */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No se encontraron los materiales.</p>
            )}
          </>
        </Paper>
      </Modal>
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Paper
          sx={{
            p: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></Paper>
      </Modal>
    </>
  );
};

export default ModificarMat;
