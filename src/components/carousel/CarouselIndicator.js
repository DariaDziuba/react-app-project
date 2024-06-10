

function CarouselIndicator({activeSlide, setActiveSlide, index}) {
    return (
        <li
            onClick={() => setActiveSlide(index)}
            className={`carousel-indicator ${index === activeSlide ? 'active' : ''}`}
            key={`carousel-indicator_${index}`}>
        </li>
    );
}

export default CarouselIndicator;