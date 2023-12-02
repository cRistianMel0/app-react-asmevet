import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import userService from "../../services/user.service";
import ClientesEdit from "./ClientesEdit";
import { ExclamationTriangle, PencilSquare } from "react-bootstrap-icons";
import SearchBar from "../../components/SearchBar";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await userService.getUsersByRole("ROLE_CLIENTE");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    fetchClientes();
  }, []);

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
