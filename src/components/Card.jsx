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
import bookHalfIcon from "../icons/bookHalfIcon.svg";
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

export default function Card({ id, cover, modal, setModal, readChange }) {
  // const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);

  const [reading, setReading] = useState(false);
  // const { isAuthenticated, user, isLoading } = useAuth0();

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

  const dispatch = useDispatch();

  const book = useSelector((state) => state.bookDetail);
  const currentUser = useSelector((state) => state.currentUser);

  const userId = { userId: currentUser && currentUser.id };
  // userId && console.log("USERID",userId)

  const allFavorites = [];
  const allReaded = [];
  const allReading = [];

  // for (let i=0;i<currentUser.Favorites.length; i++){
  //  let fav= currentUser.Favorites[i].id
  //  AllFavorites.push(fav)
  // }

  // currentUser && currentUser.Favorites && currentUser.Favorites.map(e=> allFavorites.push(e.id))
  // var bool=Object.values(currentUser.Favorites).includes(id)
  // console.log("BOOL",bool)

  // if(allFavorites.includes(id)){
  //   setFavorite(true)
  // }else{setFavorite(false)}

  // const arr= currentUser && currentUser.Favorites && Object.values(currentUser.Favorites)
  // console.log("ARREGLO", allFavorites)
  // const allFav= currentUser && currentUser.Favorites
  //   if(currentUser){
  //  for (let i=0;i<currentUser.Favorites.length; i++){
  //    let fav= currentUser.Favorites[i].id
  //    allFavorites.push(fav)
  //   }
  //   }
  //    console.log("ALLFAV",allFavorites)

  //    if(!allFavorites.includes(id)){
  //     console.log("FALSE")
  //     setFavorite(false)
  //    }else{
  //     console.log("FALSE")
  //     setFavorite(true)
  //   }

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      console.log("Entré a add favorite, bookId:", id);
      setFavorite(!favorite);
      console.log("FAV+", favorite);

      dispatch(addFavorite(id, userId));
    }
    if (favorite) {
      console.log("Entré a delete favorite, bookId:", id);
      setFavorite(!favorite);
      console.log("FAV-", favorite);
      dispatch(deleteFavorite(id, userId));
    }
  }

  function handleReaded(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      console.log("Entré a add readed :", id);
      setReaded(!readed);
      console.log("READ+", readed);

      dispatch(addReaded(id, userId));
    }
    if (readed) {
      console.log("Entré a delete readed :", id);
      setReaded(!readed);
      console.log("READ-", readed);
      dispatch(deleteReaded(id, userId));
    }
  }

  function handleReading(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!reading) {
      console.log("Entré a add reading :", id);
      setReading(!reading);
      console.log("READ+", reading);

      dispatch(addReading(id, userId));
      return readChange(true);
    }
    if (reading) {
      console.log("Entré a delete reading :", id);
      setReading(!reading);
      console.log("READ-", reading);
      dispatch(deleteReading(id, userId));
      return readChange(false);
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
        <MenuConteiner>
          {/* <MenuTrigger
            onMouseOver={handleMouseOver} >
            <img src={caretIcon} />
          </MenuTrigger> */}
          <DropDownMenu
            className={`dropdown-menu ${isHovering ? "active" : "inactive"}`}
          >
            <UlCard>
              {/* <DropdownItem icon={reviewIcon} value={id} role="button" /> */}
              <DropdownItem
                icon={!reading ? bookIcon : bookHalfIcon}
                value={id}
                handle={(e) => {
                  handleReading(id, userId);
                }}
                role="button"
              />
              <DropdownItem
                icon={!readed ? readedIcon : readedIconFill}
                value={id}
                handle={(e) => {
                  handleReaded(id, userId);
                }}
                role="button"
              />
              <DropdownItem
                icon={!favorite ? favoriteIcon : favoriteFillIcon}
                value={id}
                handle={(e) => {
                  handleFavorite(id, userId);
                }}
                role="button"
              />
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
      <img
        src={props.icon}
        alt="n"
        role="button"
        onClick={props.handle}
        value={props.id}
      />
    </li>
  );
}
