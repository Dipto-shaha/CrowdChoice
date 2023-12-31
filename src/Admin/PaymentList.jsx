import { useEffect, useState } from "react";
import formatDate from "../utlity/timeFormate";
import useAxiosSecure from "../hook/useAxiosSecure";

const PaymentList = () => {
  const axiosPrvate = useAxiosSecure();
  const [paymentHistory, setpaymentHistory] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getInfo = async () => {
      const res = await axiosPrvate.get("/paymentHistory");
      console.log("Payment History", res.data);
      setpaymentHistory(res.data);
      setLoading(false);
    };
    getInfo();
  }, [axiosPrvate]);

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="text-3xl font-bold text-center my-5">Payment</div>
        <table className="table border border-[#7ec6d5] rounded-xl flex-grow">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>TransactionId</th>
              <th>Parchase Date</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {paymentHistory.result.map((item, index) => {
                return (
                  <tr className="hover" key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.price}</td>
                    <td>{item.transactionId}</td>
                    <td>{formatDate(item.paymentDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default PaymentList;
