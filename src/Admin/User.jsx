import useUserList from '../hook/useUserList';
import useAxios from '../hook/useAxios';

const User = () => {
    const [userList,loading,refetch]= useUserList();
    const axios = useAxios();
    // useEffect(()=>{
    //     console.log(typeof refetch);
    // },[])
    const handleChangeRole =(id, role)=>{
        console.log(id);
        let updateInfo;
        if(role)
           updateInfo={_id:id,role:'admin'};
        else updateInfo={_id:id,role:'surveyor'};
        axios.patch('/updateRole',updateInfo)
        .then(res=>{
              console.log(res.data);
              refetch();}
          );
        
    }
    return (
         <div className="overflow-x-auto overflow-y-hidden">
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
          {
            (!loading) && <tbody>
            {/* row 2 */}
            {userList.result.map((item,index) => {
              return (
                <tr className="hover" key={item._id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className='flex'>
                    {  item.role!='admin' && <button className="btn mr-5"onClick={()=>handleChangeRole(item._id,true)}>Make Admin</button>}
                    {  item.role!='surveyor' && <button className='btn' onClick={()=>handleChangeRole(item._id,false)}>Make Surveyor</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
          }
        </table>
      </div>
    );
};

export default User;