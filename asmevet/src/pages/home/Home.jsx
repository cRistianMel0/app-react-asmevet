import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SliderSection from "./components/SliderSection";
import ServiceSection from "./components/ServiceSection";

export default function Home() {
  window.scrollTo(0, 0);

  return (
    <>
      <Navbar />
      <section className="pt-5">
        <div className="pt-5" style={{ height: "800px", backgroundColor: "white" }}>
            <SliderSection />
            <div className="p-5"></div>
            <ServiceSection />
        </div>
      </section>
      <Footer />
    </>
  );
}
