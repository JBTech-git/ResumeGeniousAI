// import axios from "axios";

// const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
// const axiosClinte=axios.create({
//     baseURL:'http://localhost:1337/api/',
//     headers:{
//         'Content-Type':'application/json',
//         'Authorization':`Bearer ${API_KEY}`
//     }
// })

// const createNewResume =(data)=> axiosClinte.post('/user-resumes',(data));

// const getUserResume = (userEmail)=>axiosClinte.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

// const UpdateResumeDetails = (id,data)=>axiosClinte.put('/user-resumes/'+id,data);

// export default{
//     createNewResume,
//     getUserResume,
//     UpdateResumeDetails
// };

import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8088/', // Point to your Node.js backend
    headers: {
        'Content-Type': 'application/json'
    }
});

const createNewResume = (data) => axiosClient.post('/user-resumes', data);

const getUserResume = (userEmail) => axiosClient.get('/user-resumes?userEmail=' + userEmail);

// const updateResumeDetails = (id, data) => axiosClient.put('/user-resumes/' + id, data);
const updateResumeDetails = (documentId, data) => axiosClient.put('/user-resumes/'+documentId, data);
const getResumeById = (document_id) => axiosClient.get('/user-resumes/' + document_id);
const createNewInformation = (data) => axiosClient.post('/user-information', data);
const getInformationByID = (document_id) => axiosClient.get('/user-information/' + document_id);
const createNewSummary = (data) => axiosClient.post('/user-summary', data);
const getSummeryByID = (document_id) => axiosClient.get('/user-summary/' + document_id);
const updateSummeryDetails =(documentId, data) => axiosClient.put('/user-summaryupdate/'+documentId, data);

// Education api 
const createNewExperience = (data) => axiosClient.post('/user-experience', { data });
const getExperienceByDocumentId = (documentId) => axiosClient.get('/user-experience/' + documentId);
// const updateExperience = (id, data) => axiosClient.put('/user-experience/' + id, data);
const updateExperience = (id, data) => {
    console.log('Updating Experience with data:', data);
    return axiosClient.put(`/user-experience/${id}`, { data });
};

export default {
    createNewResume,
    getUserResume,
    updateResumeDetails,
    getResumeById,
    createNewInformation,
    getInformationByID,
    createNewSummary,
    getSummeryByID,
    updateSummeryDetails,

    createNewExperience,
    getExperienceByDocumentId,
    updateExperience
};
