import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import AnimalesEdit from "./AnimalesEdit";
import AnimalesCreate from "./AnimalesCreate";
import animalesService from "../../services/animales.service";

export default function Animales() {
  const [animales, setAnimales] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        if (!currentUser) {
          navigate("/unauthorized");
          return;
        }

        let response;

        if (currentUser.roles.includes("ROLE_ADMIN")) {
          response = await animalesService.getAllAnimals();
        } else if (currentUser.roles.includes("ROLE_USER")) {
          response = await animalesService.getAnimalesByUserId(currentUser.id);
        }

        if (response && response.data) {
          setAnimales(response.data);
        }
      } catch (error) {
        console.error("Error al obtener animales:", error);
      }
    };

    fetchAnimales();
  }, [currentUser, navigate]);

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedAnimal(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedAnimal) => {
    animalesService.editarAnimal(editedAnimal.idAnimal ,editedAnimal)
      .then((response) => {
        console.log(response.data);
        setShowEditModal(false);
        alert("¡El animal se actualizó correctamente!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      });
  };

  const handleDelete = async (animal) => {
    let res = window.confirm("¿Está seguro de que desea eliminar el animal?");
    if (res) {
      try {
        await animalesService.deshabilitarAnimal(animal.idAnimal);
        const updatedAnimales = animales.map((a) =>
          a.idAnimal === animal.idAnimal ? { ...a, disponible: false } : a
        );
        setAnimales(updatedAnimales);
      } catch (error) {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="page">
        <div className="container">
          <h2 className="mb-4">Animales</h2>

          <div className="row mb-5">
            <div className="col-8">
              <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>
            <div className="col-4">
              <AnimalesCreate />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Raza</th>
                  <th>Collar</th>
                  <th>Carnet</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {animales
                  .filter((animal) => animal.disponible) // Filtrar solo los animales disponibles
                  .map((animal, index) => (
                    <tr key={index}>
                      <td>{animal.nombre}</td>
                      <td>{animal.tipo}</td>
                      <td>{animal.raza}</td>
                      <td>{animal.collar ? "Sí" : "No"}</td>
                      <td>{animal.requiereCarnet ? "Sí" : "No"}</td>
                      <td>
                        {new Date(animal.fechaNacimiento).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(animal)}
                        >
                          <PencilSquare />
                        </button>
                        <button
                          className="disable-button ms-3"
                          onClick={() => handleDelete(animal)}
                        >
                          <ExclamationTriangle />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Modal de edición */}
          {selectedAnimal && (
            <AnimalesEdit
              show={showEditModal}
              onClose={handleEditModalClose}
              animal={selectedAnimal}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      </section>
    </>
  );
}
