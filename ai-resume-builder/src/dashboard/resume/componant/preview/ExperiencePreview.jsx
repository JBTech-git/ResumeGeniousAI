
import React from 'react'

export default function ExperiencePreview({resumeInfo}) {
  // console.log(resumeInfo?.experience);
    return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{
        color:resumeInfo?.themeColor
      }}>Personal Experience</h2>
      <hr style={{borderColor:resumeInfo?.themeColor}}/>
        {resumeInfo?.experience.map((experience,index)=>(
          <div key={index} className='my-5'>
            <div className='flex justify-between'>
              <h2 className='text-sm font-bold'
              style={{color:resumeInfo?.themeColor}}
              >{experience?.company}</h2>
              <h2 className='text-sm'>{experience?.startDate} - {experience?.endDate} </h2>
            </div>
            <h2 className='text-sm'>{experience?.position} </h2>
            {/* <h2 className='text-xs flex justify-between'>{experience?.company},{experience?.startDate} </h2> */}
            <p className='text-xs my-2'>
              {experience?.responsibilities}
            </p>
          </div>
        ))}
    </div>
  )
}
