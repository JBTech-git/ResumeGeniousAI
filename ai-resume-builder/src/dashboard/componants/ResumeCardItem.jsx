import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ResumeCardItem({resume}) {
  console.log('ResumeCardItem resume:', resume);
  return (
  //  <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
  <Link to={`/dashboard/resume/${resume.resume_id}/edit`}>
    <div className='p-14 bg-gray-50 flex justify-center items-center h-[280px]
    border border-primary rounded ml-4
    hover:scale-105 transition-all hover:shadow-md shadow-primary'>
    <Notebook/>
    </div>
    <h2 className='text-center my-1'>{resume.title} </h2>
   </Link>
  )
}
