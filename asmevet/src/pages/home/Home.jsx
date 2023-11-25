import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SliderSection from "./components/SliderSection";
import ServiceSection from "./components/ServiceSection";
import GallerySection from "./components/GallerySection";
import GoogleMapSection from "./components/GoogleMapSection";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

export default function Home() {
  window.scrollTo(0, 0);

  // Estado para almacenar la información del usuario
  const [currentUser, setCurrentUser] = useState(null);

  // Función de cierre de sesión
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  useEffect(() => {
    // Obtener el usuario actual al cargar el componente
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <>
      <Navbar
        currentUser={currentUser}
        logOut={logOut}
        isAuthenticated={currentUser}
      />
      <section className="pt-5">
        <div className="pt-5" style={{ backgroundColor: "white" }}>
          <SliderSection />
          <div className="p-5"></div>
          <ServiceSection />
          <div className="p-5"></div>
          <GallerySection />
          <div className="p-5"></div>
          <GoogleMapSection />
        </div>
      </section>
      <Footer />
    </>
  );
}
