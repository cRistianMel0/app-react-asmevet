import '../styled-components/whatsapp.scss';
import whatsappImg from '../assets/img/whatsapp.jpg';

export default function Whatsapp() {
  return (
    <div className="redWhatsapp">
      <a href="https://api.whatsapp.com/send?phone=573132079986" target="_blank" rel="noopener noreferrer">
        <img className="whatsapp" src={whatsappImg} alt="whatsapp" />
      </a>
    </div>
  );
}
