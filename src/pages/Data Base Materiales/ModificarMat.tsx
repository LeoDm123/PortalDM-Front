import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../components/Title";
import "../../App.css";
import ModifyIconButton from "../../components/Data Base Materiales/ModifyIconButton";
import SaveChangesButton from "../../components/Data Base Materiales/SaveChangesButton";
import GoBackButton from "../../components/GoBackButton";
import CloseButton from "../../components/CloseButton";

interface MatListProps {
  handleFilterChange: (selectedCategory: string) => void;
}

interface Material {
  id: number;
  matDetail: string;
  matCategory: string;
  matAncho: number;
  matAlto: number;
  matLargo: number;
  matEspesor: number;
  matPrice: number;
}

const ModificarMat = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [editableMaterial, setEditableMaterial] = useState<Material | null>(
    null
  );
  const [updatedMaterial, setUpdatedMaterial] = useState<Material | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [updatedDetail, setUpdatedDetail] = useState<string>("");
  const [updatedCategory, setUpdatedCategory] = useState<string>("");
  const [updatedAncho, setUpdatedAncho] = useState<number>(NaN);
  const [updatedAlto, setUpdatedAlto] = useState<number>(NaN);
  const [updatedLargo, setUpdatedLargo] = useState<number>(NaN);
  const [updatedEspesor, setUpdatedEspesor] = useState<number>(NaN);
  const [updatedPrice, setUpdatedPrice] = useState<number>(NaN);

  useEffect(() => {
    setEditableMaterial(selectedMaterial);
  }, [selectedMaterial]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedMaterial(null);
    setEditableMaterial(null);
  };

  const handleSelectMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setEditableMaterial(material);
    setUpdatedMaterial(material);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleMaterialInputChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding field in the updatedMaterial state based on the input's name
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
    ? rows.filter((material: Material) =>
        material.matDetail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMaterial || !editableMaterial) {
      return;
    }

    // Create a copy of the selectedMaterial to avoid modifying the original directly
    const updatedMaterialCopy = { ...selectedMaterial };

    // Check and update the fields that have been modified and are not empty
    if (updatedDetail.trim() !== "") {
      updatedMaterialCopy.matDetail = updatedDetail.trim();
    }
    if (updatedCategory.trim() !== "") {
      updatedMaterialCopy.matCategory = updatedCategory.trim();
    }

    // Check and update the numeric fields if they are not empty (allowing 0 as a valid value)
    if (updatedAncho !== null) {
      const parsedAncho = parseFloat(updatedAncho);
      updatedMaterialCopy.matAncho = isNaN(parsedAncho)
        ? updatedMaterialCopy.matAncho
        : parsedAncho;
    }
    if (updatedAlto !== null) {
      const parsedAlto = parseFloat(updatedAlto);
      updatedMaterialCopy.matAlto = isNaN(parsedAlto)
        ? updatedMaterialCopy.matAlto
        : parsedAlto;
    }
    if (updatedLargo !== null) {
      const parsedLargo = parseFloat(updatedLargo);
      updatedMaterialCopy.matLargo = isNaN(parsedLargo)
        ? updatedMaterialCopy.matLargo
        : parsedLargo;
    }
    if (updatedEspesor !== null) {
      const parsedEspesor = parseFloat(updatedEspesor);
      updatedMaterialCopy.matEspesor = isNaN(parsedEspesor)
        ? updatedMaterialCopy.matEspesor
        : parsedEspesor;
    }
    if (updatedPrice !== null) {
      const parsedPrice = parseFloat(updatedPrice);
      updatedMaterialCopy.matPrice = isNaN(parsedPrice)
        ? updatedMaterialCopy.matPrice
        : parsedPrice;
    }

    // Find the index of the updated material in the rows array
    const updatedMaterialIndex = rows.findIndex(
      (material: Material) => material.id === updatedMaterialCopy.id
    );

    if (updatedMaterialIndex !== -1) {
      // Replace the old material with the updated material in the rows array
      const updatedRows = [...rows];
      updatedRows[updatedMaterialIndex] = updatedMaterialCopy;

      // Save the updated rows array to localStorage
      localStorage.setItem("materials", JSON.stringify(updatedRows));

      // Update the state with the updated material
      setSelectedMaterial(updatedMaterialCopy);

      // Reset the state variables to clear the fields
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

  return (
    <React.Fragment>
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
          <React.Fragment>
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
            {/* CONDICIONAL ¿HAY ALGUN MATERIAL SELECCIONADO? */}
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
                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Categoría:</p>
                    <p>{selectedMaterial.matCategory}</p>
                  </div>
                  <form
                    className="d-flex align-items-center w-50 my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="w-50" htmlFor="updatedCategory">
                      Modificar Categoría:
                    </label>
                    <input
                      type="text"
                      id="updatedCategory"
                      list="datalistOptions"
                      name="matCategory"
                      className="form-control"
                      value={updatedCategory || ""}
                      onChange={handleMaterialInputChange}
                    />
                    <datalist id="datalistOptions">
                      <option value="Madera Maciza y Alistonados" />
                      <option value="Placas de MDF y Cantos " />
                      <option value="Decks y Revestimientos de WPC" />
                      <option value="Insumos de Lustre" />
                      <option value="Insumos Varios" />
                    </datalist>
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Ancho:</p>
                    <p>{selectedMaterial.matAncho} m.</p>
                  </div>
                  <form
                    className="d-flex align-items-center my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="ModifyFormLabel" htmlFor="updatedAncho">
                      Modificar Ancho:
                    </label>
                    <input
                      type="number"
                      id="updatedAncho"
                      name="matAncho"
                      className="form-control w-25"
                      value={updatedAncho || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>

                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Alto:</p>
                    <p>{selectedMaterial.matAlto} m.</p>
                  </div>
                  <form
                    className="d-flex align-items-center my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="ModifyFormLabel" htmlFor="updatedAlto">
                      Modificar Alto:
                    </label>
                    <input
                      type="number"
                      id="updatedAlto"
                      name="matAlto"
                      className="form-control w-25"
                      value={updatedAlto || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>

                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Largo:</p>
                    <p>{selectedMaterial.matLargo} m.</p>
                  </div>
                  <form
                    className="d-flex align-items-center my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="ModifyFormLabel" htmlFor="updatedLargo">
                      Modificar Largo:
                    </label>
                    <input
                      type="number"
                      id="updatedLargo"
                      name="matLargo"
                      className="form-control w-25"
                      value={updatedLargo || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>

                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Espesor:</p>
                    <p>{selectedMaterial.matEspesor} mm.</p>
                  </div>
                  <form
                    className="d-flex align-items-center my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="ModifyFormLabel" htmlFor="updatedEspesor">
                      Modificar Espesor:
                    </label>
                    <input
                      type="number"
                      id="updatedEspesor"
                      name="matEspesor"
                      className="form-control w-25"
                      value={updatedEspesor || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>

                <div className="d-flex align-items-center">
                  <div className="SelectedMaterialDetailColumn">
                    <p className="fw-bold me-1">Precio:</p>
                    <p>
                      ${" "}
                      {selectedMaterial.matPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <form
                    className="d-flex align-items-center my-1"
                    onSubmit={handleSubmit}
                  >
                    <label className="ModifyFormLabel" htmlFor="updatedPrice">
                      Modificar Precio:
                    </label>
                    <input
                      type="number"
                      id="updatedPrice"
                      name="matPrice"
                      className="form-control w-25"
                      value={updatedPrice || ""}
                      onChange={handleMaterialInputChange}
                    />
                  </form>
                </div>
                <SaveChangesButton onPress={handleSubmit} />
              </div>
            ) : // SI HAY UN MATERIAL SELECCIONADO, ¿SEARCHTERM ESTA VACIO?
            searchTerm === "" ? ( // SI ESTA VACIO, MOSTRAR TODOS LOS MATERIALES
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Detalle
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Categoría
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Ancho [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Alto [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Largo [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Espesor [mm.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnM">
                      Costo [$]
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((material: Material) => (
                    <TableRow
                      key={material.id}
                      onClick={() => handleSelectMaterial(material)}
                    >
                      <TableCell className="text-start">
                        {material.matDetail}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matCategory}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matAncho} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matAlto} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matLargo} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matEspesor} mm.
                      </TableCell>
                      <TableCell className="text-center">
                        ${" "}
                        {material.matPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <ModifyIconButton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : searchedMaterials.length > 0 ? ( //SI HAY ALGO ESCRITO EN EL INPUT, MOSTRAR LOS MATERIALES QUE CONCUERDAN
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Detalle
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnXL">
                      Categoría
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Ancho [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Alto [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Largo [m.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnS">
                      Espesor [mm.]
                    </TableCell>
                    <TableCell className="text-center fw-bold MatListColumnM">
                      Costo [$]
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchedMaterials.map((material: Material) => (
                    <TableRow
                      className="align-items-center justify-content-center"
                      key={material.id}
                      onClick={() => handleSelectMaterial(material)}
                    >
                      <TableCell className="text-start">
                        {material.matDetail}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matCategory}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matAncho} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matAlto} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matLargo} m.
                      </TableCell>
                      <TableCell className="text-center">
                        {material.matEspesor} mm.
                      </TableCell>
                      <TableCell className="text-center">
                        ${" "}
                        {material.matPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <ModifyIconButton />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No se encontraron los materiales.</p> // MOSTRAR ESTE MENSAJE SI NO SE ENCUENTRA ALGUN MATERIAL
            )}
          </React.Fragment>
        </Paper>
      </Modal>
      {/* MODAL PARA INGRESAR EL VALOR A MODIFICAR */}
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
    </React.Fragment>
  );
};

export default ModificarMat;
