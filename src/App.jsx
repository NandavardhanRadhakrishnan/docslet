// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Ensure correct import

import dotenv from 'dotenv';
import PostMarkdown from './components/PostMarkdown';
import EditMarkdown from './components/EditMarkdown';
import Auth from './components/Auth';
import Register from './components/Register'
import MarkdownEditorAndRenderer from './components/MarkdownEditorAndRenderer';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Auth supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/post">
            {user ? <PostMarkdown user={user} /> : <Auth supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />}
          </Route>
          <Route path="/edit/:postId">
            {user ? <EditMarkdown user={user} /> : <Auth supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />}
          </Route>
          <Route path="/">
            <MarkdownEditorAndRenderer/>
            <h1>Welcome to Docslet!</h1>
            <p>This is the home page content.</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
