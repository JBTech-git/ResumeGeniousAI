// import { Button } from "@/components/ui/button";
// import { Bot, Brain, BrainCircuit, LoaderIcon } from "lucide-react";
// import React, { useState, useContext } from "react";
// import Editor, {
//   BtnBold,
//   BtnClearFormatting,
//   BtnItalic,
//   BtnLink,
//   EditorProvider,
//   Toolbar,
// } from "react-simple-wysiwyg";
// import { AIChatSession } from "../../../../service/AiModal";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";

// const PROMPT =
//   "position title : {positionTitle} suggest a summery based on position title in 5 to 6 line for my {startDate} to {endDate} experience in resume, give me result in HTML format";

// export default function RichTextEditor({ onRichTextChange, index }) {
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const [value, setValue] = useState();
//   const [loading, setLoading] = useState(false);

//   const GenerateSummeryFormAi = async () => {
//     setLoading(true);
//     // const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].position);
//     const positionTitle = resumeInfo.experience[index].position;
//     const startDate = resumeInfo.experience[index].startDate;
//     const endDate = resumeInfo.experience[index].endDate;

//     const prompt = PROMPT.replace('{positionTitle}', positionTitle)
//                          .replace('{startDate}', startDate)
//                          .replace('{endDate}', endDate);
//     console.log("this is prompt-" + prompt);

//     try {
//         const result = await AIChatSession.sendMessage(prompt);
//         const responseText = await result.response.text();
//         const parsedResult = JSON.parse(responseText);
//         console.log('generate-' + responseText);
//         console.log('final- ' + parsedResult);

//         // Update the value with the AI-generated responsibilities
//         setValue(parsedResult.summary);
//     } catch (error) {
//         console.error('Error generating summary:', error);
//     } finally {
//         setLoading(false);
//     }
// };
//   return (
//     <>
//       <div className="flex justify-between">
//         <label className="text-xs mt-4">Summery</label>
//         <Button
//           variant="outline"
//           size="sm"
//           type="button"
//           title="AI Generate"
//           className="rounded-full border-0 text-primary flex p-1"
//           onClick={() => GenerateSummeryFormAi()}
//           disabled={loading}
//         >
//           {loading ? <LoaderIcon className="animate-spin" /> : <Bot className="" />}
//           {" "}
//         </Button>
//       </div>
//       <EditorProvider>
//         <Editor
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//             onRichTextChange(e);
//           }}
//         >
//           <Toolbar>
//             <BtnBold />
//             <BtnItalic />
//             <BtnLink />
//             <BtnClearFormatting />
//           </Toolbar>
//         </Editor>
//       </EditorProvider>
//     </>
//   );
// }

import { Button } from "@/components/ui/button";
import { Bot, LoaderIcon } from "lucide-react";
import React, { useState, useContext } from "react";
import Editor, {
  BtnBold,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../../service/AiModal";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const PROMPT =
  "position title : {positionTitle} suggest a responsibility based on position title in 5 to 6 lines for my {startDate} to {endDate} experience in resume, give me the result in HTML format";

export default function RichTextEditor({ onRichTextChange, index }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(resumeInfo?.responsibilities || ""); // Initialize with context responsibilities
  const [loading, setLoading] = useState(false);

  const generateResponsibility = async () => {
    setLoading(true);
    const positionTitle = resumeInfo.experience[index]?.position || "";
    const startDate = resumeInfo.experience[index]?.start_date || "";
    const endDate = resumeInfo.experience[index]?.end_date || "";

    const prompt = PROMPT.replace("{positionTitle}", positionTitle)
      .replace("{startDate}", startDate)
      .replace("{endDate}", endDate);
    console.log("This is prompt-" + prompt);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      console.log("Generate-" + responseText);
      console.log("Final- " + parsedResult);

      let responsibilitiesText = "";

      if (Array.isArray(parsedResult)) {
        const entry = parsedResult.find(item => item.positionTitle === positionTitle);
        if (entry && Array.isArray(entry.responsibilities)) {
          responsibilitiesText = entry.responsibilities.join('<br/>');
        } else {
          console.error('Unexpected AI response format:', parsedResult);
          return;
        }
      } else if (parsedResult.responsibilities) {
        if (Array.isArray(parsedResult.responsibilities)) {
          responsibilitiesText = parsedResult.responsibilities.join('<br/>');
        } else if (typeof parsedResult.responsibilities === 'string') {
          responsibilitiesText = parsedResult.responsibilities;
        }
      } else {
        const key = Object.keys(parsedResult)[0];
        const value = parsedResult[key];

        if (Array.isArray(value)) {
          responsibilitiesText = value.join('<br/>');
        } else if (typeof value === 'string') {
          responsibilitiesText = value;
        }
      }

      if (!responsibilitiesText) {
        console.error('Unexpected AI response format:', parsedResult);
        return;
      }

      setValue(responsibilitiesText);
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        experience: prevInfo.experience.map((exp, i) =>
          i === index ? { ...exp, responsibilities: responsibilitiesText } : exp
        )
      }));
    } catch (error) {
      console.error('Error generating responsibilities:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditorChange = (e) => {
    setValue(e.target.value);
    onRichTextChange(e);
    setResumeInfo({ ...resumeInfo, responsibilities: e.target.value });
  };

  return (
    <>
      <div className="flex justify-between">
        <label className="text-xs mt-4">responsibilities</label>
        <Button
          variant="outline"
          size="sm"
          type="button"
          title="AI Generate"
          className="rounded-full border-0 text-primary flex p-1"
          onClick={generateResponsibility}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <Bot className="" />
          )}{" "}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnLink />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </>
  );
}
