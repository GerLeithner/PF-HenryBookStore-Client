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
import { ButtonDisable, H3Field } from "../styles/EditUser";
import { FilterHead, DownfallButton } from "../styles/SortOrFilter";
import {
  AccoutContainer,
  InfoContainer,
  ImageAndInfo,
  ProfilePic,
  ProfilePicInput,
  FiledAndButton,
  Field,
  EditFieldButton,
  OptionsContainer,
  SubscriptionOptions,
  PlanSelect,
} from "../styles/UserProfile";
import { toast } from "react-toastify";

export default function UserProfile() {
  const dispatch = useDispatch();

  const { user, logout } = useAuth0();

  const currentUser = useSelector((state) => state.currentUser);

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

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
  }, [dispatch, userName, notifications, cosito]);

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
  }, [currentUser, subscription]);

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

    !currentUser.notifications[e.target.name]
      ? toast.success(`${e.target.value} mail notifications has been activated`)
      : toast.success(`${e.target.value} mail notifications has been disable`);
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
        <div style={{ marginTop: "215px" }}>
          <FilterHead>Subscription</FilterHead>
        </div>
        <div style={{ marginTop: !downfall ? "55px" : "155px" }}>
          <FilterHead>Configurations</FilterHead>
        </div>
      </SideBarContainer>
      {currentUser ? (
        <AccoutContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <H3Form margenIzq="0px">ACCOUNT OPTIONS</H3Form>
            <OptionsContainer name="account options">
              <ImageAndInfo>
                <div style={{ width: "150px" }}>
                  <ProfilePic src={currentUser.profilePic} />
                </div>
                <InfoContainer>
                  <FiledAndButton>
                    <Field>
                      <div>Email</div>
                      <div>{currentUser?.email}</div>
                    </Field>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150px", height: "30px"}}>OPTIONS</div>
                  </FiledAndButton>
                  <FiledAndButton>
                    <Field>
                      <div>Password</div>
                    </Field>
                    { !currentUser.googleUser ? 
                      <EditFieldButton onClick={(e) => handlePasswordChange(e)}>
                        Change
                      </EditFieldButton>
                      :
                      <div style={{width: "150px"}}></div>
                    }
                  </FiledAndButton>
                  {!userName ? (
                    <FiledAndButton>
                      <Field>
                        <div>User Name</div>
                        <div>{currentUser?.userName}</div>
                      </Field>
                      <EditFieldButton
                        value={currentUser?.userName}
                        name="userName"
                        title="User Name"
                        onClick={(e) => handleUserName(e)}
                      >
                        Change
                      </EditFieldButton>
                    </FiledAndButton>
                  ) : (
                    <FieldForm
                      setUserName={setUserName}
                      id={currentUser?.id}
                      fieldName={form.fieldName}
                      propName={form.propName}
                      propValue={form.propValue}
                    />
                  )}
                </InfoContainer>
              </ImageAndInfo>
              <FiledAndButton>
                <Field>
                  <div>Profile Picture</div>
                  {loadingPic && <H3Form>Cargando...</H3Form>}
                </Field>
                <ProfilePicInput>
                  Change
                  <input
                    style={{ width: "0px", height: "0px" }}
                    text="Change"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handlePicChange(e)}
                  />
                </ProfilePicInput>
              </FiledAndButton>
            </OptionsContainer>
          </div>
          <OptionsContainer name="notifications options">
            <FiledAndButton>
              <Field
                onClick={(e) => handleDownfall(e)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "30px" }}
                >
                  <div>All Mail Notifications</div>
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
                  <div>
                    {currentUser?.notifications.expDate ? "ACTIVE" : "DISABLED"}
                  </div>
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
                  <div>
                    {currentUser?.notifications.newBooks
                      ? "ACTIVE"
                      : "DISABLED"}
                  </div>
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
              <div
                style={{ display: "flex", flexDirection: "row", gap: "50px" }}
              >
                <Field>
                  <div>Active Date</div>
                  <div>
                    {currentUser.subscription
                      ? currentUser.subscription.startDate
                      : "-"}
                  </div>
                </Field>
                {currentUser.subscription ? (
                  <Field>
                    <div>Subcription</div>
                    <div>ACTIVE</div>
                  </Field>
                ) : (
                  <Field>
                    <div style={{ width: "100%", textAlign: "left", fontStyle: "italic"}}>
                    { (!plan || plan === "One month") && <span style={{width: "100%"}}>SUBSCRIBE !</span>} 
                    { plan === "Six months" && <span style={{width: "100%"}}>GET 1 MONTH FOR FREE !</span>}
                    { plan === "One year" && <span style={{width: "100%"}}>GET 3 MONTHS FOR FREE !</span>}
                    </div>
                  </Field>
                )}
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "50px" }}
              >
                <Field>
                  <div>Finish Date</div>
                  <div>
                    {currentUser?.subscription
                      ? currentUser.subscription.finishDate
                      : "-"}
                  </div>
                </Field>
                {currentUser.subscription ? (
                  <Field>
                    <div>Plan</div>
                    <div>{currentUser?.subscription?.plan}</div>
                  </Field>
                ) : ( 
                  <Field>
                    <div>
                      <PlanSelect onChange={(e) => handlePlan(e)}>
                        <option hidden value="Select Plan">
                          {currentUser?.subscription?.plan
                            ? currentUser.subscription.plan
                            : "Select Plan"}
                        </option>
                        <option value="One month">One Month USD$ 6.99</option>
                        <option value="Six months">Six Months USD$ 34.99</option>
                        <option value="One year">One Year USD$ 62.99</option>
                      </PlanSelect>
                    </div>
                  </Field>
                )}
              </div>
            </InfoContainer>
            <div style={{ height: "80px", paddingTop: "2px", width: "270px" }}>
              <PaypalButton
                editSubscription={editSubscription}
                plan={plan}
                currentUser={currentUser}
                key={plan}
                showButton={showButton}
                style={paypalStyle}
              />
            </div>
          </SubscriptionOptions>
          <div
            name="butons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ButtonDisable
              onClick={() => logout({ returnTo: window.location.origin })}
              ancho="220px"
              color="red"
            >
              Logout
            </ButtonDisable>
            <ButtonDisable
              type="button"
              onClick={(e) => handleDisable(e)}
              ancho="220px"
              color="red"
            >
              {currentUser?.active ? "Disable Account" : "Activate Account"}
            </ButtonDisable>
          </div>
        </AccoutContainer>
      ) : (
        <div style={{ paddingTop: "200px", paddingLeft: "180px" }}>
          <H3Form>LOADING...</H3Form>
        </div>
      )}
    </>
  );
}
