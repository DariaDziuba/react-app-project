import './styles/Global.scss';

import Header from './appComponents/header/Header.js';
import Router from "./appComponents/Router.js";
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
            </ProductsProvider>


        </div>
    );
}

export default App;
