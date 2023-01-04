import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
  getBookById,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
  getUser,
} from "../redux/actions";

import CardDetail from "./CardDetail.jsx";
import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import bookIcon from "../icons/bookIcon.svg";
import bookHalfIcon from "../icons/bookHalfIcon.svg"
import {
  CardImg,
  UlCard,
  // ButtonSelectCard,
  // ButtonOptionsCard,
  MenuConteiner,
  ImgContainer,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";

export default function Card({ id, cover, modal, setModal }) {

  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);

  const [reading,setReading]=useState(false)
  // const { isAuthenticated, user, isLoading } = useAuth0();

  

  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    dispatch(getBookById(id));
  }

  const dispatch = useDispatch();

  const book = useSelector((state) => state.bookDetail);
  const currentUser = useSelector((state) => state.currentUser);

  const userId={userId:currentUser && currentUser.id};
  // userId && console.log("USERID",userId)


  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)
    
    if(!favorite){
      console.log("Entré a add favorite, bookId:", id);
      setFavorite(!favorite)
      console.log("FAV+",favorite)

      dispatch(addFavorite(id, userId));
      
    }
    if(favorite){
      console.log("Entré a delete favorite, bookId:", id);
      setFavorite(!favorite)
      console.log("FAV-",favorite)
      dispatch(deleteFavorite(id, userId));
      
    }
    
  }
  
  function handleReaded(id, userId) {
    
    // console.log("e.target.value",e.target.value)
    
    if(!readed){
      console.log("Entré a add readed :", id);
      setReaded(!readed)
      console.log("READ+",readed)
      
      dispatch(addReaded(id, userId));
      
    }
    if(readed){
      console.log("Entré a delete readed :", id);
      setReaded(!readed)
      console.log("READ-",readed)
      dispatch(deleteReaded(id, userId));
      
    }
    
  }

  function handleReading(id, userId) {
    
    // console.log("e.target.value",e.target.value)
    
    if(!reading){
      console.log("Entré a add reading :", id);
      setReading(!reading)
      console.log("READ+",reading)
      
      dispatch(addReading(id, userId));
      
    }
    if(reading){
      console.log("Entré a delete reading :", id);
      setReading(!reading)
      console.log("READ-",reading)
      dispatch(deleteReading(id, userId));
      
    }
    
  }

  return (
    <>
      <CardDetail book={book} modal={modal} setModal={setModal} />
      <ImgContainer>
        <CardImg
          src={cover}
          alt="img not found"
          onClick={(id) => {
            handleClick(id);
          }}
        />
        <MenuConteiner>
          <MenuTrigger
            onClick={() => {setOpen(!open);}}>
            <img src={caretIcon} />
          </MenuTrigger>
          <DropDownMenu
            className={`dropdown-menu ${open ? "active" : "inactive"}`}
          >
            <UlCard>
              {/* <DropdownItem icon={reviewIcon} value={id} role="button" /> */}
              <DropdownItem icon={!reading?bookIcon:bookHalfIcon} value={id} handle={e=>{handleReading(id,userId)}}role="button" />
              <DropdownItem icon={!readed?readedIcon:readedIconFill} value={id} handle={e=>{handleReaded(id,userId)}} role="button"/>
              <DropdownItem icon={!favorite ? favoriteIcon:favoriteFillIcon} value={id} handle={e=>{handleFavorite(id,userId)}} role="button"/>
            </UlCard>
          </DropDownMenu>
        </MenuConteiner>
      </ImgContainer>
      {/* onpointerleave={()=>{setOpen(!open)}} */}

    </>
  );
}

function DropdownItem(props) {
  return (
    <li>
      <img src={props.icon} alt="n" role="button" onClick={props.handle} value={props.id}/>
    </li>
  );
}
