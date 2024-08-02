// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import React, { useContext, useEffect, useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { useParams } from 'react-router-dom'
// import GlobalApi from '../../../../../service/GlobalApi'
// import { LoaderIcon } from 'lucide-react'
// import { toast } from 'sonner'

// export default function PersonalDetail({enableNext}) {

//   const params = useParams();
//   const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
//   console.log(",,,,,,,,"+resumeInfo?.first_name);

//   const [formData, setFormData]= useState({});
  
//   const [loading, setLoading]= useState(false);

//   useEffect(()=>{
//     console.log(params);
//   },[])
//   const handleInputChange=(e)=>{
//     enableNext(false);
//     const {name,value}=e.target;

//     setFormData({
//       ...formData,
//       [name]:value
//     })

//     setResumeInfo({
//       ...resumeInfo,
//       [name]:value
//     })
//   }

//   const onSave=(e)=>{
//     e.preventDefault();
//     setLoading(true);

//     // const data= {
//     //   data:formData
//     // }

//     const data = {
//       data: {
//           documentId: params.resumeId, // Assuming `params.resumeId` holds the `documentId`
//           ...formData
//       }
//   };

//     console.log('Saving data:', data);  // Debugging lin

//     // GlobalApi.updateResumeDetails(params?.resumeId,data).then(res=>{
//     //   console.log('Response from server:', res);
//     //   // enableNext(true);
//     //   // setLoading(false);
//     //   if (res.status === 200) {
//     //     console.log('Data saved successfully');
//     //     enableNext(true);
//     //   } else {
//     //     console.log('Failed to save data:', res);
//     //   }
//     //   setLoading(false);
//     //   toast("Detail Updated!");
//     // },(err)=>{
//     //   console.error('Error:', err); 
//     //   setLoading(false);
//     // })

//     GlobalApi.createNewInformation(data).then(res => {
//       console.log('Response from server:', res);
//       if (res.status === 201) {
//         console.log('Data saved successfully');
//         enableNext(true);
//       } else {
//         console.log('Failed to save data:', res);
//       }
//       setLoading(false);
//       toast("Detail Updated!");
//     }).catch(err => {
//       console.error('Error:', err);
//       setLoading(false);
//     });
    
//   }

//   return (
//     <div className='p-5 shadow-lg rounded border-2 border-t-primary'>
//       <h2 className='font-bold text-lg'>Personal Detail</h2>
//      <p>Get Started with the basic information</p>

//      <form onSubmit={onSave} action="">
//         <div className='grid grid-cols-2 mt-5 gap-3'>
//           <div>
//             <label className='text-sm'>First Name</label>
//             <Input type="text" className="rounded" name="firstName" value={resumeInfo.first_name || ''} required onChange={handleInputChange} />
//           </div>
//           <div>
//             <label className='text-sm'>Last Name</label>
//             <Input type="text" className="rounded" name="lastName" value={resumeInfo?.last_name} required onChange={handleInputChange} />
//           </div>
//           <div className='col-span-2'>
//             <label className='text-sm'>Job Title</label>
//             <Input type="text" className="rounded" name="jobTitle" value={resumeInfo?.job_title} required onChange={handleInputChange} />
//           </div>
//           <div className='col-span-2'>
//             <label className='text-sm'>Address</label>
//             <Input type="text" className="rounded" name="address" value={resumeInfo?.address} required onChange={handleInputChange} />
//           </div>
//           <div>
//             <label className='text-sm'>Phone</label>
//             <Input type="text" className="rounded" name="phone" value={resumeInfo?.phone} required onChange={handleInputChange} />
//           </div>
//           <div>
//             <label className='text-sm'>Email</label>
//             <Input type="email" className="rounded" name="email" value={resumeInfo?.email} required onChange={handleInputChange} />
//           </div>
//         </div>
//         <div className='mt-3 flex justify-end'>
//           <Button size="sm" className="rounded" type="submit" disabled={loading}>
//             {loading ? <LoaderIcon className='animate-spin' />:'Save'}
//           </Button>
//         </div>
//      </form>
//     </div>
//   )
// }


import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function PersonalDetail({ enableNext }) {

    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // const doc = resumeInfo.document_id;
    // console.log(doc);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        console.log(params);
        // const docId = params.resumeId;
        if (params.resumeId) {
            GlobalApi.getInformationByID(params.resumeId).then(
                (resp) => {
                    if (resp.data) {
                        setFormData(resp.data);
                        setResumeInfo(resp.data);
                        setIsNew(false); // Mark as existing information
                    }
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, [params.resumeId]);
    const docId = params.resumeId;
    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                documentId: params.resumeId,
                ...formData
            }
        };

        console.log('Saving data:', data); // Debugging line

        const apiCall = isNew ? GlobalApi.createNewInformation(data) : GlobalApi.updateResumeDetails(docId, data);

        apiCall.then(res => {
            console.log('Response from server:', res);
            if (res.status === 200 || res.status === 201) {
                console.log('Data saved successfully');
                enableNext(true);
                toast("Detail Updated!");
            } else {
                console.log('Failed to save data:', res);
            }
            setLoading(false);
        }).catch(err => {
            console.error('Error:', err);
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded border-2 border-t-primary'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave} action="">
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input type="text" className="rounded" name="first_name" value={formData.first_name || ''} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input type="text" className="rounded" name="last_name" value={formData.last_name || ''} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input type="text" className="rounded" name="job_title" value={formData.job_title || ''} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input type="text" className="rounded" name="address" value={formData.address || ''} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input type="text" className="rounded" name="phone" value={formData.phone || ''} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input type="email" className="rounded" name="email" value={formData.email || ''} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button size="sm" className="rounded" type="submit" disabled={loading}>
                        {loading ? <LoaderIcon className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

