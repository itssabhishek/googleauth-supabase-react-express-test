import React from 'react';
import { supabase } from '../services/supabase';
import {API_URL} from "../utils/constants";


const LoginPage: React.FC = () => {
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${API_URL}/protected`,
      },
    });

    if (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
      <div>
        <h1>Login</h1>
        <button onClick={handleSignIn}>Login with Google</button>
      </div>
  );
};

export default LoginPage;
