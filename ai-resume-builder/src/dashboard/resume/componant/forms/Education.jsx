import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formFild =   {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
}
export default function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([formFild]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, e) => {
    const newEducationList = educationList.slice();
    const {name,value}=e.target;
    newEducationList[index][name]=value;
    setEducationList(newEducationList)
  };

  const AddNewEducation=()=>{
    setEducationList([...educationList, {formFild}]);
  }
  const removeEducation=()=>{
    setEducationList(educationList=>educationList.slice(0,1));
  }
  const onSave=()=>{

  }

  useEffect(()=>{
    // console.log(experienceList);
      setResumeInfo({
        ...resumeInfo,
        education: educationList
      })
      },[educationList]);
    
  return (
    <>
      <div className="p-5 shadow-lg rounded border-2 border-t-primary">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your qualifications</p>

        {educationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded">
              <div>
                <label className="text-xs">Institution</label>
                <Input
                  className="rounded"
                  name="institution"
                  value={item.institution}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input
                  className="rounded"
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  className="rounded"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  className="rounded"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary rounded"
              onClick={AddNewEducation}
            >
              + Add More Education
            </Button>
            {educationList.length > 1 && (
              <Button
                variant="outline"
                className="text-primary rounded"
                onClick={removeEducation}
              >
                -Remove
              </Button>
            )}
          </div>
          <Button className="rounded text-white"
            type="submit"  disabled={loading} onClick={()=>onSave()}>
              {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
        </div>
      </div>
    </>
  );
}
