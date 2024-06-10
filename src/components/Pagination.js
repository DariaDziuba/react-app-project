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

function Pagination({ pageInfo, setSelectedPage }) {
    return (
        <div className="books-pagination">
            { getPagination(pageInfo, setSelectedPage) }
        </div>
    );
}

export default Pagination;