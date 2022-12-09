import React from "react";
import {Link} from 'react-router-dom';
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div>
      <div>
             <h1>Henry Book Store</h1>
      </div>
      <div>
        <Link to='/home'>
          <button>Enter the book Store</button>
        </Link>
      </div>
    </div>
    

  )
};

export default LandingPage;
