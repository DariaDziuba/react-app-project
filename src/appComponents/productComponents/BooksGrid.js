import { useContext } from 'react';
import { PaginationContext, PaginationDispatchContext, SearchContext } from "../../scripts/ProductContext";
import Book from './Book.js';
import Search from '../search/Search';

function getPagination(pagination, paginationDispatch, products) {
    const paginationArr = [];

    for (let i = 1; i <= pagination.pagesLength; i++) {
        paginationArr.push(
            <button key={`page-${i}`}
                className={`btn books-pagination_btn ${pagination.selectedPage === i ? 'btn-secondary btn-selected' : 'btn-outline-secondary'}`}
                onClick={() => paginationDispatch({ selectedPage: i, productItems: products })}
            >
                <b>{i}</b>
            </button>
        );
    }

    return paginationArr;
}

function BooksGrid() {
    const pagination = useContext(PaginationContext);
    const paginationDispatch = useContext(PaginationDispatchContext);
    const searchContext = useContext(SearchContext);

    return (
        <div className="books-grid-wrapper">
            <Search />
            <div className='books-grid'>
                {
                    pagination.products.map((book, key) => (
                        <div key={key} id={book.id} className="books-wrapper">
                            <Book book={book}/>
                        </div>
                    ))
                }
            </div>
            <div className="books-pagination">
                { getPagination(pagination, paginationDispatch, searchContext.products) }
            </div>
        </div>
    )
}

export default BooksGrid;