import React from "react";
import { PaginationUl, PagedButton } from "../styles/Paged";

export default function TablePaged({ booksPerPage, allBooks, paginado, currentPage }) {
  const pageNumber = [];

  const countPages = Math.ceil(allBooks / booksPerPage);

  for (let i = 1; i <= countPages; i++) {
    pageNumber.push(i);
  }

  return (
    pageNumber.length <= 1 ? null : 
      <PaginationUl>
        <li>
          <PagedButton 
            onClick={() => paginado(currentPage - 1)} 
            color={currentPage === 1 ? "#ccc" : "black"}
          >
            {"< prev"}
          </PagedButton>
        </li>
        {pageNumber?.map(n => (
          <li key={n} style={{textDecoration: n === currentPage ? "underline" : "none"}}>
            <PagedButton 
              onClick={() => paginado(n)}
            >{n}</PagedButton>
          </li>
        ))}
        <li>
          <PagedButton 
            onClick={() => paginado(currentPage + 1)}
            color={currentPage === pageNumber.length ? "#ccc" : "black"}
          >
            {"next >"}
          </PagedButton>
        </li>
      </PaginationUl>
  );
};

