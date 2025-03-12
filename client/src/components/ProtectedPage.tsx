import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const ProtectedPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchProtectedData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  useEffect(() => {
    void fetchProtectedData();
  }, []);

  return (
      <div>
        <h1>Protected Page</h1>
        <p>{message}</p>
      </div>
  );
};

export default ProtectedPage;
