import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Navbar from "../../../components/Navbar";
import '../styled-components/profile.scss';

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
          <div className="container">
            {this.state.userReady ? (
              <div>
                <header className="jumbotron mb-4">
                  <h3>
                    <strong>{currentUser.username}</strong> Perfil
                  </h3>
                </header>
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                  <strong>id:</strong> {currentUser.id}
                </p>
                <strong>Roles:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </>
    );
  }
}
