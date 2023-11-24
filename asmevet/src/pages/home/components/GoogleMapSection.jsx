import "../styled-components/googleMapSection.scss";

const GoogleMapSection = () => {
  return (
    <section className="map">
      <div className="container mt-5 pt-4 pb-4 text-light text-center">
        <h4>Encuéntranos aquí</h4>
        <p>Cra. 9 #12-8, Tunja, Boyacá</p>
        <div className="responsive-iframe mt-4 mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2814238496735!2d-73.36581682621771!3d5.525198333961123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7dd117127433%3A0x27bdcafba3d62ef0!2sAsMeVet!5e0!3m2!1ses!2sco!4v1700796332815!5m2!1ses!2sco"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
