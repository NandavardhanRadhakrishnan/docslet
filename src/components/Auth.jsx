// src/components/Auth.jsx
import React, { useState } from 'react';
import supabase from '../supabase'; // Import Supabase client

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }

      console.log('User logged in:', user);
      // Handle successful login (e.g., store user data in state/context)
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message); // Update state with error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>} {/* Display error message if there is an error */}
    </div>
  );
};

export default Auth;
