import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

export default function PaypalButton({ plan }) {
  let planId;

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
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
