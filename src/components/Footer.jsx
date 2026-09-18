import { Link } from "react-router-dom"

function Footer(){

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <h2>Taste Of Thai</h2>

                <p>Authentic Thai Flavors & recipes</p>

                <nav className="footer-navigation">
                    <a href="/">Home</a>
                    <a href="/favorites">Favorites</a>
                </nav>

                <p className="copyright">
                    © 2026 Taste Of Thai
                </p>
            </div>
        </footer>
    );
}

export default Footer;