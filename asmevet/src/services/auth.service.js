import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email, 
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    const {
      username,
      email,
      password,
      apellido,
      tipoDoc,
      documento,
      telefono,
      direccion,
      genero,
      fechaNacimiento
    } = user;

    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      apellido,
      tipoDoc,
      documento,
      telefono,
      direccion,
      genero,
      fechaNacimiento
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();