import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NewIsuueBtn from "./NewIsuueBtn";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const navigate=useNavigate();

  const issue = useSelector((state) =>
    state.issuesSliceReducer.issuesdetailsSlice.issuesByProject[projectId]?.find(
      (issue) => issue.id === parseInt(issueId)
    )
  );

  

  return (
    <div className="bg-slate-900 h-screen p-6 text-white">
        <div className="mx-auto max-w-3xl">
      <button onClick={() => navigate(`/issuelist/${projectId}`)} className="hover:underline flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
        </svg>
        <span>Back to Issues</span>
      </button>

      <div className="mt-5">
        <div className="flex justify-between items-center gap-2 ">

<div>
      <p className=" font-semibold text-2xl">{issue.title}</p>
     
        <p className="text-gray-500 text-2xl">#{issue.id}</p>
        </div>

        <div>
        <NewIsuueBtn/>
        </div>
        </div>

        <p className="mt-2 text-gray-300 min-h-[150px] w-full border border-blue-900 rounded-lg ">
        <p className=" font-semibold bg-slate-800 rounded-t-lg border-b border-blue-900 p-2">{issue.assignees || "No One"}</p>
        <span className="p-2 ">{issue.description}</span></p>
      </div>
    </div>
    </div>
  );
};

export default IssueDetails;
