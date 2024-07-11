import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../componant/FormSection";
import ResumePreview from "../../componant/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Dummy from "@/data/dummy";

export default function Edit() {
  const params = useParams();
  const [resumeInfo, setResumeInfo]= useState();
  console.log(resumeInfo);
  useEffect(() => {
    // console.log(params);
    setResumeInfo(Dummy);
  }, []);
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
