import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "../styled-components/login.scss";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../../../services/auth.service";

const email = (value) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "Dirección de Correo Inválida";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    password: false,
  });
  const navigate = useNavigate();
  const checkBtn = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    AuthService.login(username, password)
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  const handleFieldBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  return (
    <MDBContainer className="gradient-form loginContainer">
      <MDBRow>
        <MDBCol col="6" className="">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h4 className="mt-1 mb-2 pb-1">Inicio de Sesión</h4>
            </div>
            <Form onSubmit={handleLogin} ref={checkBtn}>
              <Form.Group controlId="username">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  onBlur={() => handleFieldBlur("username")}
                  isInvalid={touchedFields.username && email(username) !== null}
                />
                <Form.Control.Feedback type="invalid">
                  {email(username)}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onBlur={() => handleFieldBlur("password")}
                  isInvalid={
                    touchedFields.password && vpassword(password) !== null
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {vpassword(password)}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-group text-center mt-3">
                <Button variant="" type="submit" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <div className="text-center pt-1 pb-1">
                    <MDBBtn className="mb-4 w-100 gradient-custom-2">
                      Iniciar Sesión
                    </MDBBtn>
                    <a className="text-muted" href="#!">
                      ¿Olvidó su Contraseña?
                    </a>
                  </div>
                </Button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
            <div className="d-flex flex-row align-items-center justify-content-center mb-3">
              <p className="mb-0">¿No tienes cuenta?</p>
                <Link className="register" to="/register">
                  Registrate
                </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="MDBCol2">
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="text-white text-center px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Hospital Médico Veterinario</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
