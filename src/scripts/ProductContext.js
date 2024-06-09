import { createContext, useReducer } from 'react';
import productItems from '../config/products.json';
import { PAGINATION_STEP } from "../settings";

export const ProductsContext = createContext(null);
export const ProductsDispatchContext = createContext(null);
export const MiniCartItemsQtyContext = createContext(null);
export const PaginationContext = createContext(null);
export const PaginationDispatchContext = createContext(null);

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

function paginationReducer(pageInfo, params) {
    if (!params.selectedPage) {
        return pageInfo;
    }

    const endIndex = params.selectedPage * PAGINATION_STEP;
    const startIndex = endIndex - PAGINATION_STEP;
    pageInfo.products = params.productItems.slice(startIndex, endIndex);
    pageInfo.selectedPage = params.selectedPage;

    return { ...pageInfo };
}

function getProducts() {
    return productItems;
}

export function ProductsProvider({children}) {
    const [miniCartItems, dispatch] = useReducer(miniCartItemsReducer, {});
    const [pageInfo, paginationDispatch] = useReducer(paginationReducer, {
        selectedPage: 1,
        pagesLength: Math.ceil(productItems.length / PAGINATION_STEP),
        products: [...productItems].slice(0, PAGINATION_STEP)
    });

    return (
        <ProductsContext.Provider value={getProducts()}>
            <PaginationContext.Provider value={pageInfo}>
                <PaginationDispatchContext.Provider value={paginationDispatch}>
                    <ProductsDispatchContext.Provider value={dispatch}>
                        <MiniCartItemsQtyContext.Provider value={miniCartItems}>
                            {children}
                        </MiniCartItemsQtyContext.Provider>
                    </ProductsDispatchContext.Provider>
                </PaginationDispatchContext.Provider>
            </PaginationContext.Provider>
        </ProductsContext.Provider>
    );
}