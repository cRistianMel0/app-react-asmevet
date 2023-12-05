import axios from "axios";

const API_URL = "http://localhost:8080/api/animales/";

class animalesService {
  create(animal) {
    return axios.post(API_URL, animal);
  }

  getAllAnimals() {
    return axios.get(API_URL);
  }

  deshabilitarAnimal(idAnimal) {
    return axios.patch(`${API_URL}${idAnimal}`);
  }

  editarAnimal(idAnimal , animal){
    return axios.put(`${API_URL}${idAnimal}`, animal)
  }
}

// Aquí, debes exportar la clase en lugar de la instancia del servicio
export default new animalesService();
