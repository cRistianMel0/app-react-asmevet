import { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import '../styled-components/auth.scss';

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        El usuario debe tener entre 3 y 20 caracteres.
      </div>
    );
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
  const [touchedFields, setTouchedFields] = useState({ username: false, password: false });
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
    <div className="col-md-12 auth-card-container">
      <div className="card auth-card">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={checkBtn}>
          <Form.Group controlId="username">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              onBlur={() => handleFieldBlur("username")}
              isInvalid={touchedFields.username && vusername(username) !== null}
            />
            <Form.Control.Feedback type="invalid">
              {vusername(username)}
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
              isInvalid={touchedFields.password && vpassword(password) !== null}
            />
            <Form.Control.Feedback type="invalid">
              {vpassword(password)}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="form-group">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Iniciar sesión</span>
            </Button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* <CheckButton
            style={{ display: "none" }}
            ref={checkBtn}
          /> */}
        </Form>
        <div className="form-group">
          <p>¿No tienes una cuenta? Regístrate <Link to="/register">aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
