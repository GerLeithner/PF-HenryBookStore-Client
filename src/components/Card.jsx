import React, { useState, useEffect } from "react";
import { editState, getCurrentUser } from "../redux/actions/index.js";
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
  turnOnModal,
  getUser,
} from "../redux/actions";

// import CardDetail from "./CardDetail.jsx";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card({
  id,
  cover,
  arrayFavorite,
  arrayReaded,
  arrayReading,
  readChange,
  read,
  favorites,
  favoritesChange,
  readeds,
  readedsChange,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (arrayFavorite.includes(id)) {
      setFavorite(true);
      // console.log("SETIE EL FAV", true)
    } else if (!arrayFavorite.includes(id)) {
      // console.log("FAV-", false)
      setFavorite(false);
      // console.log("SETIE EL FAV",false)
    }
  }, [dispatch, arrayFavorite]);

  useEffect(() => {
    if (arrayReaded.includes(id)) {
      setReaded(true);
      // console.log("SETIE EL Readed", true)
    } else if (!arrayReaded.includes(id)) {
      // console.log("Readed-", false)
      setReaded(false);
      // console.log("SETIE EL READED",false)
    }
  }, [dispatch, arrayReaded]);

  useEffect(() => {
    if (arrayReading.includes(id)) {
      setReading(true);
      // console.log("SETIE EL Reading", true)
    } else if (!arrayReading.includes(id)) {
      // console.log("Reading-", false)
      setReading(false);
      // console.log("SETIE EL READING",false)
    }
  }, [dispatch, arrayReading]);

  function handleClick(e) {
    e.preventDefault(e);
    dispatch(editState(false));
    dispatch(turnOnModal());
    setIsHovering(false);
    dispatch(getBookById(id));
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const book = useSelector((state) => state.bookDetail);

  const userId = { userId: currentUser && currentUser.id };

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      setFavorite(true);

      dispatch(addFavorite(id, userId));
      toast.success("Book added to your favorites");
    }

    if (favorite) {
      setFavorite(false);

      dispatch(deleteFavorite(id, userId));

      toast.warning("Book removed from your favorites");
    }

    if (favoritesChange) {
      setTimeout(() => favoritesChange(!favorites), 300);
    }
  }

  function handleReaded(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      console.log("Entré a add readed :", id);
      setReaded(true);
      console.log("READ+", readed);

      dispatch(addReaded(id, userId));
      toast.success("Book mark as readed");
    }

    if (readed) {
      console.log("Entré a delete readed :", id);
      setReaded(false);
      console.log("READ-", readed);

      dispatch(deleteReaded(id, userId));
      toast.warning("Book mark as unread");
    }
    if (readedsChange) {
      setTimeout(() => readedsChange(!readeds), 300);
    }
  }

  function handleReading(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!reading) {
      console.log("Entré a add reading :", id);
      setReading(true);
      console.log("READ+", reading);

      dispatch(addReading(id, userId));

      toast.success("Book mark as reading");
    }

    if (reading) {
      console.log("Entré a delete reading :", id);
      setReading(false);
      console.log("READ-", reading);

      dispatch(deleteReading(id, userId));
      toast.warning("Book mark as unreading");
    }

    if (readChange) {
      setTimeout(() => readChange(!read), 300);
    }
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
                key={id + "1"}
                icon={!reading ? bookIcon : bookHalfIcon}
                value={id}
                handle={(e) => {
                  handleReading(id, userId);
                }}
                role="button"
              />
              <DropdownItem
                key={id + "2"}
                icon={!readed ? readedIcon : readedIconFill}
                value={id}
                handle={(e) => {
                  handleReaded(id, userId);
                }}
                role="button"
              />
              <DropdownItem
                key={id + "3"}
                icon={!favorite ? favoriteIcon : favoriteFillIcon}
                value={id}
                name={book.title}
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

/* useEffect(() => {
  currentUser?.Favorites.map((f) => {
    console.log("Comparación: ", f.id, " y ", id);
    if (f.id === id) {
      return setFavorite(true);
      // console.log("SETIE EL FAV", true)
    } else {
      // console.log("FAV-", false)
      return setFavorite(false);
      // console.log("SETIE EL FAV",false)
    }
  });
}, [dispatch, currentUser]);

useEffect(() => {
  if (currentUser?.Read.includes(id)) {
    setReaded(true);
    // console.log("SETIE EL Readed", true)
  } else if (!currentUser?.Read.includes(id)) {
    // console.log("Readed-", false)
    setReaded(false);
    // console.log("SETIE EL READED",false)
  }
}, [dispatch, currentUser]);

useEffect(() => {
  if (currentUser?.Reading.includes(id)) {
    setReading(true);
    // console.log("SETIE EL Reading", true)
  } else if (!currentUser?.Reading.includes(id)) {
    // console.log("Reading-", false)
    setReading(false);
    // console.log("SETIE EL READING",false)
  }
}, [dispatch, currentUser]); */
