const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

function getPageProduct(products, selectedPage) {
    const { PAGINATION_STEP } = require('../src/settings');
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

app.get('/products', (req, res) => {
    const products = require('./config/products.json');
    const selectedPage = Number(req.query.selectedPage || '1');
    const searchValue = req.query.searchValue;
    const applyRating = req.query.applyRating === 'true';

    const productInfo = getProcessedProducts(products, {
        selectedPage: selectedPage,
        searchValue: searchValue,
        applyRating: applyRating
    });

    res.json(productInfo);
});

app.get('/productDetails', (req, res) => {
    const products = require('./config/products.json');
    const pid = req.query.pid;
    const product = pid ? products.find(product => pid === product.id) : {};

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});