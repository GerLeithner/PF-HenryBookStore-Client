import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: green;
  width: 100%;
  height: 150px;
  margin: 15px;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const ControlsLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;

export const StyledControlFields = styled.div`
  display: flex;
  margin: 5px;
`;

export const breakPoints = [
  { width: 200, itemsToShow: 1 },
  { width: 600, itemsToShow: 2 },
];
export const toggle = (updater) => () => updater((o) => !o);

export const CheckBox = ({ label, onToggle, ...rest }) => {
  return (
    <StyledControlFields>
      <label htmlFor={label}>{label}</label>
      <input {...rest} id={label} type="checkbox" onChange={toggle(onToggle)} />
    </StyledControlFields>
  );
};

export const serverItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

 export const DemoApp = () => {
  const [show, setShow] = useState(true);
  const [enableAutoPlay, setEnableAutoPlay] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [showArrows, setShowArrows] = useState(true);
  const [pagination, setPagination] = useState(true);
  const [verticalMode, setVerticalMode] = useState(false);
  const carouselRef = useRef();

  const addItem = () => {
    setItems((currentItems) => [...currentItems, currentItems.length + 1]);
  };

  const removeItem = () => {
    setItems((currentItems) => currentItems.slice(0, currentItems.length - 1));
  };

  const updateItemsToShow = ({ target }) =>
    setItemsToShow(Number(target.value));

  const goTo = ({ target }) => carouselRef.current.goTo(Number(target.value));

  useEffect(() => {
    setTimeout(() => {
      setItems(serverItems);
    }, 2500);
  }, []);
}