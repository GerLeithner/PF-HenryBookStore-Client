import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";

import {
    ReviewsList,
    ReviewContainer
} from "../styles/Review";

export default function Reviews () {

    return (
        <ReviewContainer>
        </ReviewContainer>    
    )

}