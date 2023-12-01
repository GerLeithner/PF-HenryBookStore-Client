import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

import { editUser, getCurrentUser, changePassword } from "../redux/actions";

import FieldForm from "./FieldForm.jsx";

import PaypalButton from "./PaypalButton.jsx";

import { H3Form } from "../styles/CreateBook";
import { SideBarContainer } from "../styles/Catalogue";
import { ButtonDisable } from "../styles/EditUser";
import { FilterHead, DownfallButton } from "../styles/SortOrFilter";
import {
  Account,
  AccountContainer,
  InfoContainer,
  ImageAndInfo,
  ProfilePic,
  FlexRow,
  ProfilePicInput,
  FiledAndButton,
  Field,
  EditFieldButton,
  OptionsContainer,
  SubscriptionOptions,
  PlanSelect,
  HeaderAccount,
  Loading,
  ToggleSwitch,
  NotificationContainer,
} from "../styles/UserProfile";
import { toast } from "react-toastify";

import { ReactComponent as SwitchIcon } from "../icons/switch-on.svg";
import { ReactComponent as EditIcon } from "../icons/editIcon.svg";
import { ReactComponent as LoadingIcon } from "../icons/loadingIcon.svg";
import { StyledOption } from "../styles/Review.js";

export default function UserProfile() {
  const dispatch = useDispatch();

  const { user, logout } = useAuth0();

  const currentUser = useSelector((state) => state.currentUser);
  const loading = useSelector((state) => state.loading);

  const [form, setForm] = useState({
    fieldName: "",
    propName: "",
    propValue: "",
  });

  const [userName, setUserName] = useState(false);
  const [loadingPic, setLoadingPic] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [cosito, setCosito] = useState(false);
  const [downfall, setDownfal] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [plan, setPlan] = useState("");

  const paypalStyle = {
    shape: "rect",
    color: "silver",
    layout: "vertical",
    label: "paypal",
    tagline: "false",
  };
  console.log(
    "Notifitations: ",
    notifications,
    " currentUser.notifications.all: ",
    currentUser.notifications.all,
    " currentUser.notifications.expDate: ",
    currentUser.notifications.expDate,
    " currentUser.notifications.newBooks: ",
    currentUser.notifications.newBooks
  );

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };

      dispatch(getCurrentUser(userDb));
    }
  }, [dispatch, user, userName, notifications, cosito]);

  useEffect(() => {
    if (user && subscription) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
    if (currentUser?.subscription) {
      setSubscription(false);
      setShowButton(false);
    }
  }, [dispatch, user, currentUser, subscription]);

  function editSubscription(value) {
    setSubscription(value);
  }

  function handleUserName(e) {
    e.preventDefault();

    setForm({
      fieldName: e.target.title,
      propName: e.target.name,
      propValue: e.target.value,
    });

    setUserName(true);
  }

  async function handlePicChange(e) {
    e.preventDefault();

    setUserName(false);
    setLoadingPic(true);

    if (e.target.files[0]) {
      const imageRef = ref(storage, `${currentUser.id}/profilePic`);
      await uploadBytes(imageRef, e.target.files[0]).then(() => {
        getDownloadURL(imageRef).then((url) => {
          dispatch(editUser({ id: currentUser.id, profilePic: url }));
          // currentUser.profilePic = url;
          setLoadingPic(false);
          setCosito(!cosito);
        });
      });
    }

    toast.success("Profile Pice Updated", { position: "top-right" });
  }

  function handlePasswordChange(e) {
    e.preventDefault();

    dispatch(changePassword(currentUser));
  }

  function handleDisable(e) {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to disable your account? You can reenable it later"
      )
    ) {
      dispatch(
        editUser({
          id: currentUser.id,
          active: false,
        })
      );
      alert("The account has been disable");
      logout({ returnTo: window.location.origin });
    }
  }

  function handleDownfall(e) {
    e.preventDefault();
    setDownfal(!downfall);
  }

  function handleNotification(e) {
    e.preventDefault();

    if (e.currentTarget.name === "all") {
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
            [e.currentTarget.name]:
              !currentUser.notifications[e.currentTarget.name],
          },
        })
      );
    }

    /*   !currentUser.notifications[e.currentTarget.name]
      ? toast.success(`${e.currentTarget.value} Mail Notifications Enabled`)
      : toast.success(`${e.currentTarget.value} Mail Notifications Disabled`); */
    setTimeout(() => {
      setNotifications((prevNotifications) => !prevNotifications);
    }, 100);
  }

  function handlePlan(e) {
    e.preventDefault();
    setPlan(e.target.value);
    setShowButton(true);
  }

  return (
    <>
      {currentUser ? (
        <Account>
          <AccountContainer>
            <HeaderAccount>Account</HeaderAccount>
            <OptionsContainer name="account">
              <ImageAndInfo>
                <div style={{ width: "244px" }}>USER INFORMATION</div>

                <ProfilePic src={currentUser.profilePic} />
              </ImageAndInfo>
              <InfoContainer>
                <FlexRow>
                  <Field textColor="#FFFFFF">{currentUser?.email}</Field>
                  <div></div>
                </FlexRow>
                <FlexRow>
                  <Field>Password : **********</Field>
                  {!currentUser.googleUser ? (
                    <EditFieldButton onClick={(e) => handlePasswordChange(e)}>
                      Change Password
                    </EditFieldButton>
                  ) : (
                    <div style={{ width: "150px" }}></div>
                  )}
                </FlexRow>
                {!userName ? (
                  <FlexRow>
                    <Field>{currentUser?.userName}</Field>
                    <EditFieldButton
                      value={currentUser?.userName}
                      name="userName"
                      title="User Name"
                      onClick={(e) => handleUserName(e)}
                    >
                      Change Username
                    </EditFieldButton>
                  </FlexRow>
                ) : (
                  <FieldForm
                    setUserName={setUserName}
                    id={currentUser?.id}
                    fieldName={form.fieldName}
                    propName={form.propName}
                    propValue="New Username ..."
                    error={false}
                  />
                )}
                <FlexRow>
                  <ProfilePicInput>
                    <EditIcon />
                    Profile picture
                    <input
                      style={{ width: "0px", height: "0px" }}
                      text="Change"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handlePicChange(e)}
                    />
                  </ProfilePicInput>
                  {loadingPic ? (
                    <Loading>
                      <LoadingIcon />
                      Loading ...
                    </Loading>
                  ) : (
                    <div></div>
                  )}
                </FlexRow>
              </InfoContainer>
            </OptionsContainer>
            <OptionsContainer name="notifications">
              <ImageAndInfo>
                <div style={{ width: "244px" }}>NOTIFICATIONS</div>
                <div></div>
              </ImageAndInfo>
              <InfoContainer>
                <FlexRow>
                  <Field
                    onClick={(e) => handleDownfall(e)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "50px",
                      }}
                    >
                      <div>Mail Notifications</div>
                      <div
                        style={{
                          transform: `rotate(${downfall ? "45deg" : "0deg"})`,
                          transition: "300ms ease all",
                        }}
                      >
                        <DownfallButton onClick={(e) => handleDownfall(e)}>
                          +
                        </DownfallButton>
                      </div>
                    </div>
                  </Field>{" "}
                  {currentUser?.notifications.all ? (
                    <NotificationContainer>
                      Enabled{" "}
                      <EditFieldButton
                        onClick={(e) => handleNotification(e)}
                        name="all"
                        value="All"
                        style={{ transform: "translateY(-9px) " }}
                        className="on"
                      >
                        <SwitchIcon />
                      </EditFieldButton>
                    </NotificationContainer>
                  ) : (
                    <NotificationContainer className="off">
                      Disabled{" "}
                      <EditFieldButton
                        onClick={(e) => handleNotification(e)}
                        name="all"
                        value="All"
                        style={{
                          transform: "translateY(-9px) rotate(180deg) ",
                        }}
                      >
                        <SwitchIcon />
                      </EditFieldButton>
                    </NotificationContainer>
                  )}{" "}
                </FlexRow>
                {downfall && (
                  <FlexRow>
                    <Field>Subscription Expiration Date</Field>
                    {currentUser?.notifications.expDate ? (
                      <NotificationContainer>
                        Enabled{" "}
                        <EditFieldButton
                          onClick={(e) => handleNotification(e)}
                          name="expDate"
                          value="Subscription Expiration Date"
                          className="on"
                          style={{
                            transform: "translateY(-9px) ",
                          }}
                        >
                          <SwitchIcon />
                        </EditFieldButton>
                      </NotificationContainer>
                    ) : (
                      <NotificationContainer className="off">
                        Disabled{" "}
                        <EditFieldButton
                          onClick={(e) => handleNotification(e)}
                          name="expDate"
                          value="Subscription Expiration Date"
                          style={{
                            transform: "translateY(-9px) rotate(180deg)",
                          }}
                        >
                          <SwitchIcon />
                        </EditFieldButton>
                      </NotificationContainer>
                    )}
                  </FlexRow>
                )}
                {downfall && (
                  <FlexRow>
                    <Field>Book Releases</Field>
                    {currentUser?.notifications.newBooks ? (
                      <NotificationContainer>
                        Enabled{" "}
                        <EditFieldButton
                          onClick={(e) => handleNotification(e)}
                          name="newBooks"
                          value="Book Releases"
                          className="on"
                          style={{
                            transform: "translateY(-9px) ",
                          }}
                        >
                          <SwitchIcon />
                        </EditFieldButton>
                      </NotificationContainer>
                    ) : (
                      <NotificationContainer className="off">
                        Disabled{" "}
                        <EditFieldButton
                          onClick={(e) => handleNotification(e)}
                          name="newBooks"
                          value="Book Releases"
                          style={{
                            transform: "translateY(-9px) rotate(180deg)",
                          }}
                        >
                          <SwitchIcon />
                        </EditFieldButton>
                      </NotificationContainer>
                    )}
                  </FlexRow>
                )}
              </InfoContainer>
            </OptionsContainer>
            <OptionsContainer name="subscription" className="subscription">
              <ImageAndInfo>
                <div style={{ width: "244px" }}>MEMBERSHIP & PLAN</div>
                <div></div>
              </ImageAndInfo>

              {currentUser.subscription ? (
                <InfoContainer
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <FlexRow style={{ width: "1050px" }}>
                        <div>Subscription active since </div>
                        <div> {currentUser.subscription.startDate} </div>
                      </FlexRow>
                      <FlexRow style={{ width: "1050px" }}>
                        <div> Subscription will end on </div>
                        <div>{currentUser.subscription.finishDate}</div>
                      </FlexRow>
                    </div>
                    <FlexRow style={{ width: "1050px" }}>
                      <div>Current Plan</div>
                      <div
                        style={{
                          color: "#622cd4",
                          fontSize: "20px",
                          fontStyle: "italic",
                          fontWeight: "600",
                        }}
                      >
                        {currentUser?.subscription?.plan}
                      </div>
                    </FlexRow>
                  </div>
                </InfoContainer>
              ) : (
                <InfoContainer
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  <FlexRow>
                    <Field
                      style={{
                        color: "#622cd4",
                        fontFamily: "Inter",
                        fontStyle: "italic",
                        fontWeight: "600",
                        lineHeight: "normal",
                        paddingBottom: "5px",
                      }}
                    >
                      What are you waiting? Subscribe now!
                    </Field>
                  </FlexRow>{" "}
                  <FlexRow>
                    <Field>
                      <PlanSelect onChange={(e) => handlePlan(e)}>
                        <StyledOption hidden value="Select Plan">
                          {currentUser?.subscription?.plan
                            ? currentUser.subscription.plan
                            : "Select Plan"}
                        </StyledOption>
                        <StyledOption value="One month">
                          One Month USD$ 6.99
                        </StyledOption>
                        <StyledOption value="Six months">
                          Six Months USD$ 34.99
                        </StyledOption>
                        <StyledOption value="One year">
                          One Year USD$ 62.99
                        </StyledOption>
                      </PlanSelect>
                    </Field>
                  </FlexRow>
                  <FlexRow>
                    {" "}
                    <Field
                      style={{
                        width: "100%",
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontStyle: "italic",
                        fontWeight: "400",
                        lineHeight: "normal",
                      }}
                    >
                      {plan === "Six months" && (
                        <div>Get 1 Month for Free!</div>
                      )}
                      {plan === "One year" && <div>Get 3 Months for Free!</div>}
                    </Field>
                  </FlexRow>
                </InfoContainer>
              )}

              <div
                style={{ height: "80px", paddingTop: "2px", width: "270px" }}
              >
                <PaypalButton
                  editSubscription={editSubscription}
                  plan={plan}
                  currentUser={currentUser}
                  key={plan}
                  showButton={showButton}
                  style={paypalStyle}
                />
              </div>
            </OptionsContainer>
            <div
              name="butons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              {" "}
              <div></div>
              <ButtonDisable
                type="button"
                onClick={(e) => handleDisable(e)}
                ancho="220px"
                color="red"
                bcolor="#3F3F3F"
                border="none"
                fontColor="#FFF"
              >
                {currentUser?.active ? "Disable Account" : "Activate Account"}
              </ButtonDisable>
            </div>
          </AccountContainer>
        </Account>
      ) : (
        <div style={{ paddingTop: "200px", paddingLeft: "180px" }}>
          <H3Form>LOADING...</H3Form>
        </div>
      )}
    </>
  );
}
