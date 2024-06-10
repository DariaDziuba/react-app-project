import './styles/Global.scss';
import Header from './components/header/Header.js';
import Router from "./components/Router.js";
import { Link } from "react-router-dom";
import { ProductsProvider } from './scripts/ProductContext.js';

function App() {
    return (
        <div className='page'>
            <ProductsProvider>
                <Header />
                <div className='page-container container'>
                    <Link to="/"></Link>
                    <Router />
                </div>
                <footer>
                    <div className='page__footer'>
                        © Daria Dziuba
                    </div>
                </footer>
            </ProductsProvider>
        </div>
    );
}

export default App;
