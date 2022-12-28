/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Paginado.css";

export default function Paginado({dogsPerPage, dogSearch, allDogs, paginado}){
  const pageNumbers = []
  if (dogSearch){
    for (let i=1; i<=Math.ceil(dogSearch/dogsPerPage); i++){
      pageNumbers.push(i)
    }
  }else{
    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
      pageNumbers.push(i)
    }
  }
  
  return (
    <nav>
      <ul className="paginado">
        { pageNumbers && 
        pageNumbers.map((number) => (
          <li className="item" key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  ) 
}
