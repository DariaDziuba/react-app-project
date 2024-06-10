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
                {
                    Object.keys(miniCartItems).map(key => {
                        const book = miniCartItems[key];

                        return (
                            <div key={key} id={book.id}>
                                <MiniCartItem book={book}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MiniCart;