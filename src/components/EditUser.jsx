import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUserDetail } from "../redux/actions";

import {
  ButtonForm,
  ErrorsForm,
  ImageAndInfoContainer,
  InfoContainer,
} from "../styles/CreateBook";
import { 
  UserEditContainer, 
  UserPic, 
  ButtonDisable, 
  FieldContainer, 
  Field, 
  H3Field, 

} from "../styles/EditUser";

export default function EditUser({ setModal }) {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.userDetail);

  function close(e) {
    e.preventDefault();
    dispatch(cleanUserDetail())
    setModal(false);
  }

  function handleDisable(e) {
    e.preventDefault();
    // dispatch(disableUser(user.id))
    alert(user.active ? "Account has been disable" : "Account has been activated");    
    setModal(false);
  }

  return (
    <UserEditContainer>
      { !user.active && 
        <div style={{alignSelf: "center"}}>
          <ErrorsForm>*the current Account is disabled</ErrorsForm>
        </div> 
      }
      <ImageAndInfoContainer>
        <UserPic alt=""/>
        <InfoContainer>
          <FieldContainer>
            <Field>
              <H3Field>User Name</H3Field>
              <H3Field>{user.userName}</H3Field>
            </Field>
            <Field>
              <H3Field>Email</H3Field>
              <H3Field>{user.email}</H3Field>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <Field>
              <H3Field>Act. Date</H3Field>
              <H3Field>dd/mm/yyyy</H3Field>
            </Field>
            <Field>
              <H3Field>Exp. Date</H3Field>
              <H3Field>dd/mm/yyyy</H3Field>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <Field>
              <H3Field>Subscription Type</H3Field>
              <H3Field>One Month</H3Field>
            </Field>
            <Field>
              <H3Field>Payment Mod</H3Field>
              <H3Field>Mod 1</H3Field>
            </Field>
          </FieldContainer>
        </InfoContainer>
      </ImageAndInfoContainer>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <ButtonForm type="button" onClick={(e) => close(e)} ancho="100px" margenIzq="25px" color="red">
          Close Form
        </ButtonForm> 
        <ButtonDisable type="button" onClick={(e) => handleDisable(e)} ancho="150px" color="red">
          { user.active ? "Disable Account" : "Activate Account" }
        </ButtonDisable>      
      </div>
    </UserEditContainer>

  );
}