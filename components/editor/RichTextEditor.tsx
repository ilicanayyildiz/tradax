'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { 
  Bold, Italic, List, ListOrdered, Heading1, Heading2, 
  Link as LinkIcon, Image as ImageIcon, Code, Quote 
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="rounded-lg border border-navy-300 dark:border-navy-700">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-navy-300 bg-navy-50 p-2 dark:border-navy-700 dark:bg-navy-900">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('bold') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('italic') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>

        <div className="mx-2 w-px bg-navy-300 dark:bg-navy-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <div className="mx-2 w-px bg-navy-300 dark:bg-navy-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('bulletList') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('orderedList') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="mx-2 w-px bg-navy-300 dark:bg-navy-700" />

        <button
          type="button"
          onClick={addLink}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('link') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800"
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <div className="mx-2 w-px bg-navy-300 dark:bg-navy-700" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('blockquote') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`rounded p-2 hover:bg-navy-200 dark:hover:bg-navy-800 ${
            editor.isActive('codeBlock') ? 'bg-navy-300 dark:bg-navy-700' : ''
          }`}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  )
}

