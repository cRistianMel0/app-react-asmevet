import axios from "axios";

const API_URL = "http://localhost:8080/api/carrito/";

class carritosService {
    create(idUser, idProducto) {
        return axios.post(`${API_URL}${idProducto}/${idUser}`)
    }

    get(idUser) {
        return axios.post(`${API_URL}${idUser}`)
    }
}

// Aquí, debes exportar la clase en lugar de la instancia del servicio
export default new carritosService();
