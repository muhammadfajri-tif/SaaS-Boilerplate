'use client';

import type { Instance } from 'tippy.js';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { ReactRenderer } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Heading3, Italic, Link as LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import { SlashCommand } from './SlashCommandExtension';

import { getSlashCommandItems, SlashCommandMenu } from './SlashCommandMenu';
import 'tippy.js/dist/tippy.css';
import './tiptap-styles.css';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
};

const addLink = (editor: any) => {
  // eslint-disable-next-line no-alert
  const url = prompt('Enter URL:');
  if (url) {
    editor.chain().focus().setLink({ href: url }).run();
  }
};

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Tell your story...',
  height = 500,
}: MarkdownEditorProps) {
  const t = useTranslations('BlogWrite');
  const bubbleMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
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
      Placeholder.configure({
        placeholder,
      }),
      SlashCommand.configure({
        suggestion: {
          items: ({ query }: { query: string }) => {
            return getSlashCommandItems(t)
              .filter(item =>
                item.title.toLowerCase().startsWith(query.toLowerCase()),
              );
          },
          render: () => {
            let component: ReactRenderer | null = null;
            let popup: Instance[] | null = null;

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(SlashCommandMenu, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });
              },

              onUpdate(props: any) {
                component?.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup?.[0]?.setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },

              onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                  popup?.[0]?.hide();
                  return true;
                }

                return (component?.ref as any)?.onKeyDown?.(props) || false;
              },

              onExit() {
                popup?.[0]?.destroy();
                component?.destroy();
              },
            };
          },
        },
      }),
      Markdown,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      const markdown = updatedEditor.getMarkdown();
      onChange(markdown);
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getMarkdown()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Bubble menu for text selection
  useEffect(() => {
    if (!editor || !bubbleMenuRef.current) {
      return;
    }

    const updateBubbleMenu = () => {
      const { from, to } = editor.state.selection;
      const hasSelection = from !== to;

      if (hasSelection && bubbleMenuRef.current) {
        const { view } = editor;
        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);

        const top = start.top - 60;
        const left = (start.left + end.left) / 2;

        bubbleMenuRef.current.style.display = 'flex';
        bubbleMenuRef.current.style.position = 'fixed';
        bubbleMenuRef.current.style.top = `${top}px`;
        bubbleMenuRef.current.style.left = `${left}px`;
        bubbleMenuRef.current.style.transform = 'translateX(-50%)';
      } else if (bubbleMenuRef.current) {
        bubbleMenuRef.current.style.display = 'none';
      }
    };

    editor.on('selectionUpdate', updateBubbleMenu);
    editor.on('update', updateBubbleMenu);

    return () => {
      editor.off('selectionUpdate', updateBubbleMenu);
      editor.off('update', updateBubbleMenu);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className="medium-editor relative"
      style={{ minHeight: `${height}px` }}
    >
      {/* Bubble Menu - appears when text is selected */}
      <div
        ref={bubbleMenuRef}
        className="z-50 hidden items-center gap-0.5 rounded-lg bg-white p-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-gray-800 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('bold') ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('italic') ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="size-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-600" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Heading 1"
        >
          <Heading1 className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Heading 2"
        >
          <Heading2 className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Heading 3"
        >
          <Heading3 className="size-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-600" />

        <button
          type="button"
          onClick={() => addLink(editor)}
          className={`rounded p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
            editor.isActive('link') ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
          }`}
          title="Add Link"
        >
          <LinkIcon className="size-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
