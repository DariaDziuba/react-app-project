import MiniCartItem from './MiniCartItem';
import { MiniCartItemsQtyContext } from '../../scripts/ProductContext.js';
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

function getMiniCartItemsCount(miniCartItems) {
    let itemsCount = 0;

    Object.keys(miniCartItems).forEach((key) => {
        const miniCartItem = miniCartItems[key];
        itemsCount += miniCartItem.qty;
    });

    return itemsCount;
}

function getMiniCartItems(miniCartItems) {
    if (!Object.keys(miniCartItems).length) {
        return (
            <div class="justify-content-center d-flex">
                <h5 className='mt-3'>You haven't added any product to cart...</h5>
            </div>
        );
    }

    return Object.keys(miniCartItems).map(key => {
        const book = miniCartItems[key];

        return (
            <div key={key} id={book.id}>
                <MiniCartItem book={book}/>
            </div>
        )
    })
}

function MiniCart() {
    const miniCartItems = useContext(MiniCartItemsQtyContext);

    return (
        <div className='minicart'>
            <div className="minicart__icon">
                <FaShoppingCart className="w-100" style={ {color: 'black' }} />
            </div>
            <div className="minicart__counter">
                {getMiniCartItemsCount(miniCartItems)}
            </div>
            <div className="minicart__inner">
                { getMiniCartItems(miniCartItems) }
            </div>
        </div>
    )
}

export default MiniCart;