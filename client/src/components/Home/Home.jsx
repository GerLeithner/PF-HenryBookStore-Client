import React from "react";
// import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
  <div>
    <h1>Henry Book Store</h1>
    {/* <Card/> */}
    <div>
    <Link to={"/catalogue"} ><button>See Complete Catalogue</button></Link>
    </div>
  </div>
  )
};

export default Home;
