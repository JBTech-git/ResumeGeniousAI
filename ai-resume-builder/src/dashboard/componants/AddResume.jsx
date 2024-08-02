import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function AddResume() {

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle,setResumeTitle] = useState();
  const {user}=useUser();
  const [loading, setLoading]= useState(false)
  const navigation = useNavigate();

  const onCreate=()=>{
    setLoading(true);
    const uuid=uuidv4();
    console.log(resumeTitle, uuid);
 
    const data={
        data:{
            title: resumeTitle,
            resumeId:uuid,
            userEmail:user?.primaryEmailAddress.emailAddress,
            userName:user?.fullName
        }
    }
    GlobalApi.createNewResume(data).then(resp=>{
        console.log(resp);
        if(resp){
            setLoading(false);
            navigation('/dashboard/resume/'+uuid);
        }
    },(error)=>{
        setLoading(false);
    })
  }
  return (
    <div>
      <div
        className="p-14 py-24 border rounded items-center flex justify-center
         bg-gray-100 h-[280px]
         hover:scale-105 transition-all hover:shadow cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="bg-white rounded-sm">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add title for new Resume</p>
              <Input className="my-2 rounded" placeholder="Ex. Full Stack Resume"
              onChange={(e)=>setResumeTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                className="rounded"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button className="rounded" onClick={()=>onCreate()} disabled={!resumeTitle||loading}>
               {loading ? <Loader2 className="animate-spin"/>: 'Create'}</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
