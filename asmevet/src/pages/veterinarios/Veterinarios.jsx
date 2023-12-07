import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import authService from "../../services/auth.service";
import VeterinariosEdit from "./VeterinariosEdit";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVeterinario, setSelectedVeterinario] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Verificar si el usuario está autenticado y tiene el rol de administrador
        if (currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN")) {
          // Si es un administrador, cargar los veterinarios
          fetchVeterinarios();
        } else {
          // Si el usuario no es un administrador o no está autenticado, redirigir a una página de no autorizado
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };

    checkUserRole();
  }, [navigate]);

  const fetchVeterinarios = async () => {
    try {
      const response = await authService.obtenerUsuariosRol(2);
      const users = response.data.users; // Acceder a la lista de usuarios desde la respuesta

      setVeterinarios(users); // Establecer los usuarios en el estado de veterinarios
    } catch (error) {
      console.error("Error al obtener veterinarios:", error);
    }
  };


  const handleEdit = (veterinario) => {
    setSelectedVeterinario(veterinario);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedVeterinario(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedVeterinario) => {
    authService.updateUser(editedVeterinario)
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
                  <th className="thHead">Nombre</th>
                  <th className="thHead">Apellido</th>
                  <th className="thHead">Tipo Doc</th>
                  <th className="thHead">Número Documento</th>
                  <th className="thHead">Teléfono</th>
                  <th className="thHead">Acciones</th>
                  <th className="thHead">Nombre</th>
                  <th className="thHead">Email</th>
                  <th className="thHead">Fecha Nacimiento</th>
                  <th className="thHead">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {veterinarios.map((cliente, index) => (
                  <tr key={index}>
                    {Object.keys(cliente).map((key) => {
                      if (key !== 'id') {
                        // Verificar si la propiedad es una fecha y formatearla
                        const value = key === 'fechaNacimiento'
                          ? new Date(cliente[key]).toLocaleDateString() // Formatear la fecha
                          : cliente[key];

                        return (
                          <td key={key}>{value}</td>
                        );
                      }
                      return null;
                    })}
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(cliente)}
                      >
                        <PencilSquare />
                      </button>
                      <button
                        className="disable-button"
                        onClick={() => handleDelete(cliente)}
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
