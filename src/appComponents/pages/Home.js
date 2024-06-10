import { useEffect, useState } from 'react';
import { appendParamsToUrl } from '../../utils.js';
import { Link } from "react-router-dom";
import { CAROUSEL_SLIDES, SERVER_HOST } from "../../settings";
import Raiting from "../productComponents/Raiting.js";

function fetchProducts(urlParams, setProducts) {
    const url = appendParamsToUrl(SERVER_HOST + 'products', urlParams);

    fetch(url)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
}

function getCarouselIndicators(products, activeSlide, setActiveSlide) {
    return products.map((product, i) => {
        return (
            <li
                onClick={() => setActiveSlide(i)}
                className={`carousel-indicator ${i === activeSlide ? 'active' : ''}`}
                key={`carousel-indicator_${i}`}>
            </li>
        )
    })
}

function getCarouselItem(products, activeSlide) {
    return products.map((product, i) => {
        return (
            <div className={`carousel__slide ${i === activeSlide ? '' : 'd-none'}`} key={`carousel-item_${i}`}>
                <div className="book__wrapper">
                    <img
                        className='carousel__image'
                        src={product.imageUrl}
                        alt={product.name}
                    >
                    </img>
                </div>
                <div className="book__details">
                    <div className="book__details-wrapper">
                        <h5 className='book__full-name'>{product.name}</h5>
                        <p className='book__author'>{product.author}</p>
                        <Raiting params={{ book: product }}/>
                        <p className='book__description-detailed'>{product.description}</p>
                    </div>
                    <div>
                    <Link  to={`/details/${product.id}`}>
                        <button className='btn btn-outline-secondary'>
                            <b>SHOW DETAILS</b>
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
        )
    })
}

function Home() {
    const [products, setProducts] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [timeoutId, setTimeoutId] = useState('');

    useEffect(() => {
        const urlParams = {
            neededLength: CAROUSEL_SLIDES
        }

        fetchProducts(urlParams, setProducts);
    }, []);

    useEffect(() => {
        if (products.length) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const id = setTimeout(() => {
                setActiveSlide(activeSlide === (products.length - 1) ? 0 : activeSlide + 1);
            }, 5000)

            setTimeoutId(id);
        }
    }, [ products, activeSlide ]);

    return (
        <div className="carousel__wrapper">
            { getCarouselItem(products, activeSlide) }
            <ol className="carousel-indicators ">
                { getCarouselIndicators(products, activeSlide, setActiveSlide) }
            </ol>
        </div>
    )
}

export default Home;