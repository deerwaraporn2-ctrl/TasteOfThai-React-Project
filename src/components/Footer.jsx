import { Link } from "react-router-dom"

function Footer({ handleHome }){

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <h2>Taste Of Thai</h2>

                <p>Authentic Thai Flavors & recipes</p>

                <nav className="footer-navigation">
                    <Link to="/" onClick={handleHome}>Home</Link>
                    <Link to="/favorites">Favorites</Link>
                    <Link to="/add-recipe">Add Your Recipe</Link>
                </nav>

                <p className="copyright">
                    © 2026 Taste Of Thai
                </p>
            </div>
        </footer>
    );
}

export default Footer;