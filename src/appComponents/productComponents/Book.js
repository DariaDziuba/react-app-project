import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsDispatchContext } from "scripts/ProductContext";
import { CURRENCY, MAX_RAITING } from "../../settings";
import { FaStar, FaRegStar } from "react-icons/fa6";

function getRating(book) {
    const rating = Number(book.rating || '0');
    const reatingArray = [];

    for (let i = 0; i < MAX_RAITING; i++) {
        reatingArray.push(i < rating
            ? <FaStar key={`rating_${i}`} />
            : <FaRegStar key={`rating_${i}`} />
        );
    }

    return reatingArray;
}

function Book({book}) {
    const dispatch = useContext(ProductsDispatchContext);

    return (
        <div className='book'>
            <Link to={book.id} className="book__link">
                <div className="book__wrapper">
                    <img
                        className='book__wrapper_image'
                        src={book.imageUrl}
                        alt={book.name}
                    >
                    </img>
                </div>
                <div className="book__details-wrapper">
                    <h5 className='book__name mt-3'>{book.name}</h5>
                    <p className='book__author'>{book.author}</p>
                    <div class="d-flex">
                        { getRating(book) }
                    </div>
                    <div className='book__price'>
                        <h5>{`${book.price} ${CURRENCY}`}</h5>
                    </div>
                </div>
            </Link>
            <button className='add-to-cart mt-3' onClick={() => {
                dispatch({
                    type: 'add',
                    book: book
                })
            }}>
                <b>Add To Cart</b>
            </button>
        </div>
    )
}

export default Book;