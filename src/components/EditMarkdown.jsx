import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditMarkdown = ({ user }) => {
  const { postId } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetchMarkdownContent();
  }, []);

  const fetchMarkdownContent = async () => {
    try {
      const { data, error } = await supabase.from('markdown_posts').select('content').eq('id', postId);
      if (error) throw error;
      setMarkdownContent(data[0].content);
    } catch (error) {
      console.error('Error fetching markdown:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase.from('markdown_posts').update({ content: markdownContent }).eq('id', postId);
      if (error) throw error;
      console.log('Markdown updated successfully');
    } catch (error) {
      console.error('Error updating markdown:', error.message);
    }
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
      <button onClick={handleUpdate}>Update Markdown</button>
    </div>
  );
};

export default EditMarkdown;
