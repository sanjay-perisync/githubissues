import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { Bold, Italic, Underline, Link2, List, Code } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddIssue } from "../../Redux/Slices/Issue/IssuesSlice";


const Toolbar = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex justify-between pb-2">
            <p className="text-gray-400">Type your description here...</p>
            <div>
                <button onClick={() => editor.dispatchCommand("bold")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Bold size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand("italic")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Italic size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand("underline")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Underline size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand("link")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Link2 size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand("insertUnorderedList")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <List size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand("code")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Code size={18} />
                </button>
            </div>
        </div>
    );
};

const EditorOnChange = ({ onChange }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const text = $getRoot().getTextContent();
                onChange(text);
            });
        });
    }, [editor, onChange]);

    return null;
};

const Editor = ({ onChange }) => {
    const initialConfig = {
        namespace: "MyEditor",
        theme: { paragraph: "mb-2 text-white" },
        onError(error) {
            console.error(error);
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="border border-gray-600 bg-gray-900 rounded-md p-2">
                <Toolbar />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="outline-none w-full p-3 bg-gray-900 text-white min-h-[100px]" />
                    }
                />
                <HistoryPlugin />
                <EditorOnChange onChange={onChange} />
            </div>
        </LexicalComposer>
    );
};

const CreateIssue = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateIssue = () => {

        // console.log("Title:", title);
        // console.log("Description:", description);


        const newIssue = {
            id: Date.now(),
            title,
            description,
        };

        // console.log("New Issue:", newIssue);
        dispatch(AddIssue({ projectId: String(projectId), issue: newIssue }));
        navigate(`/issuelist/${projectId}`);
    };

    return (
        <div className="bg-slate-900 h-screen">
            <main className="mx-auto max-w-3xl pt-10 space-y-2">
                <Link to={`/issuelist/${projectId}`} className="text-white hover:underline pb-5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" width="" height="" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" /></svg>
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
            </main>
        </div>
    );
};

export default CreateIssue;
