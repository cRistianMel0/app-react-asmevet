import axios from "axios";

const API_URL = "http://localhost:8080/api/servicios/"; // Asegúrate de tener la URL correcta para los servicios

class ServiciosService {
  create(servicio) {
    return axios.post(API_URL, servicio);
  }

  findAll() {
    return axios.get(API_URL);
  }

  update(servicio) {
    return axios.put(API_URL, servicio);
  }

  updateDisponibilidad(servicio) {
    return axios.patch(API_URL, servicio);
  }
  

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ServiciosService();
