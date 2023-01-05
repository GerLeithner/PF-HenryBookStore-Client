import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { getAllUsers } from "../redux/actions";

import { H3Form } from "../styles/CreateBook";
import { SideBarContainer } from "../styles/Catalogue";
import { ButtonDisable } from "../styles/EditUser";
import { FilterHead, DownfallButton } from "../styles/SortOrFilter";
import { 
  AccoutContainer, 
  InfoContainer, 
  ImageAndInfo, 
  ProfilePic, 
  FiledAndButton,
  Field,
  EditFieldButton,
  OptionsContainer
} from "../styles/UserProfile";


export default function UserProfile() {
  
  const user = useSelector((state) => state.currentUser);
  console.log("user ", user);

  const [downfall, setDownfal] = useState(false);

  function handleEdit(e) {
    e.preventDefault();
  }

  function handleDisable(e) {
    e.preventDefault();
    // dispatch(disableUser(user.id))
    alert(user.active ? "Account has been disable" : "Account has been activated");    
  }

  function handleDownfall(e) {
    e.preventDefault();
    setDownfal(!downfall);
  }

  function handleNotification(e) {
    e.preventDefault();
    console.log(e);

    // alert(user.notifications? "Account has been disable" : "Account has been activated");
  } 

  return (
    <>
      <SideBarContainer paddingTop="115px">
        <div>
          <FilterHead>User Info</FilterHead>
        </div>
        <div style={{marginTop: "205px"}}>
          <FilterHead>Subscription</FilterHead>
        </div>
        <div style={{marginTop: "80px"}}>
          <FilterHead>Configurations</FilterHead>
        </div>
      </SideBarContainer>
      <AccoutContainer>
        <H3Form margenIzq="0px">      
          ACCOUNT OPTIONS
        </H3Form>
        <OptionsContainer>
          <ImageAndInfo>
            { user && user.profilePic ? 
              <ProfilePic src={user.profilePic}/> :
              <ProfilePic alt=""/> 
            }
            <InfoContainer>
              <FiledAndButton>
                <Field>
                  <div>User Name</div>
                  <div>{user?.userName}</div>
                </Field>
                <EditFieldButton onClick={e => handleEdit(e)}>Change</EditFieldButton>
              </FiledAndButton>
              <FiledAndButton>
                <Field>
                  <div>Email</div>
                  <div>{user?.email}</div>
                </Field>
                <EditFieldButton onClick={e => handleEdit(e)}>Change</EditFieldButton>
              </FiledAndButton>
              <FiledAndButton>
                <Field>
                  <div>Pasword</div>
                  <div>-</div>
                </Field>
                <EditFieldButton onClick={e => handleEdit(e)}>Change</EditFieldButton>
              </FiledAndButton>
            </InfoContainer>
          </ImageAndInfo>
          <FiledAndButton>
            <Field ancho="100%">
              <div>Profile Picture</div>
              <span style={{fontSize: "14px"}}>{user?.profilePic}</span>
            </Field>
            <EditFieldButton onClick={e => handleEdit(e)}>Change</EditFieldButton>
          </FiledAndButton>
        </OptionsContainer>
        <OptionsContainer>
          <FiledAndButton>
            <Field>
              <div>Subscription</div>
              <div>Type 1</div>
            </Field>
            <Field>
              <div>Payment</div>
              <div>Mod 1</div>
            </Field>
            <EditFieldButton onClick={e => handleEdit(e)}>Change</EditFieldButton>
          </FiledAndButton>
          <FiledAndButton>
            <Field>
              <div>Active Date</div>
              <div>dd/mm/yyyy</div>
            </Field>
            <Field>
              <div>Expiration Date</div>
              <div>dd/mm/yyyy</div>
            </Field>
            <div style={{padding: "0px 20px 0px 20px", border: "1px solid white", color: "white"}}>Change</div>
          </FiledAndButton>
        </OptionsContainer>
        <OptionsContainer>
          <FiledAndButton>
            <Field ancho="100%" onClick={e => handleDownfall(e)} style={{cursor: "pointer"}}>
              <div>MAIL NOTIFICATIONS</div>
              <div style={{
                transform: `rotate(${downfall ? "45deg" : "0deg"})`,
                transition: "300ms ease all"
              }}>
                <DownfallButton onClick={e => handleDownfall(e)}>+</DownfallButton>
              </div>
            </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="all" onClick={e => handleNotification(e)}>
                { user?.notifications.all ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
          </FiledAndButton>
          { downfall && 
            <FiledAndButton>
              <Field ancho="100%">
                subscription's expiration date warning
              </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="subscription" onClick={e => handleNotification(e)}>
                  { user?.notifications.subscription ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
            </FiledAndButton>
          }
          { downfall && 
            <FiledAndButton>
              <Field ancho="100%">
                new books added to library
              </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="newBooks" onClick={e => handleNotification(e)}>
                  { user?.notifications.subscription ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
            </FiledAndButton>
          }
        </OptionsContainer>
        <div style={{alignSelf: "flex-end"}}>
        <ButtonDisable type="button" onClick={(e) => handleDisable(e)} ancho="150px" color="red">
          { user?.active ? "Disable Account" : "Activate Account" }
        </ButtonDisable>
        </div>  
      </AccoutContainer>
    </>
  );
}
