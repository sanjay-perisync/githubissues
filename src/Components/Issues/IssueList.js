import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DeleteIssue, updateIssue } from "../../Redux/Slices/Issue/IssuesSlice";
import NewIsuueBtn from "./NewIsuueBtn";

const IssueList = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const issueslist = useSelector(
    (state) => state.issuesSliceReducer.issuesdetailsSlice.issuesByProject[projectId] || []
  );

  const [menuId, setMenuId] = useState(null);
  const [editingIssue, setEditingIssue] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssignee, setEditAssignee] = useState("");
  const [search, setSearch] = useState("");


  const handleDeleteIssue = (issueId) => {
    dispatch(DeleteIssue({ projectId, issueId }));
  };

  const handleEditIssue = (issue) => {
    setEditingIssue(issue.id);
    setEditTitle(issue.title);
    setEditDescription(issue.description || "");
    setEditAssignee(issue.assignees);
    setMenuId(null);
  };

  const handleSaveEdit = () => {
    if (editingIssue) {
      dispatch(updateIssue({
        projectId,
        issueId: editingIssue,
        updates: {
          title: editTitle,
          description: editDescription,
          assignees:editAssignee
        }
      }));
      setEditingIssue(null);
      setEditTitle("");
      setEditDescription("");
      setEditAssignee("")
    }
  };

  const handleCancelEdit = () => {
    setEditingIssue(null);
    setEditTitle("");
    setEditDescription("");
    setEditAssignee("")
  };


  const filteredIssues = issueslist.filter(issue =>
    issue.title.toLowerCase().includes(search.toLowerCase()) ||
    issue.id.toString().includes(search)
  );

  return (
    <div className="bg-slate-900 h-screen">
      <main className="mx-auto max-w-3xl pt-10 px-4">
        <Link to={'/'} className="text-white hover:underline pb-5 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
          </svg>
          <span>Projects</span>
        </Link>
        <header>
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search Issues"
              className="w-full max-w-md px-4 py-2 rounded-md text-white bg-slate-900 border border-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <Link
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
            </Link> */}
            <NewIsuueBtn/>
          </div>
        </header>


        <div className="mt-5 space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <div key={issue.id} className="flex justify-between items-center p-3 text-white rounded-md border border-gray-700">
                {editingIssue === issue.id ? (
                  <div className="w-full">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full mb-2 px-2 py-2 rounded bg-gray-800 text-white"
                      placeholder="Issue Title"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white"
                      placeholder="Issue Description"
                      rows="3"
                    />
                    <textarea
                      value={editAssignee}
                      onChange={(e) => setEditAssignee(e.target.value)}
                      className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white"
                      placeholder="Issue Description"
                      rows="3"
                    />
                    <div className="flex justify-end space-x-2">
                      <button onClick={handleSaveEdit} className="bg-green-600 px-3 py-1 rounded">Save</button>
                      <button onClick={handleCancelEdit} className="bg-gray-600 px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <Link to={`/project/${projectId}/issue/${issue.id}`} className="hover:underline">{issue.title}</Link>
                      <p>#{issue.id}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setMenuId(menuId === issue.id ? null : issue.id)}
                        className="hover:bg-gray-700 px-2 py-1 rounded-lg"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 512 512">
                        <path fill="currentColor" fillRule="evenodd" d="M117.333 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32m341.333 0c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32M288 256c0-17.673-14.327-32-32-32s-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32"/>
                      </svg>
                      </button>

                      {menuId === issue.id && (
                        <div className="absolute z-10 left-2 right-0 mt-1 w-40 border border-gray-700 bg-gray-800 text-white shadow-lg rounded-lg py-[6px]">
                          <button className="flex items-center space-x-2 px-2 py-1 text-white w-full hover:bg-gray-700" onClick={() => handleEditIssue(issue)}>
                            <p>Update Issue</p>
                          </button>
                          <button className="flex items-center space-x-1 px-2 py-1 text-white w-full hover:bg-gray-700" onClick={() => handleDeleteIssue(issue.id)}>
                            <p>Delete Issue</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
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