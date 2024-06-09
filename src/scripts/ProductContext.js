import { createContext, useReducer } from 'react';
import productItems from '../config/products.json';
import { PAGINATION_STEP } from "../settings";

export const ProductsContext = createContext(null);
export const ProductsDispatchContext = createContext(null);
export const MiniCartItemsQtyContext = createContext(null);
export const PaginationContext = createContext(null);
export const PaginationDispatchContext = createContext(null);
export const SearchContext = createContext(null);

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

function getProducts() {
    return productItems;
}

function searchReducer(searchedProducts, params) {
    const products = getProducts();

    if (!params.searchValue) {
        return products;
    }

    const filteredProducts = products.filter((product) => {
        const isNameValid = product.name.toLowerCase().includes(params.searchValue);
        const isAuthorValid = product.author.toString().toLowerCase().includes(params.searchValue);

        return isNameValid || isAuthorValid;
    });

    params.paginationDispatch({ selectedPage: 1, productItems: filteredProducts });

    return filteredProducts;
}

function paginationReducer(pageInfo, params) {
    if (!params.selectedPage) {
        return pageInfo;
    }

    const endIndex = params.selectedPage * PAGINATION_STEP;
    const startIndex = endIndex - PAGINATION_STEP;

    return {
        products: params.productItems.slice(startIndex, endIndex),
        selectedPage: params.selectedPage,
        pagesLength: Math.ceil(params.productItems.length / PAGINATION_STEP)
    };
}

export function ProductsProvider({children}) {
    const [miniCartItems, dispatch] = useReducer(miniCartItemsReducer, {});
    const [pageInfo, paginationDispatch] = useReducer(paginationReducer, {
        selectedPage: 1,
        pagesLength: Math.ceil(productItems.length / PAGINATION_STEP),
        products: [...productItems].slice(0, PAGINATION_STEP)
    });
    const [searchedProducts, searchDispatch] = useReducer(searchReducer, getProducts());

    return (
        <ProductsContext.Provider value={getProducts()}>
            <SearchContext.Provider value={{ products: searchedProducts, dispatch: searchDispatch }}>
                <PaginationContext.Provider value={pageInfo}>
                    <PaginationDispatchContext.Provider value={paginationDispatch}>
                        <ProductsDispatchContext.Provider value={dispatch}>
                            <MiniCartItemsQtyContext.Provider value={miniCartItems}>
                                {children}
                            </MiniCartItemsQtyContext.Provider>
                        </ProductsDispatchContext.Provider>
                    </PaginationDispatchContext.Provider>
                </PaginationContext.Provider>
            </SearchContext.Provider>
        </ProductsContext.Provider>
    );
}