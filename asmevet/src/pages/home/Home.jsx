import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SliderSection from "./components/SliderSection";
import ServiceSection from "./components/ServiceSection";
import GallerySection from "./components/GallerySection";
import GoogleMapSection from "./components/GoogleMapSection";

export default function Home() {
  window.scrollTo(0, 0);

  return (
    <>
      <Navbar />
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
