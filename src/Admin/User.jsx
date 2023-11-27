import useUserList from "../hook/useUserList";
import useAxios from "../hook/useAxios";

const User = () => {
  const [userList, loading, refetch] = useUserList();
  const axios = useAxios();
  // useEffect(()=>{
  //     console.log(typeof refetch);
  // },[])
  const handleChangeRole = (email, role) => {
    console.log(email);
    let updateInfo;
    if (role) updateInfo = { email, role: "admin" };
    else updateInfo = { email, role: "surveyor" };
    axios.patch("/updateRole", updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
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
              <th>Role</th>
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
                    <td className="flex">
                      {item.role != "admin" && (
                        <button
                          className="btn mr-5"
                          onClick={() => handleChangeRole(item.email, true)}
                        >
                          Make Admin
                        </button>
                      )}
                      {item.role != "surveyor" && (
                        <button
                          className="btn"
                          onClick={() => handleChangeRole(item.eamil, false)}
                        >
                          Make Surveyor
                        </button>
                      )}
                    </td>
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
