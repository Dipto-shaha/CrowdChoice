import { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";

const PaymentList = () => {
        const axios = useAxios();
        const [paymentHistory,setpaymentHistory] = useState({});
        const [loading,setLoading]=useState(true);
        useEffect(()=>{
            const getInfo= async()=>
            {
                const res =await axios.get('/paymentHistory')
                console.log("Payment History",res.data);
                setpaymentHistory(res.data);
                setLoading(false);
            }
            getInfo();
        },[axios])

        return (
             <div className="overflow-x-auto overflow-y-hidden">
            <table className="table border border-[#7ec6d5] rounded-xl">
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
              {
                (!loading) && <tbody>
                {paymentHistory.result.map((item,index) => {
                  return (
                    <tr className="hover" key={item._id}>
                      <td>{index+1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.price}</td>
                      <td >{item.transactionId}</td>
                      <td>{item.paymentDate}</td>
                    </tr>
                  );
                })}
              </tbody>
              }
            </table>
          </div>);
};

export default PaymentList;