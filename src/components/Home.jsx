import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Card from "./Card.jsx";
import CardRecommended from "./CardRecommended.jsx";
import SubscribeNav from "./SubscribeNav.jsx";
import Featured from "./Featured.jsx";
import Catalogue from "./Catalogue.jsx";

import {
  getAuthors,
  getBooks,
  getGenres,
  getRecommendedBooks,
  getTrendingBooks,
  getNewsBooks,
  getCurrentUser,
} from "../redux/actions";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";
import "../styles/Carousel.css";

export default function Home() {
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <div>{search ? <Catalogue /> : <Featured />}</div>;
}

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */
