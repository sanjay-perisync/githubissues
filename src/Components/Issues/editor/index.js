'use client';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// html
import { $generateHtmlFromNodes } from "@lexical/html";
import theme from "./lexicalTheme";

function Placeholder() {
    return <div className="editor-placeholder pl-5 pt-[17px]">Type here...</div>;
}

export const wordsPerMin = 180;

const editorConfig = {
    theme: theme,
    onError(error) {
        throw error;
    },
    nodes: [
        HeadingNode,
    ],
};

const initialRootState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export default function LexicalEditor({ className, isEditable = true, initialState = "", setData = () => { } }) {
    return (
        <LexicalComposer initialConfig={{ ...editorConfig, editable: isEditable, editorState: initialState || initialRootState }}>
            <EditorContent className={className} setData={setData} isEditable={isEditable} />
        </LexicalComposer>
    );
}

function EditorContent({ setData = () => { }, isEditable, className = "" }) {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);

    const onChange = (e) => {
        if (isEditable) {
            try {
                editor.update(() => {
                    const htmlString = $generateHtmlFromNodes(editor);
                    const json = e?.toJSON();
                    const textCount = json ? getTextCount(json.root) : 0;
                    const data = { htmlString, json: JSON.stringify(json), textCount: textCount, readTime: calculateReadTime(textCount) }

                    setData(data);
                    console.log(data);
                });
            } catch (err) {
                console.log("err", err);
                // toast.error('Something went wrong');
            }
        }
    };

    const calculateReadTime = (textCount) => {
        const wordsPerMinute = wordsPerMin;
        const wordCount = textCount || 0;

        if (wordCount === 0) {
            return 0;
        }

        const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        return readTimeMinutes;
    };

    const getTextCount = (node) => {
        if (!node) {
            return 0;
        }

        let count = 0;

        if (node.children) {
            node.children.forEach((child) => {
                count += getTextCount(child);
            });
        } else if (node.text) {
            const words = node.text.trim().split(/\s+/).filter(word => word !== "");
            count += words.length;
        }

        return count;
    };

    useEffect(() => {
        editor.update(() => editor.setEditable(isEditable));
    }, [editor, isEditable]);

    return (
        <div className={className}>
            {isEditable ?
                <ToolbarPlugin
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                    isEditable={isEditable}
                /> : null
            }
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <div className="editor-scroller">
                            <div className="editor relative border-black/10 border px-5 lexical-editor-inner">
                                <ContentEditable className="editor-input" />
                            </div>
                        </div>
                    }
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange} />
                <AutoFocusPlugin />
            </div>
        </div>
    );
}