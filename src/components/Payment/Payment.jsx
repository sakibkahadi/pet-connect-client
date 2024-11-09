import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from "./CheckoutFrom";

//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = ({ maxDonation, id, setRemaining }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutFrom
          setRemaining={setRemaining}
          id={id}
          maxDonation={maxDonation}
        ></CheckoutFrom>
      </Elements>
    </div>
  );
};

export default Payment;
