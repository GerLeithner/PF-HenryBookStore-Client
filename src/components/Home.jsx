import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import {
  getBooks,
  getGenres,
  getAuthors,
  getTrendingBooks,
  getRecomendedBooks,
} from "../redux/actions";
import Card from "./Card.jsx";
import CardDetail from "./CardDetail.jsx";
import CardRecomended from "./CardRecomended.jsx";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";


const Home = () => {
  // const [trendingSorted,setTrendingSorted]=useState([])

  const dispatch = useDispatch();
  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recomended = useSelector((state) => state.recomended);
  const detailBook = useSelector((state) => state.detail);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!allGenres.length) {
      dispatch(getGenres());
    }
    if (!allAuthors.length) {
      dispatch(getAuthors());
    }
    if (!allBooks.length) {
      dispatch(getBooks());
    }
    if (!trending.length) {
      dispatch(getTrendingBooks());
    }
    if (!recomended.length) {
      dispatch(getRecomendedBooks());
    }
  }, [dispatch]);

  // function handleClick(e){
  //   e.preventDefault();
  //   if(!trending.length)
  //   dispatch(getTrendingBooks());
  // }

  return (

    <div>

      <div>
        <div>
          <CardDetail book={detailBook} modal={modal} setModal={setModal} />
          <Carousel itemsToShow={1} className="top-rec-wrapper " >
            {recomended.length ? (
              recomended.map((b) => {
                return (
                  <CardRecomended
                    id={b.id}
                    key={b.id}
                    title={b.title}
                    subtitle={b.subtitle}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genre={b.genre}
                    author={b.author}
                    back_cover={b.back_cover}
                  />
                );
              })
            ) : (
              <div>{console.log("FALLO TODO")}</div>
            )}
          </Carousel>
        </div>
        <div>
          <H2Home>Continue reading</H2Home>
          <Carousel itemsToShow={5}>
            {trending.length ? (
              trending.map((b) => {
                return (
                  <Card
                    id={b.id}
                    key={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                    modal={modal}
                    setModal={setModal}
                  />
                );
              })
            ) : (
              <div>{console.log("FALLO TODO")}</div>
            )}
          </Carousel>

          <H2Home>Trendings</H2Home>

          <Carousel itemsToShow={5}>
            {trending.length ? (
              trending.map((b) => {
                return (
                  <Card
                    id={b.id}
                    key={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                    modal={modal}
                    setModal={setModal}
                  />
                );
              })
            ) : (
              <div>{console.log("FALLO TODO")}</div>
            )}
          </Carousel>

          <H2Home>News</H2Home>

          <Carousel itemsToShow={5}>
            {trending.length ? (
              trending.map((b) => {
                return (
                  <Card
                    id={b.id}
                    key={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                    modal={modal}
                    setModal={setModal}
                  />
                );
              })
            ) : (
              <div>{console.log("FALLO TODO")}</div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: green;
  width: 100%;
  height: 150px;
  margin: 15px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const ControlsLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;

const StyledControlFields = styled.div`
  display: flex;
  margin: 5px;
`;

const breakPoints = [
  { width: 200, itemsToShow: 1 },
  { width: 600, itemsToShow: 2 },
];
const toggle = (updater) => () => updater((o) => !o);

const CheckBox = ({ label, onToggle, ...rest }) => {
  return (
    <StyledControlFields>
      <label htmlFor={label}>{label}</label>
      <input {...rest} id={label} type="checkbox" onChange={toggle(onToggle)} />
    </StyledControlFields>
  );
};

const serverItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DemoApp = () => {
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

  return (
    <Layout>
      <ControlsLayout>
        <StyledControlFields>
          <button onClick={() => setShow((o) => !o)}>
            {`${show ? "Hide" : "Show"} Carousel`}
          </button>
        </StyledControlFields>
        <StyledControlFields>
          <button onClick={addItem}>Add Item</button>
          <button onClick={removeItem}>Remove Item</button>
        </StyledControlFields>
        <StyledControlFields>
          <label>goTo</label>
          <input type="number" onChange={goTo} />
        </StyledControlFields>
        <StyledControlFields>
          <label>itemsToShow</label>
          <input
            type="number"
            value={itemsToShow}
            onChange={updateItemsToShow}
          />
        </StyledControlFields>
        <CheckBox
          label="showArrows"
          checked={showArrows}
          onToggle={setShowArrows}
        />
        <CheckBox
          label="pagination"
          checked={pagination}
          onToggle={setPagination}
        />
        <CheckBox
          label="verticalMode"
          checked={verticalMode}
          onToggle={setVerticalMode}
        />
        <CheckBox
          label="Auto Play"
          checked={enableAutoPlay}
          onToggle={setEnableAutoPlay}
        />
      </ControlsLayout>
      {show && (
        <Carousel
          enableAutoPlay={enableAutoPlay}
          ref={carouselRef}
          verticalMode={verticalMode}
          itemsToShow={itemsToShow}
          showArrows={showArrows}
          pagination={pagination}
        >
          {items.map((item) => (
            <Item key={item}>{item}</Item>
          ))}
        </Carousel>
      )}
    </Layout>
  );
};

export default Home;
