import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
   <>
    <div>
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
      <ul>
            <li>Exclusive Survey Access</li>
            <li>Add valueable commet in Survey</li>
            <li>Influence in Community Decision-Making</li>
            <li>Advanced Survey Insights</li>
            <li>Special Rewards and Recognition</li>
            <li>Early Access to Survey Results
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
