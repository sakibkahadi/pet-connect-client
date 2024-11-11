import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ maxDonation, id, setRemaining }) => {
  // console.log(setRemaining);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [donationAmount, setDonationAmount] = useState(0); // Default value 1
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (donationAmount >= 1 && donationAmount <= maxDonation) {
      axiosSecure
        .post("/create-payment-intent", { price: donationAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, donationAmount, maxDonation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user.email,
          price: donationAmount,
          transactionId: paymentIntent.id,
          date: new Date(),
          campaign: id,
        };
        console.log(payment);
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Thank you for the payment",
            showConfirmButton: false,
            timer: 1500,
          });
          setRemaining(maxDonation - donationAmount);
        }
      }
    }
  };

  const handleDonationChange = (e) => {
    const value = Math.max(1, Math.min(maxDonation, e.target.value));
    setDonationAmount(value);
  };

  return (
    <div className="max-w-lg  mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-indigo-600">
        Make a Donation
      </h2>
      <div className="space-y-4">
        <label
          htmlFor="donationAmount"
          className="block text-lg font-medium text-gray-700"
        >
          Donation Amount
        </label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleDonationChange}
          min="1"
          max={maxDonation}
          step="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg text-gray-800"
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="card"
          className="block text-lg font-medium text-gray-700"
        >
          Credit Card
        </label>
        <div className="border p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  backgroundColor: "#f5f5f5",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="space-y-4">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!stripe || !clientSecret}
          className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg disabled:opacity-50"
        >
          Donate ${donationAmount}
        </button>

        {transactionId && (
          <p className="text-green-600 text-center">
            Transaction successful! ID: {transactionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
