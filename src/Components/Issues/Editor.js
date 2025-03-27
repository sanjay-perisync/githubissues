import React, { useEffect } from "react";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { $getRoot, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const Toolbar = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex justify-between pb-2">
            <p className="text-gray-400">Type your description here...</p>
            <div>
                <button 
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} 
                    className="p-2 text-white hover:bg-gray-700 rounded"
                >
                    <Bold size={18} />
                </button>
                <button 
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} 
                    className="p-2 text-white hover:bg-gray-700 rounded"
                >
                    <Italic size={18} />
                </button>
                <button 
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")} 
                    className="p-2 text-white hover:bg-gray-700 rounded"
                >
                    <Strikethrough size={18} />
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
        theme: { 
            paragraph: "mb-2 text-white",
            text: {
                bold: "font-bold",
                italic: "italic",
                strikethrough: "line-through"
            }
        },
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