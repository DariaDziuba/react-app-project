import { appendParamsToUrl } from '../../utils.js';
import { SERVER_HOST } from "../../settings";

export function fetchProducts(urlParams, setProducts) {
    const url = appendParamsToUrl(SERVER_HOST + 'products', urlParams);

    fetch(url)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
}

export function fetchPageInfo(urlParams, setPageInfo) {
    const url = appendParamsToUrl(SERVER_HOST + 'filteredProducts', urlParams);

    fetch(url)
        .then((res) => res.json())
        .then((data) => setPageInfo(data))
        .catch((error) => console.log(error));
}

export function fetchProduct(urlParams, setBook) {
    const url = appendParamsToUrl(`${SERVER_HOST}productDetails`, urlParams);
    fetch(url)
        .then((res) => res.json())
        .then((book) => setBook(book) )
        .catch((error) => console.log(error));
}