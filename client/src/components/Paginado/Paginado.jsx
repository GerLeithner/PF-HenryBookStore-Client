import React from "react";
import "./Paginado.css"

const Paginado = (booksPerPage,allBooks,paginado,currentPage) => {
    const pageNumbers=[]
    const countPages=Math.ceil(allBooks/booksPerPage)
   
   
    for(let i=1;i<=countPages;i++){
        pageNumbers.push(i)
    }
    
  return( 
  <div>
    <ul>
                <li><button onClick={()=>paginado(currentPage-1)}>{"<-"}Prev</button></li>
                {pageNumbers?.map(number =>(
                    <li key={number} >
                        <button onClick={()=>paginado(number)}>{number}</button>
                    </li>
                    
                ))}
                <li><button onClick={()=>paginado(currentPage+1)}>Next{"->"}</button></li>
            </ul>
    </div>)
};

export default Paginado;
