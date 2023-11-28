import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
import { CiStar } from "react-icons/ci";

const Payment = () => {
  return (
   <>
    <div className="bg-[#f0f7ff] lg:mx-20 mx-10 my-5 p-5 rounded-lg">
      <p className="text-3xl font-bold">Become a LifTime Pro Member</p>
      <div className="flex space-x-2">
        <p className="text-2xl">$199</p>
        <strike>$250</strike>
      </div>
      <p className="text-xl">
        Unlock exclusive features and elevate your experience by becoming a Pro
        Member on CrowdChoice. Enjoy advanced privileges, engage more deeply,
        and make your voice even more impactful!
      </p>
      <ul className="text-xl font-semibold space-y-2 space-x-5 mt-5">
            <li className="flex items-center ml-5"><CiStar /> Exclusive Survey Access</li>
            <li className="flex items-center"><CiStar />Add valueable commet in Survey</li>
            <li className="flex items-center"><CiStar />Influence in Community Decision-Making</li>
            <li className="flex items-center"><CiStar />Advanced Survey Insights</li>
            <li className="flex items-center"><CiStar />Special Rewards and Recognition</li>
            <li className="flex items-center"><CiStar />Early Access to Survey Results
        </li>
      </ul>
    </div>
    <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    </div>
   </>
  );
};

export default Payment;
