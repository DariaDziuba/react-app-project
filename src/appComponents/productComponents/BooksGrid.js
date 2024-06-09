import { useEffect, useState, } from 'react';
import Book from './Book.js';
import Search from '../Search';
import Pagination from '../Pagination';
import { SERVER_HOST } from "../../settings";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { appendParamsToUrl } from '../../utils.js';

function fetchPageInfo(urlParams, setPageInfo) {
    const url = appendParamsToUrl(SERVER_HOST + 'products', urlParams);

    fetch(url)
        .then((res) => res.json())
        .then((data) => setPageInfo(data))
        .catch((error) => console.log(error));
}

function BooksGrid() {
    const [searchParams, setSearchParams] = useSearchParams({ searchValue: '' });
    const [selectedPage, setSelectedPage] = useState(1);
    const [applyRating, setApplyRating] = useState(false);

    const searchValue = searchParams.get('searchValue') || '';
    const [pageInfo, setPageInfo] = useState({
        products: [],
        selectedPage: 1,
        pagesLength: 0
    });

    useEffect(() => {
        const urlParams = {
            selectedPage: selectedPage,
            searchValue: searchValue,
            applyRating: applyRating
        }

        fetchPageInfo(urlParams, setPageInfo);
    }, [selectedPage, searchValue, applyRating]);

    return (
        <div className="books-grid-wrapper">
            <div className="search-wrapper">
                <Search
                        setSearchValue={(searchValue) => setSearchParams(searchValue ? { 'searchValue': searchValue } : {}, {replace: true})}
                        searchValue={searchValue}
                        setSelectedPage={setSelectedPage}
                />
                <button onClick={() => setApplyRating(!applyRating)} className="btn-filtering">
                    { applyRating ? <FaStar /> : <FaRegStar /> }
                </button>
            </div>

            <div className='books-grid'>
                {
                    pageInfo.products.map((book, key) => (
                        <div key={key} id={book.id} className="books-wrapper">
                            <Book book={book}/>
                        </div>
                    ))
                }
            </div>
            <Pagination pageInfo={pageInfo} setSelectedPage={setSelectedPage} />
        </div>
    )
}

export default BooksGrid;