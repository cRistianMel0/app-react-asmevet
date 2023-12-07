import axios from "axios";

const API_URL = "http://localhost:8080/api/carrito/";

class carritosService {
    agregarAlCarrito(idUser, idProducto) {
        return axios.post(`${API_URL}${idProducto}/${idUser}`)
    }

    obtenerProductosEnCarrito(idUser) {
        return axios.post(`${API_URL}${idUser}`)
    }
}

// Aquí, debes exportar la clase en lugar de la instancia del servicio
export default new carritosService();
