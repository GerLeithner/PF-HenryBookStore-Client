import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { editUser, getCurrentUser, changePassword } from "../redux/actions";

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
  OptionsContainer,
  SubscriptionOptions,
  PlanSelect
} from "../styles/UserProfile";

export default function UserProfile() {
  const dispatch = useDispatch();

  const { user, logout } = useAuth0();

  const currentUser = useSelector((state) => state.currentUser);

  const [edit, setEdit] = useState({
    userName: false,
    profilePic: false,
  });
  const [form, setForm] = useState({
    fieldName: "",
    propName: "",
    propValue: "",
  });

  const [downfall, setDownfal] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [showButton, setShowButton] = useState(false)
  const [plan, setPlan] = useState("");

  useEffect(() => {
    if (user) {
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
      propValue: e.target.value,
    });

    setEdit({
      userName: e.target.name === "userName" ? true : false,
      profilePic: e.target.name === "profilePic" ? true : false,
    });
  }

  function handlePasswordChange(e) {
    e.preventDefault();

    dispatch(changePassword(currentUser));
  }

  function handleDisable(e) {
    e.preventDefault();

    dispatch(editUser({
      id: currentUser.id,
      active: false
    }));
    alert("The account has been disable");
    logout({ returnTo: window.location.origin });
  }

  function handleDownfall(e) {
    e.preventDefault();
    setDownfal(!downfall);
  }

  function handleNotification(e) {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.name === "all") {
      if (currentUser.notifications.all) {
        dispatch(
          editUser({
            id: currentUser.id,
            notifications: {
              all: false,
              expDate: false,
              newBooks: false,
            },
          })
        );
      } else {
        dispatch(
          editUser({
            id: currentUser.id,
            notifications: {
              all: true,
              expDate: true,
              newBooks: true,
            },
          })
        );
      }
    } else {
      dispatch(
        editUser({
          id: currentUser.id,
          notifications: {
            ...currentUser.notifications,
            [e.target.name]: !currentUser.notifications[e.target.name],
          },
        })
      );
    }

    setNotifications(!notifications);

    alert(
      !currentUser.notifications[e.target.name]
        ? `${e.target.value} mail notifications has been activated`
        : `${e.target.value} mail notifications has been disable`
    );
  }

  function handlePlan(e) {
    e.preventDefault();
    setPlan(e.target.value);
    setShowButton(true);
  }

  return (
    <>
      <SideBarContainer paddingTop="90px">
        <div>
          <FilterHead>User Info</FilterHead>
        </div>
        <div style={{marginTop: "215px"}}>
          <FilterHead>Subscription</FilterHead>
        </div>
        <div style={{marginTop: !downfall ? "55px" : "155px"}}>

          <FilterHead>Configurations</FilterHead>
        </div>
      </SideBarContainer>
      <AccoutContainer>
        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          <H3Form margenIzq="0px">      
            ACCOUNT OPTIONS
          </H3Form>
          <OptionsContainer name="account options">
            <ImageAndInfo>
              { currentUser?.profilePic ? 
                <ProfilePic src={currentUser?.profilePic}/> :
                <ProfilePic src="https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg"/> 
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
                    id={currentUser?.id}
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
                  <EditFieldButton onClick={e => handlePasswordChange(e)}>Change</EditFieldButton>
                </FiledAndButton>
              </InfoContainer>
            </ImageAndInfo>
            { !edit.profilePic ? 
              <FiledAndButton>
                <Field>
                  <div>Profile Picture</div>
                  <div style={{fontSize: "13px"}}>{currentUser?.profilePic}</div>
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
        </div>
        <OptionsContainer name="notifications options">
          <FiledAndButton>
            <Field onClick={e => handleDownfall(e)} style={{cursor: "pointer"}}>
              <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                <div>All Mail Notifications</div>
                <div style={{
                  transform: `rotate(${downfall ? "45deg" : "0deg"})`,
                  transition: "300ms ease all"
                }}>
                  <DownfallButton onClick={e => handleDownfall(e)}>+</DownfallButton>
                </div>
              </div>
              <div>
                {currentUser?.notifications.all ? "ACTIVE" : "DISABLED"}
              </div>
            </Field>
            <div style={{ width: "120px" }}>
              <EditFieldButton
                name="all"
                value="all"
                onClick={(e) => handleNotification(e)}
              >
                {currentUser?.notifications.all ? "Disable" : "Enable"}
              </EditFieldButton>
            </div>
          </FiledAndButton>
          {downfall && (
            <FiledAndButton>

              <Field>
                <div>Expiration date warning</div>
                <div>{ currentUser?.notifications.expDate ? "ACTIVE" : "DISABLED" }</div>
              </Field>
              <div style={{ width: "120px" }}>
                <EditFieldButton
                  name="expDate"
                  onClick={(e) => handleNotification(e)}
                >
                  {currentUser?.notifications.expDate ? "Disable" : "Enable"}
                </EditFieldButton>
              </div>
            </FiledAndButton>
          )}
          {downfall && (
            <FiledAndButton>
              <Field>
                <div>New books aviable on library</div>
                <div>{ currentUser?.notifications.newBooks ? "ACTIVE" : "DISABLED" }</div>
              </Field>
              <div style={{ width: "120px" }}>
                <EditFieldButton
                  name="newBooks"
                  onClick={(e) => handleNotification(e)}
                >
                  {currentUser?.notifications.newBooks ? "Disable" : "Enable"}
                </EditFieldButton>
              </div>
            </FiledAndButton>
          )}
        </OptionsContainer>
        <SubscriptionOptions name="subcription options">
          <InfoContainer gap="25px">
            <div style={{display: "flex", flexDirection: "row", gap:"50px"}}>
              <Field>
                <div>Active Date</div>
                <div>{ currentUser?.subscription ? currentUser.subscription.startDate : "-"}</div>
              </Field>
              { currentUser?.subscription ? 
                <Field>
                <div>Subcription</div>
                <div>{ currentUser?.subscription ? "ACTIVE" : "SUBSCRIBE !"}</div>
                </Field>
              :
                <Field>
                  <div style={{paddingLeft: "50px"}}>SUBSCRIBE !</div>
                </Field>
              }
            </div>
            <div style={{display: "flex", flexDirection: "row", gap:"50px"}}>
              <Field>
                <div>Finish Date</div>
                <div>{ currentUser?.subscription ? currentUser.subscription.finishDate : "-"}</div>
              </Field>
              <Field>
                { currentUser?.subscription?.plan ?
                  <div>
                    <div>Plan</div> 
                    <div>{ currentUser?.subscription?.plan }</div>
                  </div>
                : 
                  <div style={{width: "100%"}}>
                    <PlanSelect onChange={e => handlePlan(e)}>
                      <option hidden value="Select Plan">
                        {currentUser?.subscription?.plan ? currentUser.subscription.plan : "Select Plan"}
                      </option>
                      <option value="One month">One Month USD$ 6.99</option>
                      <option value="Six months">Six Months USD$ 35.99</option>
                      <option value="One year">One Year USD$ 62.99</option>
                    </PlanSelect>
                  </div>
                }
              </Field>
            </div>
          </InfoContainer>
          <div style={{height: "80px", paddingTop: "2px", width: "270px"}}>
            <PaypalButton 
              plan={plan} 
              currentUser={currentUser} 
              key={plan}
              showButton={showButton}
            />
          </div>
        </SubscriptionOptions>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <ButtonDisable 
            onClick={() => logout({ returnTo: window.location.origin })}
            ancho="220px" 
            color="red"
          >
            Logout
          </ButtonDisable>        
          <ButtonDisable type="button" onClick={(e) => handleDisable(e)} ancho="220px" color="red">
            { currentUser?.active ? "Disable Account" : "Activate Account" }
          </ButtonDisable>
        </div>  
      </AccoutContainer>
    </>
  );
}
