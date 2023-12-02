import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import userService from "../../services/user.service";
import ClientesEdit from "./ClientesEdit";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Verificar si el usuario está autenticado y tiene el rol de administrador
        if (currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN")) {
          // Si es un administrador, cargar los veterinarios
          fetchClientes();
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

  const fetchClientes = async () => {
    try {
      const response = await userService.getUsersByRole("ROLE_USER");
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedCliente(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedCliente) => {
    clientesService
      .update(editedCliente)
      .then((response) => {
        console.log(response.data);
        setShowEditModal(false);
        alert("¡El cliente se actualizó correctamente!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Se ha generado un problema en el servidor ${error}`);
      });
  };

  const handleDelete = (cliente) => {
    let res = window.confirm(
      "¿Está seguro de que desea DESHABILITAR el cliente?"
    );
    if (res) {
      clientesService
        .updateDisponibilidad(cliente)
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
          <h2 className="mb-4">Clientes</h2>

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
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.username}</td>
                    <td>{cliente.email}</td>
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
          {selectedCliente && (
            <ClientesEdit
              show={showEditModal}
              onClose={handleEditModalClose}
              cliente={selectedCliente}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      </section>
    </>
  );
}