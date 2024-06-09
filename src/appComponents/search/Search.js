import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

let timeoutId = '';

function handleInputChange(e, setSearchValue, setSelectedPage, setInputValue) {
    const searchValue = (e.target.value || '').toLowerCase();
    setInputValue(searchValue);

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
        setSearchValue(searchValue);
        setSelectedPage(1);
    }, 500);
}

function Search({ params }) {
    const [inputValue, setInputValue] = useState(params.searchValue);

    return (
        <div className="input-group" >
            <div className="input-group-prepend">
                <span className="input-group-text"><FaSearch /></span>
            </div>
            <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={(e) => handleInputChange(e, params.setSearchValue, params.setSelectedPage, setInputValue)}
                placeholder='Type to search'
            />
        </div>
    )
}

export default Search;