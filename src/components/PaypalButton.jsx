import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { activateSubscription } from "../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

export default function PaypalButton({ plan, currentUser }) {
  const dispatch = useDispatch();
  let planId;

  const user = useSelector((state) => state.currentUser);
  console.log("User estado global: ", user);
  const [approbed, setApprobed] = useState(false);

  if (currentUser) {
    var userId = currentUser.id;
  }

  useEffect(() => {
    if (approbed) {
      dispatch(activateSubscription(userId, plan));
    }
  }, [approbed]);

  console.log("Despues del useEffect id:", userId);

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
        onApprove={(data, actions) => {
          console.log("subscriptionID:", data.subscriptionID);
          console.log("currentUser: ", user);
          setApprobed(true);
          console.log(approbed);
          //          return dispatch(activateSubscription(user.id, plan));
        }}
      />
    </PayPalScriptProvider>
  );
}

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
