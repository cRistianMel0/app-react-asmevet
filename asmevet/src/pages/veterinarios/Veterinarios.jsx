import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import userService from "../../services/user.service";
import VeterinariosEdit from "./VeterinariosEdit";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVeterinario, setSelectedVeterinario] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchVeterinarios = async () => {
      try {
        const response = await userService.getUsersByRole("ROLE_VETERINARIO");
        setVeterinarios(response.data);
      } catch (error) {
        console.error("Error al obtener veterinarios:", error);
      }
    };

    fetchVeterinarios();
  }, []);

  const handleEdit = (veterinario) => {
    setSelectedVeterinario(veterinario);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedVeterinario(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedVeterinario) => {
    veterinariosService
      .update(editedVeterinario)
      .then((response) => {
        console.log(response.data);
        setShowEditModal(false);
        alert("¡El veterinario se actualizó correctamente!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      });
  };

  const handleDelete = (veterinario) => {
    let res = window.confirm(
      "¿Está seguro de que desea DESHABILITAR el veterinario?"
    );
    if (res) {
      veterinariosService
        .updateDisponibilidad(veterinario)
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
          <h2 className="mb-4">Veterinarios</h2>

          <div className="row mb-5">
            <div className="col-8">
              <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {veterinarios.map((veterinario, index) => (
                  <tr key={index}>
                    <td>{veterinario.username}</td>
                    <td>{veterinario.email}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(veterinario)}
                      >
                        <PencilSquare />
                      </button>
                      <button
                        className="disable-button"
                        onClick={() => handleDelete(veterinario)}
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
          {selectedVeterinario && (
            <VeterinariosEdit
              show={showEditModal}
              onClose={handleEditModalClose}
              veterinario={selectedVeterinario}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      </section>
    </>
  );
}
