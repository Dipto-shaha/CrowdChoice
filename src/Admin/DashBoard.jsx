import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex lg:flex-row flex-col bg-[#f0f7ff] lg:p-10 px-5 rounded-lg ">
      <div className="lg:flex  lg:flex-col flex-row  space-y-5 ">
        <NavLink to="/admin/user" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""} >UserList</NavLink>
        <NavLink to="/admin/paymentHistory" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}>Paymet History</NavLink>
        <NavLink to="/admin/surveyStaus" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}>Servey Staus</NavLink>
        <NavLink to="/admin/Servey" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}></NavLink>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <Outlet></Outlet>
    </div>
  );
};

export default DashBoard;
