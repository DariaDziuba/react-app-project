import MiniCart from './MiniCart.js';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className='header' role="main">
            <div className='container'>
                <div className='row justify-content-between align-items-center'>
                    <Link to="/"><img className="header__logo" src="./logo.png" alt='logo' /></Link>
                    <MiniCart/>
                </div>
            </div>
        </header>
    )
}

export default Header;