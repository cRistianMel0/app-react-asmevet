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

  updateDisponibilidad(producto) {
    return axios.patch(API_URL, producto);
  }
  

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  getImageById(idProducto) {
    return axios.get(`${API_URL}${idProducto}/imagen`, { responseType: 'blob' });
  }

  agregarAlCarrito(idProducto, idUser){
    return axios.put(`${API_URL}${idProducto}/${idUser}`);
  }
  
}

export default new ProdcutosService();
