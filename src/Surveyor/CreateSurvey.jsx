import  {DatePicker }from 'antd';
import { useContext, useState } from 'react';
import { AuthContest } from '../Context';
import { toast } from 'react-toastify';
import useAxios from '../hook/useAxios';
const { RangePicker } = DatePicker;
const CreateSurvey = () => {
    const axios = useAxios();
    const [ date ,setDate]=useState([]);
    const {user}=useContext(AuthContest);
    const handleSubmit = (e) => {
        e.preventDefault();
        const startDate= new Date(date[0]);
        const today = new Date();
        console.log(startDate,today)
        if( startDate < today)
        {
            toast.error("Sart Date can not excced current date ");
            return;
        }
        const form = new FormData(e.currentTarget);
        console.log(form);
        const email = user?.email;
        const title = form.get("title");
        const Category = form.get("Category");
        const description = form.get("description");
        const surveyPost ={name:user.displayName,email,title,Category,description,date};
        console.log(surveyPost);
        axios.post('/createSurvey',surveyPost)
        .then(res =>{
            console.log(res.data);
            toast.success("Survey Post Created Successfully");
        })

    }
    const onChange = ( dateString) => {
        console.log('Formatted Selected Time: ', dateString);
        setDate(dateString)
      };
    return (
        <div>
            <form onSubmit={handleSubmit}>
               <div>
                    <label>Survey Title</label>
                    <input type="text" name="title" required placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
               </div>
               <div>
                    <label >Survey Description</label>
                    <textarea className="textarea textarea-primary" required name ="description" placeholder="SUrvey Description"></textarea>
               </div>
               <div>
                <RangePicker required
                format="YYYY-MM-DD"
                onChange={onChange}
                />
               </div>
               <div>
                <p className="font-semibold block text-lg">Category Name</p>
                <select className="rounded-lg" name="Category" required>
                    <option value="" disabled selected>
                        Select a Category
                    </option>
                    <option value="Environment">Environment</option>
                    <option value="Politics">Politics</option>
                    <option value="Community Engagement">Community Engagement</option>
                    <option value="Health">Health</option>
                </select>
               </div>
               <button>Submit</button>
            </form>
        </div>
    );
};

export default CreateSurvey;