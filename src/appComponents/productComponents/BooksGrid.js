import { useEffect, useState, } from 'react';
import Book from './Book.js';
import Search from '../search/Search';
import { SERVER_HOST } from "../../settings";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

function getPagination(pagination, setSelectedPage) {
    const paginationArr = [];

    for (let i = 1; i <= pagination.pagesLength; i++) {
        paginationArr.push(
            <button key={`page-${i}`}
                className={`btn books-pagination_btn ${pagination.selectedPage === i ? 'btn-secondary btn-selected' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedPage(i)}
            >
                <b>{i}</b>
            </button>
        );
    }

    return paginationArr;
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
        fetch(SERVER_HOST + `products?selectedPage=${selectedPage}&searchValue=${searchValue}&applyRating=${applyRating}`)
            .then((res) => res.json())
            .then((data) => setPageInfo(data) )
            .catch((error) => console.log(error));
    }, [selectedPage, searchValue, applyRating]);

    return (
        <div className="books-grid-wrapper">
            <div class="search-wrapper">
                <Search params={{
                        setSearchValue: (searchValue) => setSearchParams(searchValue ? { 'searchValue': searchValue } : {}, {replace: true}),
                        searchValue: searchValue,
                        setSelectedPage: setSelectedPage
                    }}
                />
                <button onClick={() => setApplyRating(!applyRating)} class="btn-filtering">
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
            <div className="books-pagination">
                { getPagination(pageInfo, setSelectedPage) }
            </div>
        </div>
    )
}

export default BooksGrid;