import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { editUser, getCurrentUser } from "../redux/actions";

import FieldForm from "./FieldForm.jsx";
import PaypalButton from "./PaypalButton.jsx"

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

  const dispatch = useDispatch();

  const { user } = useAuth0();

  const currentUser = useSelector((state) => state.currentUser);

  const [edit, setEdit] = useState({
    userName: false,
    profilePic: false
  });
  const [form, setForm] = useState({
    fieldName: "",
    propName: "",
    propValue: ""
  });

  const [downfall, setDownfal] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    if(user){
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
  }, [dispatch, edit, notifications]);

  function handleChange(e) {
    e.preventDefault();

    setForm({
      fieldName: e.target.title,
      propName: e.target.name,
      propValue: e.target.value
    });

    setEdit({
      userName: e.target.name === "userName" ? true : false,
      profilePic: e.target.name === "profilePic" ? true : false
    });
  }

  function handleDisable(e) {
    e.preventDefault();
    // dispatch(disableUser(user.id))
    alert(currentUser.active ? "Account has been disable" : "Account has been activated");    
  }

  function handleDownfall(e) {
    e.preventDefault();
    setDownfal(!downfall);
  }

  function handleNotification(e) {
    e.preventDefault();
    console.log(e.target.value);
    if(e.target.name === "all") {
      if(currentUser.notifications.all) {
        dispatch(editUser({ 
          id: currentUser.id, 
          notifications: {
            all: false,
            expDate: false,
            newBooks: false
          } 
        }));
      }
      else {
        dispatch(editUser({ 
          id: currentUser.id, 
          notifications: {
            all: true,
            expDate: true,
            newBooks: true
          } 
        }));
      }
    }
    else {
      dispatch(editUser({ 
        id: currentUser.id, 
        notifications: {
          ...currentUser.notifications,
          [e.target.name]: !currentUser.notifications[e.target.name]
        } 
      }));
    }
    
    setNotifications(!notifications);

    alert(!currentUser.notifications[e.target.name] ? 
      `${e.target.value} mail notifications has been activated`
      : 
      `${e.target.value} mail notifications has been disable`
    );
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
            { currentUser?.profilePic ? 
              <ProfilePic src={currentUser?.profilePic}/> :
              <ProfilePic alt=""/> 
            }
            <InfoContainer>
              { !edit.userName ? 
                <FiledAndButton>
                  <Field>
                    <div>User Name</div>
                    <div>{currentUser?.userName}</div>
                  </Field>
                  <EditFieldButton 
                    value={currentUser?.userName} 
                    name="userName" 
                    title="User Name"
                    onClick={e => handleChange(e)}
                  >
                    Change
                  </EditFieldButton>
                </FiledAndButton> 
               :
                <FieldForm 
                  edit={edit}
                  setEdit={setEdit}
                  id={currentUser.id}
                  fieldName={form.fieldName} 
                  propName={form.propName}
                  propValue={form.propValue}
                /> 
              }
              <FiledAndButton>
                <Field>
                  <div>Email</div>
                  <div>{currentUser?.email}</div>
                </Field>
                <EditFieldButton>Change</EditFieldButton>
              </FiledAndButton>
              <FiledAndButton>
                <Field>
                  <div>Password</div>
                  <div>-</div>
                </Field>
                <EditFieldButton>Change</EditFieldButton>
              </FiledAndButton>
            </InfoContainer>
          </ImageAndInfo>
          { !edit.profilePic ? 
            <FiledAndButton>
              <Field ancho="100%">
                <div>Profile Picture</div>
                <span style={{fontSize: "14px"}}>{currentUser?.profilePic}</span>
              </Field>
              <EditFieldButton 
                value={currentUser?.profilePic} 
                name="profilePic" 
                title="Profile Picture"
                onClick={e => handleChange(e)} 
              >
                Change
              </EditFieldButton>
            </FiledAndButton>
          :
            <FieldForm 
            edit={edit}
            setEdit={setEdit}
            id={currentUser?.id}
            fieldName={form.fieldName} 
            propName={form.propName}
            propValue={form.propValue}
            />    
          }    
        </OptionsContainer>
        <OptionsContainer>
          <FiledAndButton>
            <Field>
              <div>Active Date</div>
              <div>{ currentUser?.subscription ? currentUser.subscription.startDate : "-"}</div>
            </Field>
            <Field>
              <div>Subcription</div>
              <div>{ currentUser?.subscription ? "ACTIVE" : "SUBSCRIBE !"}</div>
            </Field>
            <EditFieldButton>Change</EditFieldButton>
          </FiledAndButton>
          <FiledAndButton>
            <Field>
              <div>Expiration Date</div>
              <div>{ currentUser?.subscription ? currentUser.subscription.finishDate : "-"}</div>
            </Field>
            <Field>
              <div>Plan</div>
              <div>{ currentUser?.subscription ? currentUser.subscription.plan : "-"}</div>
            </Field>
            <EditFieldButton>Change</EditFieldButton>
          </FiledAndButton>
        </OptionsContainer>
        <OptionsContainer>
          <FiledAndButton>
            <Field ancho="100%" onClick={e => handleDownfall(e)} style={{cursor: "pointer"}}>
              <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                <div>MAIL NOTIFICATIONS</div>
                <div style={{
                  transform: `rotate(${downfall ? "45deg" : "0deg"})`,
                  transition: "300ms ease all"
                }}>
                  <DownfallButton onClick={e => handleDownfall(e)}>+</DownfallButton>
                </div>
              </div>
              <div>{ currentUser?.notifications.all ? "ACTIVE" : "DISABLED"}</div>
            </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="all" value="all" onClick={e => handleNotification(e)}>
                { currentUser?.notifications.all ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
          </FiledAndButton>
          { downfall && 
            <FiledAndButton>
              <Field ancho="100%">
                <div>subscription's expiration date warning</div>
                <div>{ currentUser?.notifications.expDate ? "ACTIVE" : "DISABLED" }</div>
              </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="expDate" onClick={e => handleNotification(e)}>
                  { currentUser?.notifications.expDate ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
            </FiledAndButton>
          }
          { downfall && 
            <FiledAndButton>
              <Field ancho="100%">
                <div>new books added to library</div>
                <div>{ currentUser?.notifications.newBooks ? "ACTIVE" : "DISABLED" }</div>
              </Field>
              <div style={{width: "120px"}}>
                <EditFieldButton name="newBooks" onClick={e => handleNotification(e)}>
                  { currentUser?.notifications.newBooks ? "Disable" : "Enable" }
                </EditFieldButton>
              </div>
            </FiledAndButton>
          }
        </OptionsContainer>
        <div style={{alignSelf: "flex-end"}}>
        <ButtonDisable type="button" onClick={(e) => handleDisable(e)} ancho="150px" color="red">
          { currentUser?.active ? "Disable Account" : "Activate Account" }
        </ButtonDisable>
        </div>  
      </AccoutContainer>
    </>
  );
}
