import React from "react";

interface PaginationProps {
  currentPage: number;
  limit: number;
  totalBooks: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  limit,
  totalBooks,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalBooks);

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-gray-600">
        Showing {start} - {end} of {totalBooks} books
      </p>
      <div className="flex items-center space-x-2">
        <button
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        <span className="px-3 py-1 border rounded-lg text-gray-900">
          {currentPage} / {totalPages}
        </span>
        <button
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
