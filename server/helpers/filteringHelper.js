function getPageProduct(products, selectedPage) {
    const { PAGINATION_STEP } = require('../../src/settings');
    const pagesLength = Math.ceil(products.length / PAGINATION_STEP);

    const endIndex = selectedPage * PAGINATION_STEP;
    const startIndex = endIndex - PAGINATION_STEP;

    products = products.slice(startIndex, endIndex);

    return {
        products: products,
        selectedPage: selectedPage,
        pagesLength: pagesLength
    }
}

function getSearchedProducts(products, searchValue) {
    if (!searchValue) {
        return products;
    }

    return products.filter((product) => {
        const isNameValid = product.name.toLowerCase().includes(searchValue);
        const isAuthorValid = product.author.toString().toLowerCase().includes(searchValue);

        return isNameValid || isAuthorValid;
    });
}

function getFilteredProducts(products, params) {
    if (!params.applyRating) {
        return products;
    }

    return [...products].sort((a, b) => {
        const aRating = Number(a.rating);
        const bRating = Number(b.rating);

        if (aRating > bRating) {
            return -1;
        } else if (aRating < bRating) {
            return 1;
        }

        return 0;
    });
}

function getProcessedProducts(products, params) {
    let searchedProducts = getSearchedProducts(products, params.searchValue);
    searchedProducts = getFilteredProducts(searchedProducts, params);

    return getPageProduct(searchedProducts, params.selectedPage);
}

module.exports = {
    getProcessedProducts: getProcessedProducts,
    getFilteredProducts: getFilteredProducts,
    getSearchedProducts: getSearchedProducts,
    getPageProduct: getPageProduct
};