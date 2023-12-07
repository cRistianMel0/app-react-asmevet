import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Navbar from "../../../components/Navbar";
import "../styled-components/profile.scss";
import { FaCircleUser } from "react-icons/fa6";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <>
        <Navbar />

        <section className="page">
          <div className="container profile-container">
            {this.state.userReady ? (
              <div className="profile-card">
                <header className="jumbotron">
                  <div className="user-icon">
                    <FaCircleUser />
                  </div>
                  <h3>
                    Perfil de <strong>{currentUser.nombre}</strong>
                  </h3>
                </header>
                <div className="row">
                  <div className="col-md-6">
                    <div className="profile-details">
                      <div>
                        <strong>Email:</strong> {currentUser.email}
                      </div>
                      <div>
                        <strong>Nombre:</strong> {currentUser.nombre}
                      </div>
                      <div>
                        <strong>Apellido:</strong> {currentUser.apellido}
                      </div>
                      <div>
                        <strong>Tipo Documento:</strong> {currentUser.tipoDoc}
                      </div>
                      <div>
                        <strong>Documento:</strong> {currentUser.documento}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="profile-details">
                      <div>
                        <strong>Telefono:</strong> {currentUser.telefono}
                      </div>
                      <div>
                        <strong>Direccion:</strong> {currentUser.direccion}
                      </div>
                      <div>
                        <strong>Email:</strong> {currentUser.email}
                      </div>
                      <div>
                        <strong>Genero:</strong> {currentUser.genero}
                      </div>
                      <div>
                        <strong>Fecha Nacimiento:</strong>{" "}
                        {currentUser.fechaNacimiento}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="roles-section mt-4">
                  <strong>Roles:</strong>
                  <ul>
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => (
                        <li key={index}>{role}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </>
    );
  }
}
