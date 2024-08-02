import React, { useEffect, useState, useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { toast } from 'sonner';
import { useParams } from "react-router-dom";


const formField = {
  company: "",
  position: "",
  city: "",
  state: "",
  start_date: "",
  end_date: "",
  responsibilities: "",
};

export default function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  console.log(params.resumeId);

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
 console.log('get for experience'+ resumeInfo.position);
  const handleChange = (index, e) => {
    const newExperienceList = experienceList.slice();
    const {name,value}=e.target;
    newExperienceList[index][name]=value;
    setExperienceList(newExperienceList);
  };


  const handleRcichTextEdit=(e,name,index)=>{
    const newExperienceList = experienceList.slice();
    newExperienceList[index][name]=e.target.value;
    setExperienceList(newExperienceList);
  }


  const AddNewExperience=()=>{
    // setExperienceList([...experienceList, formField])
    setExperienceList([...experienceList, { formField }]);
  }

  const removeExperience=()=>{
    setExperienceList(experienceList=>experienceList.slice(0,-1))
  }

  const saveExperience = async () => {
    
    try {
      console.log('Saving Experience:', experienceList);
      for (const experience of experienceList) {
        console.log('show exiting experience--'+experience.exp_id);
        
        if (experience.exp_id) {
          await GlobalApi.updateExperience(experience.exp_id, { ...experience, document_id: params.resumeId });
          // await GlobalApi.updateExperience(experience.document_id, experience);
        } else {
          await GlobalApi.createNewExperience({ ...experience, documentId: params.resumeId });
        }
        // await GlobalApi.createNewExperience({ ...experience, documentId: params.resumeId });
      }
      // alert('Experience saved successfully');
      toast("Experience saved successfully!");
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await GlobalApi.getExperienceByDocumentId(params.resumeId);
      setExperienceList(response.data.data); // Assuming the response structure
    } catch (error) {
      console.error('Error fetching experience:', error);
    }
  };

  useEffect(() => {
    fetchExperience(); // Fetch experience data when component mounts
  }, []);
  
  useEffect(()=>{
// console.log(experienceList);
  setResumeInfo({
    ...resumeInfo,
    experience: experienceList
  })
  },[experienceList]);

  return (
    <>
      <div className="p-5 shadow-lg rounded border-2 border-t-primary">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous Job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    className="rounded"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    className="rounded"
                    name="company"
                    value={item.company}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    className="rounded"
                    name="city"
                    value={item.city}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    className="rounded"
                    name="state"
                    value={item.state}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    className="rounded"
                    name="start_date"
                    value={item.start_date}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    className="rounded"
                    name="end_date"
                    value={item.end_date}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2 text-xs">
                <RichTextEditor
                value={item.responsibilities}
                index={index}
                onRichTextChange={(e)=>handleRcichTextEdit(e,'responsibilities',index)}
                 className="border border-gray-900"/>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">

            <div className="flex gap-2">
            <Button variant="outline" className="text-primary rounded"
            onClick={AddNewExperience}>
              + Add More Experience
            </Button>
            { experienceList.length > 1 &&
            <Button variant="outline" className="text-primary rounded"
            onClick={removeExperience}>
             -Remove
            </Button>
             }
            </div>
            
            <Button className="rounded text-white" onClick={saveExperience}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}
