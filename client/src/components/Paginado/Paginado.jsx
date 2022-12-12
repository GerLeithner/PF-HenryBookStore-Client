import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";

const Paginado = ({ booksPerPage, allBooks, paginado, currentPage }) => {
  const pageNumbers = [];

  const countPages = Math.ceil(allBooks / booksPerPage);

  for (let i = 1; i <= countPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        <li>
          <ButtonCatalogue onClick={() => paginado(currentPage - 1)}>
            {"<-"}Prev
          </ButtonCatalogue>
        </li>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
        <li>
          <ButtonCatalogue onClick={() => paginado(currentPage + 1)}>
            Next{"->"}
          </ButtonCatalogue>
        </li>
      </ul>
    </div>
  );
};

export default Paginado;
