import React from "react";
import { CardImg } from "../styles/Card";
import { bookDetail } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./CardDetail.jsx";
import {ButtonSelectCard,ButtonOptionsCard} from "../styles/Card"





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
    <ButtonSelectCard>
      <ButtonOptionsCard value="" hidden>Options</ButtonOptionsCard>
      <ButtonOptionsCard value="review">Review</ButtonOptionsCard>
      <ButtonOptionsCard value="readed">Readed</ButtonOptionsCard>
      <ButtonOptionsCard value="favorite">Favorite</ButtonOptionsCard>
      </ButtonSelectCard>
      <CardDetail book={book}modal={modal} setModal={setModal}/>
      <CardImg src={cover} alt="img not found" onClick={(id) => {handleClick(id)}}/>
    </>
  );
}
