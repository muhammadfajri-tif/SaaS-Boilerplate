'use client';

import Link from '@tiptap/extension-link';
import { Markdown } from '@tiptap/markdown';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import '../components/tiptap-styles.css';

type MarkdownPreviewProps = {
  content: string;
  className?: string;
};

export function MarkdownPreviewComponent({
  content,
  className,
}: MarkdownPreviewProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-inherit underline',
        },
      }),
      Markdown,
    ],
    content,
    editorProps: {
      attributes: {
        class: `focus:outline-none ${className}`,
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, { contentType: 'markdown' });
    }
  }, [editor, content]);

  if (!editor) {
    return <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded" />;
  }

  return (
    <EditorContent editor={editor} />
  );
}
