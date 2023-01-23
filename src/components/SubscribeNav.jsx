import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import PaypalButton from "./PaypalButton";

import {
  SubscribeContainer,
  Nav,
  PlanSelectNav,
  H3NAV,
} from "../styles/SubscribeNav";
import { H3Field } from "../styles/EditUser";
import { H3Form } from "../styles/CreateBook";

export default function SubscribeNav({ setSubscribe }) {
  const dispatch = useDispatch();

  const { user } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);

  const [plan, setPlan] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [close, setClose] = useState(false);
  const [subscription, setSubscription] = useState(false);

  const paypalStyle = {
    shape: "rect",
    color: "gold",
    layout: "horizontal",
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
  }, [dispatch]);

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
    }
  }, [currentUser, subscription]);

  function editSubscription(value) {
    setSubscription(value);
  }

  function handlePlan(e) {
    e.preventDefault();

    setPlan(e.target.value);
    setShowButton(true);
  }

  function handleClose(e) {
    e.preventDefault();

    if(setSubscribe) {
      setSubscribe(false);
    }
    setClose(true);
  }

  return currentUser && !currentUser.subscription && !close ? (
    <SubscribeContainer>
      <Nav>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <H3NAV>SUBSCRIBE AND START READING</H3NAV>
        </div>
        <div
          style={{
            height: "40px",
            width: "170px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <H3NAV>{plan === "Six months" && "*1 Months For Free"}</H3NAV>
          <H3NAV>{plan === "One year" && "*3 Months For Free"}</H3NAV>
        </div>
        <PlanSelectNav onChange={(e) => handlePlan(e)}>
          <option hidden value="Select Plan">
            Select Plan
          </option>
          <option value="One month">One Month USD$ 6.99</option>
          <option value="Six months">Six Months USD$ 34.99</option>
          <option value="One year">One Year USD$ 62.99</option>
        </PlanSelectNav>
        <div style={{ height: "36px", width: "200px" }}>
          <PaypalButton
            editSubscription={editSubscription}
            plan={plan}
            currentUser={currentUser}
            key={plan}
            showButton={showButton}
            style={paypalStyle}
          />
        </div>
        <div
          style={{ height: "36px", cursor: "pointer", color: "white"}}
          onClick={(e) => handleClose(e)}
        >
          x
        </div>
      </Nav>
    </SubscribeContainer>
  ) : (
    <></>
  );
}
