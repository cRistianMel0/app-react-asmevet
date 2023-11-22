import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SliderSection from "./components/SliderSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="pt-5">
        <div className="pt-5" style={{ height: "800px", backgroundColor: "white" }}>
            <SliderSection />

        </div>
      </section>
      <Footer />
    </>
  );
}
