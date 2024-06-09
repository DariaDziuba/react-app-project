import { useContext } from 'react';
import { ProductsContext, PaginationContext, PaginationDispatchContext } from "../../scripts/ProductContext";

function Search() {

    return (
        <div>
            <input
                type="text"
                value=""
                onChange={() => {}}
                placeholder='Type to search'
            />
        </div>
    )
}

export default Search;