import { useContext, useState } from 'react';
import { SearchContext, PaginationContext } from "../../scripts/ProductContext";
import { FaSearch } from "react-icons/fa";

function onSearchChange(e, setSearchValue, searchContext, paginationDispatch) {
    const searchValue = (e.target.value || '').toLowerCase();
    setSearchValue(searchValue);

    searchContext.dispatch({ searchValue: searchValue, paginationDispatch: paginationDispatch});
}

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const searchContext = useContext(SearchContext);
    const paginationContext = useContext(PaginationContext);

    return (
        <div className="input-group mb-3" >
            <div class="input-group-prepend">
                <span class="input-group-text"><FaSearch /></span>
            </div>
            <input
                type="text"
                className="form-control"
                value={searchValue}
                onChange={(e) => onSearchChange(e, setSearchValue, searchContext, paginationContext.dispatch)}
                placeholder='Type to search'
            />
        </div>
    )
}

export default Search;