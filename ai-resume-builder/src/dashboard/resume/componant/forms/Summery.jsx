import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderIcon } from "lucide-react";
import { toast } from 'sonner'
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AIChatSession } from "../../../../../service/AiModal";
// import { json } from "stream/consumers";


// const promt = "Job Title: {jobtitile}, Depends on job title give me summary for my resume within 4-5 lines in json format with field experience level and summery with experience lavel for fresher, mid level and experienced"
const promt ="Generate a JSON output containing summaries for a {jobtitile} resume, categorized by experience level (Entry Level, Mid-Level, Senior Level). Each summary should be within 4-5 lines."
export default function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setsummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const [aiGenerateSummary, setAIGenerateSummary] = useState();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummaryFormAI=async()=>{
    setLoading(true);
    const PROMT= promt.replace('{jobtitile}',resumeInfo?.jobTitle);
    console.log("this is promt-"+PROMT);
    // const result=await AIChatSession.sendMessage(PROMT);
    // console.log("result promt-"+JSON.parse([result.response.text()]));
    // setAIGenerateSummary(JSON.parse(result.response.text()))

    try {
        const result = await AIChatSession.sendMessage(PROMT);
        const parsedResult = JSON.parse(result.response.text());
        console.log("Result prompt: ", parsedResult);
        setAIGenerateSummary(parsedResult); // Assuming the JSON contains a summary field
      } catch (error) {
        console.error("Error generating summary from AI:", error);
        toast.error("Failed to generate summary from AI");
      }
    setLoading(false);
  }
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summary,
      },
    };

    console.log("Saving data:", data); // Debugging lin

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log("Response from server:", res);
        // enableNext(true);
        // setLoading(false);
        if (res.status === 200) {
          console.log("Data saved successfully");
          enableNext(true);
        } else {
          console.log("Failed to save data:", res);
        }
        setLoading(false);
        toast("Summery Updated!");
      },
      (err) => {
        console.error("Error:", err);
        setLoading(false);
      }
    );
  };
  return (
    <>
      <div className="p-5 shadow-lg rounded border-2 border-t-primary">
        <h2 className="font-bold text-lg">summary Detail</h2>
        <p>Get Started with the summary information</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="rounded border border-primary text-primary flex gap-2"
              onClick={()=>GenerateSummaryFormAI()}
            >
                <Brain className="h-4 w-4"/>
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5 rounded"
            onChange={(e) => setsummary(e.target.value)}
            required
          />

          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              className="rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>

        {aiGenerateSummary && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {Object.keys(aiGenerateSummary).map((level) => (
            <div key={level}>
              <h3>{level}</h3>
              <p className="text-sm">{aiGenerateSummary[level]}</p>
            </div>
          ))}
        </div>
      )}
      </div>

    </>
  );
}
