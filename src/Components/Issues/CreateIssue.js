import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { Bold, Italic, Underline, Link2, List, Code } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useNavigate } from "react-router-dom";

const Toolbar = () => {
    const [editor] = useLexicalComposerContext();
   

    return (
        <div className="flex justify-between  pb-20">
            <p className="text-gray-400 ">
                Type your description here...
            </p>
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

const Editor = () => {
    const initialConfig = {
        namespace: "MyEditor",
        theme: { paragraph: "mb-2 text-white" },
        onError(error) {
            console.error(error);
        },
        editorState: () => {
            const root = $getRoot();

        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="border border-gray-600 bg-gray-900 rounded-md p-2">
                <Toolbar />
                <RichTextPlugin
                    contentEditable={<ContentEditable className="outline-none w-full p-3 bg-gray-900 text-white min-h-[100px]" />}

                />
                <HistoryPlugin />
            </div>
        </LexicalComposer>
    );
};

const CreateIssue = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    return (
        <div className='bg-slate-900 h-screen'>

            <main className='mx-auto max-w-3xl pt-10 space-y-2'>
                <h2 className="text-xl font-semibold mb-4 text-white">Create a New Issue</h2>

                <div className="my-8">
                    <label className=" text-white text-sm mb-2">Add a title *</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mt-8">
                    <label className=" text-sm  mb-2 text-white">Add a description</label>
                    <Editor />
                </div>


                <div className="flex justify-end gap-5 items-center mt-5">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="createMore" />
                        <label htmlFor="createMore" className="text-sm text-white">Create more</label>
                    </div>

                    <div className="flex gap-2">
                        <button className="px-4 py-2 hover:bg-gray-700 text-gray-400 rounded-lg "  onClick={() => navigate(`/`)}>Cancel</button>
                    </div>

                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-700 text-white rounded-lg ">Create</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateIssue;
