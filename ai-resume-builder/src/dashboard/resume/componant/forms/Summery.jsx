// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import GlobalApi from "../../../../../service/GlobalApi";
// import { Brain, LoaderIcon } from "lucide-react";
// import { toast } from 'sonner'
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AIChatSession } from "../../../../../service/AiModal";
// // import { json } from "stream/consumers";


// // const promt = "Job Title: {jobtitile}, Depends on job title give me summary for my resume within 4-5 lines in json format with field experience level and summery with experience lavel for fresher, mid level and experienced"
// const promt ="Generate a JSON output containing summaries for a {jobtitile} resume, categorized by experience level (Entry Level, Mid-Level, Senior Level). Each summary should be within 4-5 lines."
// export default function Summery({ enableNext }) {
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   console.log('summery info--'+resumeInfo.sammery);
//   const [summary, setsummary] = useState();
//   const [loading, setLoading] = useState(false);
//   const params = useParams();

//   const [aiGenerateSummary, setAIGenerateSummary] = useState();

//   useEffect(() => {
//     summary &&
//       setResumeInfo({
//         ...resumeInfo,
//         summary: summary,
//       });
//   }, [summary]);

//   const fetchSummary = async (documentId) => {
//     setLoading(true);
//     try {
//       const res = await GlobalApi.getSummeryByID(documentId);
//       console.log("Fetched summary:", res.data);
//       setsummary(res.data.summary); // Update the state with the fetched summary
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const GenerateSummaryFormAI=async()=>{
//     setLoading(true);
//     const PROMT= promt.replace('{jobtitile}',resumeInfo?.jobTitle);
//     console.log("this is promt-"+PROMT);
//     // const result=await AIChatSession.sendMessage(PROMT);
//     // console.log("result promt-"+JSON.parse([result.response.text()]));
//     // setAIGenerateSummary(JSON.parse(result.response.text()))

//     try {
//         const result = await AIChatSession.sendMessage(PROMT);
//         const parsedResult = JSON.parse(result.response.text());
//         console.log("Result prompt: ", parsedResult);
//         setAIGenerateSummary(parsedResult); // Assuming the JSON contains a summary field
//       } catch (error) {
//         console.error("Error generating summary from AI:", error);
//         toast.error("Failed to generate summary from AI");
//       }
//     setLoading(false);
//   }
//   const onSave = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // const data = {
//     //   data: {
//     //     summary: summary,
//     //   },
//     // };
//     const data = {
//       data: {
//         documentId: params.resumeId,
//         summary: summary,
//       },
//     };

//     console.log("Saving data:", data); // Debugging lin

//     GlobalApi.createNewSummary(data).then(
//       (res) => {
//         console.log("Response from server:", res);
//         // enableNext(true);
//         // setLoading(false);
//         if (res.status === 200) {
//           console.log("Data saved successfully");
//           enableNext(true);
//         } else {
//           console.log("Failed to save data:", res);
//         }
//         setLoading(false);
//         toast("Summery Updated!");
//         fetchSummary(params.resumeId);
//       },
//       (err) => {
//         console.error("Error:", err);
//         setLoading(false);
//       }
//     );
//   };
//   return (
//     <>
//       <div className="p-5 shadow-lg rounded border-2 border-t-primary">
//         <h2 className="font-bold text-lg">summary Detail</h2>
//         <p>Get Started with the summary information</p>

//         <form className="mt-7" onSubmit={onSave}>
//           <div className="flex justify-between items-end">
//             <label>Add summary</label>
//             <Button
//               variant="outline"
//               size="sm"
//               type="button"
//               className="rounded border border-primary text-primary flex gap-2"
//               onClick={()=>GenerateSummaryFormAI()}
//             >
//                 <Brain className="h-4 w-4"/>
//               Generate from AI
//             </Button>
//           </div>
//           <Textarea
//             className="mt-5 rounded"
//             onChange={(e) => setsummary(e.target.value)}
//             value={summary}
//             required
//           />

//           <div className="mt-2 flex justify-end">
//             <Button
//               size="sm"
//               className="rounded"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
//             </Button>
//           </div>
//         </form>

//         {aiGenerateSummary && (
//         <div>
//           <h2 className="font-bold text-lg">Suggestions</h2>
//           {Object.keys(aiGenerateSummary).map((level) => (
//             <div key={level}>
//               <h3>{level}</h3>
//               <p className="text-sm">{aiGenerateSummary[level]}</p>
//             </div>
//           ))}
//         </div>
//       )}
//       </div>

//     </>
//   );
// }


import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderIcon } from "lucide-react";
import { toast } from 'sonner';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AIChatSession } from "../../../../../service/AiModal";

const promt = "Generate a JSON output containing summaries for a {jobtitile} resume, categorized by experience level (Entry Level, Mid-Level, Senior Level). Each summary should be within 4-5 lines.";

export default function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [isNew, setIsNew] = useState(true);

  const [aiGenerateSummary, setAIGenerateSummary] = useState(null);

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  useEffect(() => {
    fetchSummary(params.resumeId);
  }, [params.resumeId]);

  const fetchSummary = async (documentId) => {
    setLoading(true);
    try {
      const res = await GlobalApi.getSummeryByID(documentId);
      if (res.data) {
        console.log("Fetched summary:", res.data);
        setSummary(res.data.summery); // Update the state with the fetched summary
        setIsNew(false); // Set isNew to false because a summary exists
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // No summary found, means it's new
        setIsNew(true);
      } else {
        console.error("Error fetching summary:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const GenerateSummaryFormAI = async () => {
    setLoading(true);
    const PROMT = promt.replace('{jobtitile}', resumeInfo?.jobTitle);
    console.log("this is promt-" + PROMT);

    try {
      const result = await AIChatSession.sendMessage(PROMT);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      console.log("Result prompt: ", parsedResult);
      setAIGenerateSummary(parsedResult); // Assuming the JSON contains a summary field
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast.error("Failed to generate summary from AI");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        documentId: params.resumeId,
        summary: summary,
      },
    };

    console.log("Saving data:", data); // Debugging line
    const apiCall = isNew ? GlobalApi.createNewSummary(data) : GlobalApi.updateSummeryDetails(params.resumeId, data);

    apiCall.then(
      (res) => {
        console.log("Response from server:", res);
        if (res.status === 200 || res.status === 201) {
          console.log("Data saved successfully");
          enableNext(true);
          setIsNew(false); // Ensure that the next save will update the existing summary
          fetchSummary(params.resumeId); // Fetch the updated summary
          toast("Summary updated successfully!");
        } else {
          console.log("Unexpected status code:", res.status);
        }
        setLoading(false);
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
        <h2 className="font-bold text-lg">Summary Detail</h2>
        <p>Get Started with the summary information</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="rounded border border-primary text-primary flex gap-2"
              onClick={GenerateSummaryFormAI}
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5 rounded"
            onChange={(e) => setSummary(e.target.value)}
            value={summary} // Make sure the Textarea displays the current summary
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
