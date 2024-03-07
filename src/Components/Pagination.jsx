// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
            <button onClick={() => handlePageChange(page + 1)} className="page-link">
              {page + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
