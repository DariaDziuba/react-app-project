import { useContext } from "react";
import { ProductsDispatchContext } from "../../scripts/ProductContext";
import { CURRENCY } from "../../settings";

export default function MiniCartItem({book}) {
    const dispatch = useContext(ProductsDispatchContext);

    return (
        <div className='minicart-item'>
            <div className="book__image-wrapper">
                <img
                    className='book__image'
                    src={book.imageUrl}
                    alt={book.name}
                ></img>
            </div>
            <div className='book__details'>
                <h6 className='book__name'>{book.name}</h6>
                <div className='book__price-minicart'>
                    {`${book.price} ${CURRENCY}`}
                </div>
                <div className="book__quantity-selector">
                    <button className='btn btn-outline-secondary btn-sm-22' onClick={() =>
                        dispatch({
                            type: 'increase',
                            bookId: book.id
                        })
                    }>
                        +
                    </button>
                    <span>{book.qty}</span>
                    <button className='btn btn-outline-secondary btn-sm-22' onClick={() => {
                        dispatch({
                            type: 'decrease',
                            bookId: book.id
                        })
                    }}>
                        -
                    </button>
                </div>
            </div>
            <div className="book__remove">
                <button className='btn btn-secondary btn-sm-22' onClick={() => {
                    dispatch({
                        type: 'remove',
                        bookId: book.id
                    })
                }}>
                    x
                </button>
            </div>
        </div>
    )
}