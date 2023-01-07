import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, us } from "react-redux";
import { activateSubscription } from "../redux/actions";
import { useEffect, useRef } from "react";

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

export default function PaypalButton({ currentUser, plan }) {
  const dispatch = useDispatch();
  let planId;
  let userId;

  useEffect(() => {
    if (currentUser) {
      //      userId = useRef(currentUser.id);
    }
  }, [currentUser]);

  console.log("Despues del useEffect id:", userId);

  switch (plan) {
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
  }

  function onApprove(actions) {
    console.log("Entre al onApprove");

    console.log("Pasé el dispatch");
    console.log("currentUser: ", currentUser);
    return dispatch(activateSubscription(userId, plan));
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        vault: true,
      }}
    >
      <PayPalButtons
        style={{
          //shape: "pill",
          color: "silver",
          layout: "vertical",
          label: "subscribe",
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
          });
        }}
        onApprove={(actions) => onApprove()}
      />
    </PayPalScriptProvider>
  );
}

/* actions.subscription.capture().then((details) => {
  const name = details.payer.name.given_name;
  alert(`Transaction completed by ${name}`);
}); */
