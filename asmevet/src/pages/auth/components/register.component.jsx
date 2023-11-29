import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import AuthService from "../../../services/auth.service";
import "../styled-components/register.scss";
import { MDBContainer, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const email = (value) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "Dirección de correo electrónico no válida";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "La contraseña debe tener entre 6 y 40 caracteres";
  }
};

const Register = () => {
  const [state, setState] = useState({
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
  });

  const handleRegister = (e) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      message: "",
      successful: false,
    }));

    const form = e.target;
    const isValidForm = form.checkValidity();

    if (isValidForm) {
      AuthService.register({
        username: state.username,
        email: state.email,
        password: state.password,
        apellido: state.apellido,
        tipoDoc: state.tipoDoc,
        documento: state.documento,
        telefono: state.telefono,
        direccion: state.direccion,
        genero: state.genero,
        fechaNacimiento: state.fechaNacimiento,
      }).then(
        (response) => {
          setState((prevState) => ({
            ...prevState,
            message: response.data.message,
            successful: true,
          }));
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState((prevState) => ({
            ...prevState,
            successful: false,
            message: resMessage,
          }));
        }
      );
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="registerBody">
      <MDBContainer
        className={`registerContainer ${
          state.successful ? "success-container" : ""
        }`}
      >
        <MDBRow>
          <MDBCol className="Col1"></MDBCol>

          <MDBCol>
            <MDBCardBody
              className={`text-black d-flex flex-column justify-content-center ${
                state.successful ? "success-card-body" : ""
              }`}
            >
              <h4 className="mt-2 mb-3 text-center fw-bold">
                Registro de Usuarios
              </h4>
              <Form noValidate onSubmit={handleRegister}>
                {!state.successful && (
                  <div>
                    <div className="row">
                      <Form.Group controlId="username" className="col-6">
                        <Form.Label>
                          Nombre<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={state.username}
                          onChange={(e) =>
                            setState({
                              ...state,
                              username: e.target.value,
                            })
                          }
                          required
                          isInvalid={
                            state.username && vusername(state.username) !== null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {vusername(state.username)}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="apellido" className="col-6">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={state.apellido}
                          onChange={(e) =>
                            setState({
                              ...state,
                              apellido: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </div>

                    <div className="row">
                      <Form.Group controlId="email" className="col-6">
                        <Form.Label>
                          Correo Electrónico
                          <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={state.email}
                          onChange={(e) =>
                            setState({
                              ...state,
                              email: e.target.value,
                            })
                          }
                          required
                          isInvalid={state.email && email(state.email) !== null}
                        />
                        <Form.Control.Feedback type="invalid">
                          {email(state.email)}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="password" className="col-6">
                        <Form.Label>
                          Contraseña<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={state.password}
                          onChange={(e) =>
                            setState({
                              ...state,
                              password: e.target.value,
                            })
                          }
                          required
                          isInvalid={
                            state.password && vpassword(state.password) !== null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {vpassword(state.password)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="row">
                      <Form.Group controlId="telefono" className="col-6">
                        <Form.Label>
                          Teléfono<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          value={state.telefono}
                          onChange={(e) =>
                            setState({
                              ...state,
                              telefono: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="direccion" className="col-6">
                        <Form.Label>
                          Dirección<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          value={state.direccion}
                          onChange={(e) =>
                            setState({
                              ...state,
                              direccion: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="row">
                      <Form.Group controlId="tipoDoc" className="col-6">
                        <Form.Label>
                          Tipo de Documento
                          <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="tipoDoc"
                          value={state.tipoDoc}
                          onChange={(e) =>
                            setState({
                              ...state,
                              tipoDoc: e.target.value,
                            })
                          }
                          required
                        >
                          <option>Cédula</option>
                          <option>Pasaporte</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="documento" className="col-6">
                        <Form.Label>
                          Número de Documento
                          <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="documento"
                          value={state.documento}
                          onChange={(e) =>
                            setState({
                              ...state,
                              documento: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="row">
                      <Form.Group controlId="genero" className="col-6">
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                          name="genero"
                          value={state.genero}
                          onChange={(e) =>
                            setState({
                              ...state,
                              genero: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="fechaNacimiento" className="col-6">
                        <Form.Label>
                          Fecha de Nacimiento
                          <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaNacimiento"
                          value={state.fechaNacimiento}
                          onChange={(e) =>
                            setState({
                              ...state,
                              fechaNacimiento: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center my-3">
                      <Button variant="primary" type="submit">
                        Registrarse
                      </Button>
                    </div>
                  </div>
                )}

                {state.successful && (
                  <Alert variant="success" role="alert" className="fade show">
                    {state.message}
                  </Alert>
                )}
              </Form>
              {state.successful && (
                <>
                  <Link to="/login" className="loginButton">
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );  
};

export default Register;
