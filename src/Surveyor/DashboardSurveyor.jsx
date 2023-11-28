import { NavLink, Outlet } from "react-router-dom";

const DashboardSurveyor = () => {
    return (
        <div className="flex bg-[#f0f7ff] lg:p-10 px-5 rounded-lg">
        <div className="flex flex-col space-y-5 ">
          <NavLink to="/survyor/createSurvey" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""} >Create a Survey</NavLink>
          <NavLink to="/survyor/unPblishedSurvey" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}>UnPublished Survey</NavLink>
          <NavLink to="/admin/surveyStaus" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}>Servey Staus</NavLink>
          <NavLink to="//Servey" className={({ isActive }) =>  isActive ? "text-[#ff715b] font-bold underline  underline-offset-4":""}></NavLink>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <Outlet></Outlet>
      </div>
    );
};

export default DashboardSurveyor;