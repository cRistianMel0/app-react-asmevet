import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import AuthService from "../services/auth.service";

const email = (value) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "Invalid email address";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "Username must be between 3 and 20 characters";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "Password must be between 6 and 40 characters";
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      idEspecialidad: "",
      apellido: "",
      tipoDoc: "Cédula",
      documento: "",
      telefono: "",
      direccion: "",
      genero: "",
      fechaNacimiento: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    const form = e.target;
    const isValidForm = form.checkValidity();

    if (isValidForm) {
      AuthService.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        idEspecialidad: this.state.idEspecialidad,
        apellido: this.state.apellido,
        tipoDoc: this.state.tipoDoc,
        documento: this.state.documento,
        telefono: this.state.telefono,
        direccion: this.state.direccion,
        genero: this.state.genero,
        fechaNacimiento: this.state.fechaNacimiento,
      }).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    } else {
      form.reportValidity();
    }
  }

  render() {
    return (
      <div className="col-md-12 auth-card-container">
        <div className="card auth-card">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form noValidate onSubmit={this.handleRegister}>
            {!this.state.successful && (
              <div>
                <Form.Group controlId="username">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    required
                    isInvalid={
                      this.state.username &&
                      vusername(this.state.username) !== null
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {vusername(this.state.username)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={this.state.apellido}
                    onChange={(e) => this.setState({ apellido: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                    isInvalid={
                      this.state.email && email(this.state.email) !== null
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {email(this.state.email)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                    isInvalid={
                      this.state.password &&
                      vpassword(this.state.password) !== null
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {vpassword(this.state.password)}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Nuevos campos */}


                <Form.Group controlId="tipoDoc">
                  <Form.Label>Tipo de Documento</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipoDoc"
                    value={this.state.tipoDoc}
                    onChange={(e) => this.setState({ tipoDoc: e.target.value })}
                  >
                    <option>Cédula</option>
                    <option>Pasaporte</option>
                    {/* Agrega más opciones según necesites */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="documento">
                  <Form.Label>Número de Documento</Form.Label>
                  <Form.Control
                    type="text"
                    name="documento"
                    value={this.state.documento}
                    onChange={(e) => this.setState({ documento: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={this.state.telefono}
                    onChange={(e) => this.setState({ telefono: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={this.state.direccion}
                    onChange={(e) => this.setState({ direccion: e.target.value })}
                  />
                </Form.Group>

                // ...
                <Form.Group controlId="genero">
                  <Form.Label>Género</Form.Label>
                  <Form.Select
                    name="genero"
                    value={this.state.genero}
                    onChange={(e) => this.setState({ genero: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>
// ...


                <Form.Group controlId="fechaNacimiento">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaNacimiento"
                    value={this.state.fechaNacimiento}
                    onChange={(e) => this.setState({ fechaNacimiento: e.target.value })}
                  />
                </Form.Group>

                {/* Repite el bloque de código anterior para los demás campos nuevos */}

                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </div>
            )}

            {this.state.message && (
              <Alert
                variant={this.state.successful ? "success" : "danger"}
                role="alert"
              >
                {this.state.message}
              </Alert>
            )}
          </Form>
        </div>
      </div>
    );
  }
}
