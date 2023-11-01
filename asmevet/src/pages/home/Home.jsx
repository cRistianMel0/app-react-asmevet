import App from '../../app';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export default function Home() {
    return (
        <>
            <Navbar />
            <section>
                <div style={{height:"800px"}}>
                    <App />
                </div>
            </section>
            <Footer />
        </>
    )
}
