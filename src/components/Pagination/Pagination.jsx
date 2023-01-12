import React from "react";
import "./Pagination.css";

function Pagination({ paginate, currentPage, postPerPage, totalPost }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul>
        <button
          className="btn-pagination"
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
        >
          Prev
        </button>
        {pages.map((number) => (
          <button
            className="btn-pagination"
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="btn-pagination"
          onClick={() =>
            paginate(
              currentPage < pages.length ? currentPage + 1 : pages.length
            )
          }
        >
          Next
        </button>
      </ul>
    </nav>
  );
}
export default Pagination;
