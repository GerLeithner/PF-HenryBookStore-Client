import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";
import { PaginationUl } from "../styles/Paginado";

const Paginado = ({ booksPerPage, allBooks, paginado, currentPage }) => {
  const pageNumbers = [];

  const countPages = Math.ceil(allBooks / booksPerPage);

  for (let i = 1; i <= countPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <PaginationUl>
        <li>
          <ButtonCatalogue onClick={() => paginado(currentPage - 1)}>
            {"<-"}Prev
          </ButtonCatalogue>
        </li>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <ButtonCatalogue onClick={() => paginado(number)}>
              {number}
            </ButtonCatalogue>
          </li>
        ))}
        <li>
          <ButtonCatalogue onClick={() => paginado(currentPage + 1)}>
            Next{"->"}
          </ButtonCatalogue>
        </li>
      </PaginationUl>
    </div>
  );
};

export default Paginado;
