import React from "react";
import { Link } from "react-router-dom";
import { ButtonCatalogue } from "../styles/Catalogue";

const LandingPage = () => {
  return (
    <div>
      <div>
        <h1>Henry Book Store</h1>
      </div>
      <div>
        <Link to="/home">
          <ButtonCatalogue>Enter the book Store</ButtonCatalogue>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
