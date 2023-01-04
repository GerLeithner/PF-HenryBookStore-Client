import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { 
//     getAllUsers,
//     getUserById,
//     sortUsersByName, 
//     filterUsersByStatus, 
// } from "../redux/actions";

import { InfoContainer } from "../styles/UserProfile";
import { SideBarContainer } from "../styles/Catalogue";

export default function UserProfile() {

    const currentUser = useSelector((state) => state.currentUser);
    console.log(currentUser);

    return (
        <InfoContainer>Soy un tremendo user container</InfoContainer>
    )
}