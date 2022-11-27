import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                document: false
            }),
            Highlight,
            Placeholder.configure({
                placeholder: 'Untitled',
                emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-gray-500 before:h0 before:float-left before:pointer-events-none'
            }),
            Document.extend({
                content: 'heading block*'
            })
        ],
        content: '<h1>Back-end</h1><p>Arnarujena vragest soldata</p>',
        autofocus: 'end',
        editorProps: {
            attributes: {
                class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
            }
        }
    })

    return (
        <EditorContent className="w-[65ch]" editor={editor} />
    )
}