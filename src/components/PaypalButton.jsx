import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { activateSubscription } from "../redux/actions";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

export default function PaypalButton({
  editSubscription,
  plan,
  currentUser,
  showButton,
  style,
}) {
  const dispatch = useDispatch();

  let planId;
  let userId;

  useEffect(() => {
    if (currentUser) {
      //      userId = useRef(currentUser.id);
    }
  }, [currentUser]);

  console.log("Despues del useEffect id:", userId);

  const [approbed, setApprobed] = useState(false);

  if (currentUser) {
    userId = currentUser.id;
  }

  useEffect(() => {
    if (approbed) {
      dispatch(activateSubscription(userId, plan));

      editSubscription(true);
    }
  }, [approbed]);

  switch (plan) {
    case "One month":
      planId = "P-2PL80688UB598204XMO5MNCY";
      break;
    case "Six months":
      planId = "P-2GJ229938D8300714MO5MSLA";
      break;
    case "One year":
      planId = "P-2J431877G3035035PMO5MS4Y";
      break;
    default:
      break;
  }

  return (
    <PaypalContainer showButton={showButton}>
      <PayPalScriptProvider
        options={{
          "client-id": REACT_APP_PAYPAL_CLIENT_ID,
          currency: "USD",
          vault: true,
        }}
      >
        <PayPalButtons
          style={style}
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          }}
          onApprove={(data, actions) => {
            setApprobed(true);
            toast.success("You are now subscribed!", { position: "top-right" });
          }}
        />
      </PayPalScriptProvider>
    </PaypalContainer>
  );
}

const PaypalContainer = styled.div`
  visibility: ${({ showButton }) => (showButton ? "visible" : "collapse")};
  position: relative;
  z-index: 0;
`;

/* actions.subscription.capture().then((details) => {
  const name = details.payer.name.given_name;
  alert(`Transaction completed by ${name}`);
}); */

/* switch (plan) {
    case "One month":
      planId = "P-4BM16965TV4364835MO25WMQ";
      break;
    case "Six months":
      planId = "P-5KR316110V1111814MO26ERI";
      break;
    case "One year":
      planId = "P-5TM174603V808780KMO26GMY";
      break;
    default:
      break;
  } */
