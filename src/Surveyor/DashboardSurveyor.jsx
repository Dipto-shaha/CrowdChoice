import { NavLink, Outlet } from "react-router-dom";

const DashboardSurveyor = () => {
    return (
        <div className="lg:flex bg-[#f0f7ff] lg:p-10 px-5 rounded-lg">
        <div className="flex lg:flex-col space-y-5 ">
          <NavLink to="/survyor/createSurvey" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""} >Create</NavLink>
          <NavLink to="/survyor/SurveyList" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}>SurveyList</NavLink>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <Outlet></Outlet>
      </div>
    );
};

export default DashboardSurveyor;