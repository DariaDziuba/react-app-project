import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';

import { ProductsDispatchContext } from "../../scripts/ProductContext";
import { CURRENCY, SERVER_HOST } from "../../settings";
import Raiting from "./Raiting";
import { appendParamsToUrl } from '../../utils.js';

function fetchProduct(urlParams, setBook) {
    const url = appendParamsToUrl(`${SERVER_HOST}productDetails`, urlParams);
    fetch(url)
        .then((res) => res.json())
        .then((book) => setBook(book) )
        .catch((error) => console.log(error));
}

function ProductDetails() {
    const dispatch = useContext(ProductsDispatchContext);
    const { productId } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        const urlParams = {
            pid: productId
        };

        fetchProduct(urlParams, setBook);
    }, []);

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
                    <Raiting params={{ book: book }}/>
                    <div className='book__price'>
                        <h5>{`${book.price} ${CURRENCY}`}</h5>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default ProductDetails;