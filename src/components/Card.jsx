import React, { useState } from "react";
import { bookDetail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./CardDetail.jsx";
import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import CardMenu from "./CardMenu.css";
import {
  CardImg,
  UlCard,
  ButtonSelectCard,
  ButtonOptionsCard,
  MenuConteiner,
  ImgContainer,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";

export default function Card({ id, cover, modal, setModal }) {
  const [open, setOpen] = useState(false);

  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    dispatch(bookDetail(id));
  }

  const dispatch = useDispatch();
  const book = useSelector((state) => state.detail);

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
              <DropdownItem icon={reviewIcon}/>
              <DropdownItem icon={readedIcon}/>
              <DropdownItem icon={favoriteIcon}/>
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
      <img src={props.icon} alt="n" />
    </li>
  );
}
