import React, { useEffect } from "react";
// import useLexicalComposerContext  from "@lexical/react/LexicalComposerContext";
import { Bold, Italic, Underline, Link2, List, Code } from "lucide-react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { $getRoot, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const Toolbar = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex justify-between pb-2">
            <p className="text-gray-400">Type your description here...</p>
            <div>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "bold")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Bold size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"italic")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Italic size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"underline")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Underline size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"link")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <Link2 size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"insertUnorderedList")} className="p-2 text-white hover:bg-gray-700 rounded">
                    <List size={18} />
                </button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"code")} className="p-2 text-white hover:bg-gray-700 rounded">
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

    // const [editor] = useLexicalComposerContext();
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

export default Editor;
