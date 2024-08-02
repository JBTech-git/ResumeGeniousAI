import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
// import SkillsPreview from './preview/SkillsPreview';

export default function ResumePreview() {

    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] ml-4'
    style={{borderColor:resumeInfo?.themeColor}}>
        {/* Personal Details  */}
        <PersonalDetailPreview resumeInfo= {resumeInfo} />
        {/* Summery  */}
        <SummeryPreview resumeInfo={resumeInfo} />
        {/* Professional Expreience  */}
        <ExperiencePreview resumeInfo={resumeInfo} />
        {/* Educational  */}
        <EducationPreview resumeInfo={resumeInfo} />
        {/* Skils  */} 
        {/* <SkillsPreview resumeInfo={resumeInfo} /> */}
    </div>
  )
}
