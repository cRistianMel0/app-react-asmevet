import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
// import animalService from "../../services/animal.service";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import AnimalesEdit from "./AnimalesEdit";

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
        let response;

        // Verificar si el usuario está autenticado y tiene el rol de administrador
        if (
          currentUser &&
          currentUser.roles &&
          currentUser.roles.includes("ROLE_ADMIN")
        ) {
          // Si es un administrador, cargar todos los animales
          response = await animalService.getAnimales();
        } else if (
          currentUser &&
          currentUser.roles &&
          currentUser.roles.includes("ROLE_USER")
        ) {
          // Si es un usuario normal, cargar los animales asociados a su idUser
          response = await animalService.getAnimalesByUserId(currentUser.id);
        } else {
          // Si el usuario no está autenticado, redirigir a una página de no autorizado
          navigate("/unauthorized");
          return; // Terminar la ejecución del useEffect si no está autenticado
        }

        setAnimales(response.data);
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
    animalService
      .updateAnimal(editedAnimal)
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

  const handleDelete = (animal) => {
    let res = window.confirm("¿Está seguro de que desea eliminar el animal?");
    if (res) {
      animalService
        .deleteAnimal(animal.idAnimal)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          window.alert(`Se ha generado un problema en el servidor ${error}`);
        });
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
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dueño</th>
                  <th>Tipo</th>
                  <th>Raza</th>
                  <th>Collar</th>
                  <th>Carnet</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {animales.map((animal, index) => (
                  <tr key={index}>
                    <td>{animal.nombre}</td>
                    <td>{animal.usuario.username}</td>
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
                        className="disable-button"
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
