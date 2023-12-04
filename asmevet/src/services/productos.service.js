import axios from "axios";

const API_URL = "http://localhost:8080/api/productos/";

class ProdcutosService {
  create(producto) {
    return axios.post(API_URL, producto);
  }

  findAll() {
    return axios.get(API_URL);
  }

  update(producto) {
    return axios.put(API_URL, producto);
  }

  updateDisponibilidad(servicio) {
    return axios.patch(API_URL, servicio);
  }
  

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  getImageById(idProducto) {
    return axios.get(`${API_URL}${idProducto}/imagen`, { responseType: 'blob' });
  }
  
}

export default new ProdcutosService();
