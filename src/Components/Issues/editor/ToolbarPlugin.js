import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    $getSelection,
    $isRangeSelection,
} from "lexical";

const LowPriority = 1;

export default function ToolbarPlugin({ activeEditor, isEditable }) {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    return (
        <div className="toolbar bg-gray-200" ref={toolbarRef}>
            {/* <button
                disabled={!canUndo}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND);
                }}
                className="toolbar-item spaced"
                aria-label="Undo"
            >
                <i className="format undo" />
            </button>
            <button
                disabled={!canRedo}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND);
                }}
                className="toolbar-item"
                aria-label="Redo"
            >
                <i className="format redo" />
            </button> */}
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
                className={"toolbar-item spaced " + (isBold ? "active" : "")}
                aria-label="Format Bold"
            >
                bold
            </button>
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                className={"toolbar-item spaced " + (isItalic ? "active" : "")}
                aria-label="Format Italics"
            >
                italic
            </button>
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
                className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
                aria-label="Format Underline"
            >
                underline
            </button>
            <button
                onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                }}
                className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
                aria-label="Format Strikethrough"
            >
                strikethrough
            </button>
        </div>
    );
}