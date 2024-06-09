import { useContext, useState } from 'react';
import { SearchContext, PaginationDispatchContext } from "../../scripts/ProductContext";

function onSearchClick(searchContext, paginationDispatch, searchValue) {
    searchContext.dispatch({ searchValue: searchValue, paginationDispatch: paginationDispatch});
}

function onSearchChange(e, setSearchValue, searchContext, paginationDispatch) {
    const searchValue = (e.target.value || '').toLowerCase();
    setSearchValue(searchValue);

    if (!searchValue) {
        onSearchClick(searchContext, paginationDispatch, searchValue);
    }
}

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const searchContext = useContext(SearchContext);
    const paginationDispatch = useContext(PaginationDispatchContext);

    return (
        <div className="input-group mb-3" >
            <input
                type="text"
                className="form-control"
                value={searchValue}
                onChange={(e) => onSearchChange(e, setSearchValue, searchContext, paginationDispatch)}
                placeholder='Type to search'
            />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => onSearchClick(searchContext, paginationDispatch, searchValue)}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default Search;