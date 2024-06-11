const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get('/filteredProducts', (req, res) => {
    const products = require('../config/products.json');
    const { getProcessedProducts } = require('../helpers/filteringHelper');
    const selectedPage = Number(req.query.selectedPage || '1');
    const searchValue = req.query.searchValue || '';
    const applyRating = req.query.applyRating === 'true';

    const productInfo = getProcessedProducts(products, {
        selectedPage: selectedPage,
        searchValue: searchValue,
        applyRating: applyRating
    });

    res.json(productInfo);
});

app.get('/productDetails', (req, res) => {
    const products = require('../config/products.json');
    const pid = req.query.pid;
    const product = pid ? products.find(product => pid === product.id) : {};

    res.json(product);
});

app.get('/products', (req, res) => {
    const products = require('../config/products.json');
    const neededLength = Number(req.query.neededLength || '0') || products.length;

    res.json(products.slice(0, neededLength));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});