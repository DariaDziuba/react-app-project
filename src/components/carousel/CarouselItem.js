import Raiting from "../product/Raiting.js";
import { Link } from "react-router-dom";

function CarouselItem({ product, activeSlide, index }) {
    return (
        <div className={`carousel__slide ${index === activeSlide ? '' : 'd-none'}`} key={`carousel-item_${index}`}>
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
}

export default CarouselItem;