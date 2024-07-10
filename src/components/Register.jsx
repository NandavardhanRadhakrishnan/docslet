// src/components/Register.jsx
import React, { useState } from 'react';
import supabase from '../supabase'; // Import Supabase client

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email:email,
        password:password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      console.log('User registered successfully:', user);
      // Optionally, you can handle redirect or show a success message
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
