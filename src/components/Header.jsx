import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="site-header">
            <div className="header-content">
                <h1 className="logo">Taste Of Thai</h1>

                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;