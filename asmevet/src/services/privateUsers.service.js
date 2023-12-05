import axios from "axios";

const API_URL = "http://localhost:8080/api/productos/";

class ProdcutosService {
    findAllUsers() {
    return axios.post(API_URL);
  }


  
}

export default new ProdcutosService();
