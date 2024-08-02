
import React from 'react'

export default function ExperiencePreview({resumeInfo}) {
  console.log(resumeInfo?.experience);

  const experiences = resumeInfo?.experience || [];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{
        color: resumeInfo?.themeColor
      }}>Personal Experience</h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <div key={index} className='my-5'>
            <div className='flex justify-between'>
              <h2 className='text-sm font-bold'
                style={{ color: resumeInfo?.themeColor }}
              >{experience?.position}</h2>
              <h2 className='text-sm'>{formatDate(experience?.start_date)} to {formatDate(experience?.end_date)}</h2>
            </div>
            <h2 className='text-xs font-semibold'>{experience?.company}, {experience?.city}, {experience?.state}</h2>
            <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experience?.responsibilities }} />
          </div>
        ))
      ) : (
        <p className='text-center text-xs'>No experience data available</p>
      )}
    </div>
  );
}



//   return (
  //   <div className='my-6'>
  //     <h2 className='text-center font-bold text-sm mb-2' style={{
  //       color:resumeInfo?.themeColor
  //     }}>Personal Experience</h2>
  //     <hr style={{borderColor:resumeInfo?.themeColor}}/>
  //       {resumeInfo?.experience.map((experience,index)=>(
  //         <div key={index} className='my-5'>
  //           <div className='flex justify-between'>
  //             <h2 className='text-sm font-bold'
  //             style={{color:resumeInfo?.themeColor}}
  //             >{experience?.position}</h2>
  //             <h2 className='text-sm'>{experience?.start_date} to {experience?.end_date} </h2>
  //           </div>
  //           <h2 className='text-xs font-semibold'>{experience?.company}, {experience.city}, {experience.state} </h2>
  //           {/* <h2 className='text-xs flex justify-between'>{experience?.company},{experience?.startDate} </h2> */}
  //           {/* <p className='text-xs my-2'>
  //             {experience?.responsibilities}
  //           </p> */}
  //           <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.responsibilities}} />
  //         </div>
  //       ))}
  //   </div>
  // )