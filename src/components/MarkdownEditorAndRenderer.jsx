import React, { useState } from 'react';
import { Bold, Italic, Code, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({ onContentChange }) => {
  const [content, setContent] = useState('');

  const handleTextChange = (e) => {
    setContent(e.target.value);
    onContentChange(e.target.value);
  };

  const insertMarkdown = (startChars, endChars = startChars) => {
    const textarea = document.getElementById('markdown-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${startChars}${selectedText}${endChars}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-x-2 mb-2">
        <Button onClick={() => insertMarkdown('**')}><Bold size={16} /></Button>
        <Button onClick={() => insertMarkdown('*')}><Italic size={16} /></Button>
        <Button onClick={() => insertMarkdown('`')}><Code size={16} /></Button>
        <Button onClick={() => insertMarkdown('- ')}><List size={16} /></Button>
      </div>
      <textarea
        id="markdown-textarea"
        value={content}
        onChange={handleTextChange}
        className="flex-grow w-full p-2 border rounded resize-none"
        placeholder="Enter your markdown here..."
      />
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose max-w-full h-full overflow-auto p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

const MarkdownEditorAndRenderer = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-2">Editor</h2>
        <div className="h-[calc(100%-2rem)]">
          <MarkdownEditor onContentChange={setMarkdownContent} />
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <div className="border rounded h-[calc(100%-2rem)]">
          <MarkdownRenderer content={markdownContent} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditorAndRenderer;