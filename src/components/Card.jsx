import React from "react";
import { CardImg } from "../styles/Card";
import { bookDetail } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./CardDetail.jsx";





export default function Card({ id, cover, modal, setModal }) {

  
  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    dispatch(bookDetail(id));
  }

  const dispatch = useDispatch();
  const book = useSelector((state) => state.detail);


  return (
    <>
    <CardDetail book={book}modal={modal} setModal={setModal}/>
    <CardImg src={cover} alt="img not found" onClick={(id) => {handleClick(id)}}/>
    </>
  );
}
