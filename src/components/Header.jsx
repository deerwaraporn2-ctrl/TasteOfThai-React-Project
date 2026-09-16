import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <h1>Taste Of Thai</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
                
            </nav>




        </header>
    )
}

export default Header;