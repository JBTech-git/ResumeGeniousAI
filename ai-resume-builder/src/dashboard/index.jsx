import React, { useEffect, useState } from "react";
import AddResume from "./componants/AddResume";
import GlobalApi from "../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./componants/ResumeCardItem";

export default function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList]= useState([]);

  useEffect(() => {
    user && getResumeList();
  }, [user]);

  const getResumeList = () => {
    GlobalApi.getUserResume(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
      }
    );
  };
  return (
    <div className="p-10 md:px20 lgpx32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI Resume to your next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />
        {resumeList.length>0 && resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
}
