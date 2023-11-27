import { Outlet } from "react-router-dom";
import Navber from "./Navber";

const All = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navber></Navber>
      <div className="mb-10 mx-10">
        <Outlet></Outlet>
      </div>
      <div className="mt-auto text-center font-bold bg-[#f0f7ff] py-2">
        <p className="mt-5">
          Copyright © 2023 - All right reserved by CrowdChoice Ltd
        </p>
      </div>
    </div>
  );
};

export default All;
