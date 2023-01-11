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
              <H3Field>Subscription</H3Field>
              <H3Field>{user.subscription ? "ACTIVE" : "INACTIVE"}</H3Field>
            </Field>
            <Field>
              <H3Field>Plan</H3Field>
              <H3Field>{user.subscription ? user.subscription.plan : "-" }</H3Field>
            </Field>
          </FieldContainer>
          <FieldContainer>
            <Field>
              <H3Field>Start Date</H3Field>
              <H3Field>{user.subscription ? user.subscription.starDate : "-"}</H3Field>
            </Field>
            <Field>
              <H3Field>Finish Date</H3Field>
              <H3Field>{user.subscription ? user.subscription.finishDate : "-"}</H3Field>
            </Field>
          </FieldContainer>
        </InfoContainer>
      </ImageAndInfoContainer>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <ButtonDisable type="button" onClick={(e) => close(e)} ancho="150px" color="red" border="1px solid #ccc">
          Close Form
        </ButtonDisable> 
        <ButtonDisable type="button" onClick={(e) => handleDisable(e)} ancho="150px" color="red">
          { user.active ? "Disable Account" : "Activate Account" }
        </ButtonDisable>      
      </div>
    </UserEditContainer>

  );
}