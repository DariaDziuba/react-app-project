import MiniCart from './MiniCart.js';
import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";

function Header() {
    return (
        <header className='header' role="main">
            <div className='container'>
                <div className='row justify-content-between align-items-center'>
                    <Link to="/"><img className="header__logo" src="./logo.png" alt='logo' /></Link>
                    <Link to="/shop" className="category__link">
                        <div className="category__inner">
                            <span>SHOP</span>
                            <GiBookshelf />
                        </div>
                    </Link>
                    <MiniCart/>
                </div>
            </div>
        </header>
    )
}

export default Header;