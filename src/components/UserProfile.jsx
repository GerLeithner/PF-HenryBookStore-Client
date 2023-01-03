import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { InfoContainer } from "../styles/UserProfile";


export default function UserProfile() {

    const currentUser = useSelector((state) => state.currentUser);
    console.log(currentUser);

    return (
        <InfoContainer>Soy un tremendo user container</InfoContainer>
    )
}