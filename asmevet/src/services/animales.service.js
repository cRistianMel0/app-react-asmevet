import axios from "axios";

const API_URL = "http://localhost:8080/api/animales/"; 

class animalesService {
  create(animal) {
    return axios.post(API_URL, animal);
  }

  getAllAnimals() {
    return axios.get(API_URL);
  }

 
}

export default new animalesService();
