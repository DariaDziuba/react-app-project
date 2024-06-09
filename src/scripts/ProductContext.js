import { createContext, useReducer } from 'react';

export const ProductsDispatchContext = createContext(null);
export const MiniCartItemsQtyContext = createContext(null);

function miniCartItemsReducer(miniCartItems, action) {
    const bookId = (action.book && action.book.id) || action.bookId || '';

    if (!bookId) {
        return miniCartItems;
    }

    switch (action.type) {
        case 'add':
                miniCartItems[bookId] = action.book;
                miniCartItems[bookId].qty = 1;

            return { ...miniCartItems };
        case 'increase':
            miniCartItems[bookId].qty++;

            return { ...miniCartItems };
        case 'decrease':
            miniCartItems[bookId].qty -= 1;

            if (!miniCartItems[bookId].qty) {
                delete miniCartItems[bookId];
            }

            return{ ...miniCartItems };
        case 'remove':
            delete miniCartItems[bookId];

            return{ ...miniCartItems };
        default:
            break;
    }
}

export function ProductsProvider({children}) {
    const [miniCartItems, dispatch] = useReducer(miniCartItemsReducer, {});

    return (
        <ProductsDispatchContext.Provider value={dispatch}>
            <MiniCartItemsQtyContext.Provider value={miniCartItems}>
                {children}
            </MiniCartItemsQtyContext.Provider>
        </ProductsDispatchContext.Provider>
    );
}