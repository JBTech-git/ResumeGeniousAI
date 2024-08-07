import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';

export default function FormSection() {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext]= useState(false);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm"
        className='flex gap-2 rounded mb-4'><LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1 
          &&<Button size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex-1)}
           className="flex gap-2 rounded mb-4 text-white"><ArrowLeft/></Button>}
           <Button size="sm" className="flex gap-2 rounded mb-4 text-white"
           onClick={()=>setActiveFormIndex(activeFormIndex+1)}
           disabled={!enableNext}>Next 
            <ArrowRight/></Button>
        </div>
      </div>


         {/* Personal Details  */}
        {activeFormIndex == 1 ? <PersonalDetail enableNext={(v)=>setEnableNext(v)} />: 
        activeFormIndex == 2 ? <Summery enableNext={(v)=>setEnableNext(v)} /> 
        :activeFormIndex == 3 ? <Experience enableNext={(v)=>setEnableNext(v)} />
        // : null}
         :activeFormIndex == 4 ? <Education/> : null}
        {/* Summery  */}
        {}
        {/* Professional Expreience  */}
       
        {/* Educational  */}
        
        {/* Skils  */} 
       
    </div>
  )
}
