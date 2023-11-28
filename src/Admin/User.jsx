import useUserList from "../hook/useUserList";
import useAxios from "../hook/useAxios";
//import { useState } from "react";

const User = () => {
  const [userList, loading, refetch] = useUserList();
  //const [selectedRole, setSelectedRole] = useState("all");
  const axios = useAxios();
  const handleChangeRole = (email, role) => {
    console.log(email);
    let updateInfo;
    if (role) updateInfo = { email, role: "admin" };
    else updateInfo = { email, role: "surveyor" };
    console.log(updateInfo);
    axios.patch("/updateRole", updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  // const filtered = userList.filter((survey) =>
  //   selectedRole === "all" ? true : survey.role === selectedRole
  // );
  // const handleRoleChange = (role) => {
  //   setSelectedRole(role);
  // };
  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden">
        <p className="text-3xl font-bold text-center my-5">User List</p>
        <table className="table border border-[#7ec6d5] rounded-xl">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>
                Role
                {/* <select
                  className="text-xl font-bold border-2 p-2"
                  onChange={(e) => handleRoleChange(e.target.value)}
                  value={selectedRole}
                >
                  <option value="all">All</option>
                  <option value="user">User</option>
                  <option value="prouser">Prouser</option>
                  <option value="admin">Admin</option>
                  <option value="surveyor">Surveyor</option>
                </select> */}
              </th>
              <th>Change Role</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {/* row 2 */}
              {userList.result.map((item, index) => {
                return (
                  <tr className="hover" key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    {(item.role == "user" || item.role == "prouser") && (
                      <td className="flex">
                        {item.role != "admin" && (
                          <button
                            className="btn bg-[#7ec6d5] mr-5"
                            onClick={() => handleChangeRole(item.email, true)}
                          >
                            Make Admin
                          </button>
                        )}
                        {item.role != "surveyor" && (
                          <button
                            className="btn  bg-[#ff715b]"
                            onClick={() => handleChangeRole(item.email, false)}
                          >
                            Make Surveyor
                          </button>
                        )}
                      </td>
                    )}
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

export default User;
