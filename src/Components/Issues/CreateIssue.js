import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddIssue } from "../../Redux/Slices/Issue/IssuesSlice";
import Editor from "./Editor";

const CreateIssue = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [assignees, setAssignees] = useState([]);
    const [assigneeInput, setAssigneeInput] = useState("");



const handleAddAssignee = () => {
    if (assigneeInput.trim() !== "" && !assignees.includes(assigneeInput)) {
        setAssignees([...assignees, assigneeInput]);
        setAssigneeInput(""); 
    }
};

const handleRemoveAssignee = (name) => {
    setAssignees(assignees.filter((assignee) => assignee !== name));
};



const handleCreateIssue = () => {
    const newIssue = {
        id: Date.now(),
        title,
        description,
        assignees: assignees.join(", "), 
    };

    dispatch(AddIssue({ projectId: String(projectId), issue: newIssue }));
    navigate(`/issuelist/${projectId}`);
};


    return (
        <div className="bg-slate-900 h-screen">
            <main className="flex flex-wrap lg:flex-nowrap w-full gap-10 mx-auto max-w-5xl pt-10 space-y-2">
                <div className="w-[70%]">
                    <Link to={`/issuelist/${projectId}`} className="text-white hover:underline pb-5 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
                        </svg>
                        <span>Projects/Issues</span>
                    </Link>
                    <h2 className="text-xl font-semibold mb-4 text-white">Create a New Issue</h2>

                    <div className="my-8">
                        <label className="text-white text-sm mb-2">Add a title *</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mt-8">
                        <label className="text-sm mb-2 text-white">Add a description</label>
                        <Editor onChange={setDescription} />
                    </div>

                    <div className="flex justify-end gap-5 items-center mt-5">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="createMore" />
                            <label htmlFor="createMore" className="text-sm text-white">Create more</label>
                        </div>

                        <button className="px-4 py-2 hover:bg-gray-700 text-gray-400 rounded-lg border border-gray-700" onClick={() => navigate(`/issuelist/${projectId}`)}>Cancel</button>
                        <button className="px-4 py-2 bg-green-700 text-white rounded-lg" onClick={handleCreateIssue}>Create</button>
                    </div>
                </div>

                <div>
    <div className="flex items-center gap-2">
        <button
            onClick={() => setShowInput(!showInput)}
            className="flex mt-4 text-white bg-green-700 px-2 py-1 rounded-lg whitespace-nowrap"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1" />
            </svg>
            <span>Assignees</span>
        </button>
    </div>

    {showInput && (
        <div className="mt-2">
            <input
                type="text"
                className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white"
                placeholder="Add Assignee"
                value={assigneeInput}
                onChange={(e) => setAssigneeInput(e.target.value)}
            />
            <button onClick={handleAddAssignee} className="flex mt-2 text-white bg-green-700 px-2 py-1 rounded-lg">
                <span>Add</span>
            </button>
        </div>
    )}

    {assignees.length > 0 && (
        <div className="mt-4">
            <h4 className="text-white">Assigned To:</h4>
            <ul className="mt-2">
                {assignees.map((assignee, index) => (
                    <li key={index} className="text-white flex justify-between items-center mb-2 gap-2 bg-gray-800 p-2 rounded-lg">
                        {assignee}
                        <button
                            onClick={() => handleRemoveAssignee(assignee)}
                            className="text-red-600 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )}
</div>

            </main>
        </div>
    );
};

export default CreateIssue;
