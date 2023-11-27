import "../styled-components/footer.scss";
import { Facebook, Instagram, GeoAlt } from "react-bootstrap-icons";
import logoImg from "../assets/img/logo.png";

export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="px-3 pb-3 text-light">
        <div className="row text-center footerRow">
          <div className="col mt-3">
            <h4>ASMEVET</h4>
            <img
              src={logoImg}
              alt="Logo de la veterinaria"
              className="logoFooter"
            />
          </div>
          <div className="col mt-3">
            <h4>Conéctate con Nosotros</h4>
            <div className="espacioSocial">
              <a
                href="https://www.facebook.com/asmevethospitalveterinario/"
                target="_blank"
                rel="noreferrer"
                className="facebook redessociales"
              >
                <Facebook className="iconRedes" />
                <span className="socialspan">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/asmevethospitalveterinario/"
                target="_blank"
                rel="noreferrer"
                className="instagram redessociales"
              >
                <Instagram className="iconRedes" />
                <span className="socialspan">Instagram</span>
              </a>
              <a
                href="https://www.bing.com/maps?osid=1229f006-bcef-47ba-87c4-3d29d0230396&cp=7.120163~-73.115108&lvl=16&pi=0&imgid=af60f38f-60ae-4041-b11c-86763594f696&v=2&sV=2&form=S00027"
                target="_blank"
                rel="noreferrer"
                className="ubicacion redessociales"
              >
                <GeoAlt className="iconRedes" />
                <span className="socialspan">Ubicacion</span>
              </a>
            </div>
          </div>
          <div className="col mt-3 derechosReservados">
            <h4>&copy; 2023 Asmevet</h4>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
