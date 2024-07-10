import React, { useState } from 'react';

const PostMarkdown = ({ user }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  const handlePost = async () => {
    try {
      const { data, error } = await supabase.from('markdown_posts').insert([
        { user_id: user.id, content: markdownContent },
      ]);
      if (error) throw error;
      console.log('Markdown posted:', data);
    } catch (error) {
      console.error('Error posting markdown:', error.message);
    }
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
      <button onClick={handlePost}>Post Markdown</button>
    </div>
  );
};

export default PostMarkdown;
