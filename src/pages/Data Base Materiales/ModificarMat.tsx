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
  const [categoria, setCategoria] = useState("");
  const [materials, setMaterials] = useState([]);
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
  const [updatedAncho, setUpdatedAncho] = useState<number>(0);
  const [updatedAlto, setUpdatedAlto] = useState<number>(0);
  const [updatedLargo, setUpdatedLargo] = useState<number>(0);
  const [updatedEspesor, setUpdatedEspesor] = useState<number>(0);
  const [updatedPrice, setUpdatedPrice] = useState<number>(0);

  useEffect(() => {
    setEditableMaterial(selectedMaterial);
  }, [selectedMaterial]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedMaterial(editableMaterial);
  };

  const handleCatChange = (e) => {
    setCategoria(e.target.value);
  };

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

  const handleSaveDetail = () => {
    setSelectedMaterial(updatedMaterial);
    setEditModalOpen(false);
  };

  const handleSelectDetail = (material) => {
    setEditModalOpen(true);
  };

  const rows = JSON.parse(localStorage.getItem("materials") || "[]");

  const searchedMaterials = searchTerm
    ? rows.filter((material: Material) =>
        material.matDetail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
          className="CreateModal"
        >
          <React.Fragment>
            <Title>Modificar Material</Title>
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
                <h4>Material seleccionado</h4>
                <p onClick={handleSelectDetail}>
                  Detail: {selectedMaterial.matDetail}
                </p>
                <p onClick={handleSelectDetail}>
                  Category: {selectedMaterial.matCategory}
                </p>
                <p onClick={handleSelectDetail}>
                  Ancho: {selectedMaterial.matAncho} m.
                </p>
                <p onClick={handleSelectDetail}>
                  Alto: {selectedMaterial.matAlto} m.
                </p>
                <p onClick={handleSelectDetail}>
                  Largo: {selectedMaterial.matLargo} m.
                </p>
                <p onClick={handleSelectDetail}>
                  Espesor: {selectedMaterial.matEspesor} mm.
                </p>
                <p onClick={handleSelectDetail}>
                  Costo: $
                  {selectedMaterial.matPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((material) => (
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
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="updatedDetail">Updated Detail:</label>
            <input
              type="text"
              id="updatedDetail"
              name="matDetail"
              value={updatedDetail || ""}
              onChange={handleMaterialInputChange}
            />

            {/* Other input fields for each detail */}
            <label htmlFor="updatedCategory">Updated Category:</label>
            <input
              type="text"
              id="updatedCategory"
              name="matCategory"
              value={updatedCategory || ""}
              onChange={handleMaterialInputChange}
            />

            <label htmlFor="updatedAncho">Updated Ancho:</label>
            <input
              type="number"
              id="updatedAncho"
              name="matAncho"
              value={updatedAncho || ""}
              onChange={handleMaterialInputChange}
            />

            <label htmlFor="updatedAlto">Updated Alto:</label>
            <input
              type="number"
              id="updatedAlto"
              name="matAlto"
              value={updatedAlto || ""}
              onChange={handleMaterialInputChange}
            />

            <button type="submit" onClick={handleSaveDetail}>
              Save
            </button>
          </form>
        </Paper>
      </Modal>
    </React.Fragment>
  );
};

export default ModificarMat;
