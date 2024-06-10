import { useEffect, useState } from 'react';
import { CAROUSEL_SLIDES, CAROUSEL_SLIDE_DURATION } from "../../settings";
import { fetchProducts } from '../../scripts/helpers/fetchHelpers';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';

function Carousel() {
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
            }, CAROUSEL_SLIDE_DURATION)

            setTimeoutId(id);
        }
    }, [ products, activeSlide ]);

    return (
        <div className="carousel__wrapper">
            {
                products.map((product, i) => <CarouselItem product={product} activeSlide={activeSlide} index={i} /> )
            }

            <ol className="carousel-indicators">
                {
                    products.map((product, i) => <CarouselIndicator activeSlide={activeSlide} index={i} setActiveSlide={setActiveSlide} /> )
                }
            </ol>
        </div>
    )
}

export default Carousel;