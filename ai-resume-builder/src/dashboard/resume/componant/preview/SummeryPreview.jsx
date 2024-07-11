import React from 'react'

export default function SummeryPreview({resumeInfo}) {
  return (
    <div className='text-xs'>
        {resumeInfo?.summary}
    </div>
  )
}
