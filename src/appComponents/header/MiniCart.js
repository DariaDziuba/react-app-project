import MiniCartItem from './MiniCartItem';
import { MiniCartItemsQtyContext } from '../../scripts/ProductContext.js';
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

function MiniCart() {
    const miniCartItems = useContext(MiniCartItemsQtyContext);

    return (
        <div className='minicart'>
            <div className="minicart__icon">
                <FaShoppingCart className="w-100" style={ {color: 'black' }} />
            </div>
            <div className="minicart__counter">
                {Object.keys(miniCartItems).length}
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