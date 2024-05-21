/* import the Link tag i.e. Link component from react-router-dom package */
import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {/* adding inline styles */}
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;