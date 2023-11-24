import '../styled-components/footer.scss';

export default function Footer() {
    return (
        <footer className="mt-5">
            <div className="px-3 pb-3 text-light">
                <div className="row text-center">
                    <div className="col mt-3">
                        <h3>LOGO</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt necessitatibus commodi quaerat quia blanditiis minima fuga, reiciendis quas vitae alias quos aspernatur. Repellendus quidem tempora pariatur, minima hic laborum ducimus.</p>
                    </div>
                    <div id="contacto" className="col mt-3">
                        <h4>Contacto</h4>
                        <span></span>
                    </div>
                    <div className="col mt-3">
                        <h4>Derechos Reservados</h4>
                        <span>C</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
