import React, { useState,useEffect } from "react";
import { getCurrentUser } from "../redux/actions/index.js";
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

export default function Card({ id, cover, modal, setModal,arrayFavorite, arrayReaded, arrayReading }) {
 

  // console.log("includes", id, "?", arrayFavorite.includes(id))

  const [isHovering, setIsHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading,setReading]= useState(false);
 
  

  const dispatch = useDispatch();
  
  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  


  useEffect(()=>{
    if(arrayFavorite.includes(id)){
      
      setFavorite(true)
      console.log("SETIE EL FAV", true)
      
    }else if(!arrayFavorite.includes(id)){
      console.log("FAV-", false)
      setFavorite(false)
      console.log("SETIE EL FAV",false)
    }
  },[dispatch, arrayFavorite])


  useEffect(()=>{
    if(arrayReaded.includes(id)){
      
      setReaded(true)
      console.log("SETIE EL Readed", true)
      
    }else if(!arrayReaded.includes(id)){
      console.log("Readed-", false)
      setReaded(false)
      console.log("SETIE EL READED",false)
    }
  },[dispatch, arrayReaded])

  useEffect(()=>{
    if(arrayReading.includes(id)){
      
      setReading(true)
      console.log("SETIE EL Reading", true)
      
    }else if(!arrayReading.includes(id)){
      console.log("Reading-", false)
      setFavorite(false)
      console.log("SETIE EL READING",false)
    }
  },[dispatch, arrayReading])



  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    dispatch(getBookById(id));
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };



  const book = useSelector((state) => state.bookDetail);
  

  const userId={userId:currentUser && currentUser.id};
  

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)
    
    if(!favorite){
      console.log("Entré a add favorite, bookId:", id);
      setFavorite(true);
      console.log("FAV+",favorite)

      dispatch(addFavorite(id, userId));
      
    }
    if(favorite){
      console.log("Entré a delete favorite, bookId:", id);
      setFavorite(false);
      console.log("FAV-",favorite)
      dispatch(deleteFavorite(id, userId));
      
    }
    
  }
  
  function handleReaded(id, userId) {
    
    // console.log("e.target.value",e.target.value)
    
    if(!readed){
      console.log("Entré a add readed :", id);
      setReaded(true);
      console.log("READ+",readed)
      
      dispatch(addReaded(id, userId));
      
    }
    if(readed){
      console.log("Entré a delete readed :", id);
      setReaded(false);
      console.log("READ-",readed)
      dispatch(deleteReaded(id, userId));
      
    }
    
  }

  function handleReading(id, userId) {
    
    // console.log("e.target.value",e.target.value)
    
    if(!reading){
      console.log("Entré a add reading :", id);
      setReading(true);
      console.log("READ+",reading)
      
      dispatch(addReading(id, userId));
      
    }
    if(reading){
      console.log("Entré a delete reading :", id);
      setReading(false);
      console.log("READ-",reading)
      dispatch(deleteReading(id, userId));
      
    }
    
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <CardDetail book={book} modal={modal} setModal={setModal} />
      <ImgContainer>
        <CardImg
          src={cover}
          alt="img not found"
          onClick={(id) => {
            handleClick(id);
          }}
        />
        <MenuConteiner >
          {/* <MenuTrigger
            onMouseOver={handleMouseOver} >
            <img src={caretIcon} />
          </MenuTrigger> */}
          <DropDownMenu 
            className={`dropdown-menu ${isHovering ? "active" : "inactive"}`} 
          >
            <UlCard  >
              {/* <DropdownItem icon={reviewIcon} value={id} role="button" /> */}
              <DropdownItem icon={!reading ? bookIcon: bookHalfIcon} value={id} handle={e=>{handleReading(id,userId)}}role="button" />
              <DropdownItem icon={!readed ? readedIcon: readedIconFill} value={id} handle={e=>{handleReaded(id,userId)}} role="button"/>
              <DropdownItem icon={!favorite ? favoriteIcon: favoriteFillIcon} value={id} handle={e=>{handleFavorite(id,userId)}} role="button"/>
            </UlCard>
          </DropDownMenu>
        </MenuConteiner>
      </ImgContainer>
      {/* onpointerleave={()=>{setOpen(!open)}} */}

    </div>
  );
}

function DropdownItem(props) {
  return (
    <li>
      <img src={props.icon} alt="n" role="button" onClick={props.handle} value={props.id}/>
    </li>
  );
}
