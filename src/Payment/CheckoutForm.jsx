import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";
import useAxios from "../hook/useAxios";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user, setUserRole } = useContext(AuthContest);
  const navigate = useNavigate();
  const totalPrice = 199;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log("Hello Client Secrect", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
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
      console.log("confirm error", confirmError.code);
      console.log("Error message:", confirmError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          name: user.displayName,
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          paymentDate: new Date(), // utc date convert. use moment js to
        };
        const res = await axiosSecure.post("/payment", payment);
        console.log("payment saved", res.data);
        if (res.data?.paymentResult?.insertedId) {
          toast.success("Thank you for the taka paisa");
          navigate("/dashboard/paymentHistory");
        }
        const updateInfo = { email: user.email, role: "prouser" };
        const resofUpdateRole = await axiosSecure.patch(
          "/updateRole",
          updateInfo
        );
        console.log("Updated User Role", resofUpdateRole.data);
        setUserRole("prouser");
      }
    }
  };

  return (
    <div className="w-[500px] bg-[#f0f7ff] rounded-md mx-auto  border-2 p-10">
      <p className="text-center font-bold text-3xl">Enter You Card Information</p>
      <form onSubmit={handleSubmit} className=" mt-10">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
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
        <div className="flex justify-center ">
          <button
            className=" btn px-10 bg-[#ff715b] my-4"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
