import { useParams } from "react-router-dom";
import { useContext } from 'react';

import { ProductsContext } from "../../scripts/ProductContext";
import { ProductsDispatchContext } from "../../scripts/ProductContext";
import { CURRENCY } from "../../settings";

function ProductDetails() {
    const dispatch = useContext(ProductsDispatchContext);
    const products = useContext(ProductsContext);
    const {productId} = useParams();
    const book = products.find(product => product.id === productId);

    return (
        <div className='pdp'>
            <div>
                <img
                    className='book__image'
                    src={book.imageUrl}
                    alt={book.name}
                >
                </img>

                <button className='add-to-cart mt-3' onClick={() => {
                    dispatch({
                        type: 'add',
                        book: book
                    })
                }}>
                    <b>Add To Cart</b>
                </button>
            </div>
            <div className="book__details-wrapper">
                <div className='book__details'>
                    <h3 className='book__name'>{`${book.name} | ${book.author}`}</h3>
                    <p className='book__description-detailed'>{book.description}</p>
                    <div className='book__price'>
                        <h5>{`${book.price} ${CURRENCY}`}</h5>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default ProductDetails;