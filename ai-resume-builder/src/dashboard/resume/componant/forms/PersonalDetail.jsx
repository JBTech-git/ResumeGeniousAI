import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function PersonalDetail({enableNext}) {

  const params = useParams();
  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);

  const [formData, setFormData]= useState();
  
  const [loading, setLoading]= useState(false);

  useEffect(()=>{
    console.log(params);
  },[])
  const handleInputChange=(e)=>{
    enableNext(false);
    const {name,value}=e.target;

    setFormData({
      ...formData,
      [name]:value
    })

    setResumeInfo({
      ...resumeInfo,
      [name]:value
    })
  }

  const onSave=(e)=>{
    e.preventDefault();
    setLoading(true);

    const data= {
      data:formData
    }

    console.log('Saving data:', data);  // Debugging lin

    GlobalApi.UpdateResumeDetails(params?.resumeId,data).then(res=>{
      console.log('Response from server:', res);
      // enableNext(true);
      // setLoading(false);
      if (res.status === 200) {
        console.log('Data saved successfully');
        enableNext(true);
      } else {
        console.log('Failed to save data:', res);
      }
      setLoading(false);
      toast("Detail Updated!");
    },(err)=>{
      console.error('Error:', err); 
      setLoading(false);
    })
    
  }

  return (
    <div className='p-5 shadow-lg rounded border-2 border-t-primary'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
     <p>Get Started with the basic information</p>

     <form onSubmit={onSave} action="">
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input type="text" className="rounded" name="firstName" value={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input type="text" className="rounded" name="lastName" value={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input type="text" className="rounded" name="jobTitle" value={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input type="text" className="rounded" name="address" value={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input type="text" className="rounded" name="phone" value={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input type="email" className="rounded" name="email" value={resumeInfo?.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button size="sm" className="rounded" type="submit" disabled={loading}>
            {loading ? <LoaderIcon className='animate-spin' />:'Save'}
          </Button>
        </div>
     </form>
    </div>
  )
}
