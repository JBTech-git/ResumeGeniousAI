import axios from "axios";

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClinte=axios.create({
    baseURL:'http://localhost:1337/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

const createNewResume =(data)=> axiosClinte.post('/user-resumes',(data));

const getUserResume = (userEmail)=>axiosClinte.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetails = (id,data)=>axiosClinte.put('/user-resumes/'+id,data);

export default{
    createNewResume,
    getUserResume,
    UpdateResumeDetails
};