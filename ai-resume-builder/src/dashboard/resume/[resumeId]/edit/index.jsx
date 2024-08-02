import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../componant/FormSection";
import ResumePreview from "../../componant/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Dummy from "@/data/dummy";
import GlobalApi from "../../../../../service/GlobalApi"; // Import the API

export default function Edit() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo]= useState(null);

  useEffect(() => {
    // console.log("params value-"+params);
    console.log("params value-", { resumeId });
    // setResumeInfo(Dummy);
  }, [resumeId]);

  // useEffect(() => {
  //   if (resumeId) {
  //     GlobalApi.getInformationByID(resumeId).then(
  //       (resp) => {
  //         setResumeInfo(resp.data);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );

  //     GlobalApi.getSummeryByID(resumeId).then(
  //       (resp) => {
  //         setResumeInfo(resp.data);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }, [resumeId]);

  useEffect(() => {
    if (resumeId) {
      // Fetch data from both APIs
      Promise.all([
        GlobalApi.getInformationByID(resumeId),
        GlobalApi.getSummeryByID(resumeId),
        GlobalApi.getExperienceByDocumentId(resumeId),
      ]).then(
        ([infoResp, summaryResp, experienceResp]) => {
          // Merge the data from both responses
          const combinedData = {
            ...infoResp.data,
            summary: summaryResp.data.summery,
            experience: experienceResp.data.data,
          };
          setResumeInfo(combinedData);
        },
        (error) => {
          console.error("Error fetching resume information or summary:", error);
        }
      );
    }
  }, [resumeId]);

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
