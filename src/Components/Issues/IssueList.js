import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DeleteIssue } from "../../Redux/Slices/Issue/IssuesSlice";

const IssueList = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  
  const issueslist = useSelector(
    (state) =>
      state.issuesSliceReducer.issuesdetailsSlice.issuesByProject[projectId] ||
      []
  );

  // console.log("issueslist:", issueslist);

  const [menuId, setMenuId] = useState(null);

  const handleDeleteIssue = (issueId) => {
    dispatch(DeleteIssue({ projectId, issueId }));
  };

  return (
    <div className="bg-slate-900 h-screen">
      <main className="mx-auto max-w-3xl pt-10">
        <header>
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search Issues"
              className="w-full max-w-md px-4 py-2 rounded-md text-white bg-slate-900 border border-gray-700"
            />
            <Link
              to={`/createissue/${projectId}`}
              className="bg-green-700 flex gap-1 text-white px-4 py-2 rounded-md"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
                  />
                </svg>
              </div>
              <p className="font-semibold">New Issue</p>
            </Link>
          </div>
        </header>

        <div className="mt-5 space-y-4">
          {Array.isArray(issueslist) && issueslist.length > 0 ? (
            issueslist.map((issue) => (
              <div
                key={issue.id}
                className="flex justify-between items-center p-3 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <button className="hover:underline">{issue.title}</button>

                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuId(menuId === issue.id ? null : issue.id)
                    }
                    className="hover:bg-gray-700 px-2 py-1 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-400"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M117.333 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32m341.333 0c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32M288 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32"
                      />
                    </svg>
                  </button>

                  {menuId === issue.id && (
                    <div className="absolute z-10 left-2 right-0 mt-1 w-40 border border-gray-700 bg-gray-800 text-white shadow-lg rounded-lg py-[6px]">
                      <button
                        className="flex items-center space-x-1 px-2 py-1 text-white w-full"
                        onClick={() => handleDeleteIssue(issue.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                          />
                        </svg>
                        <p>Delete Issue</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No issues found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default IssueList;
