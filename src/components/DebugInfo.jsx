// src/components/DebugInfo.jsx
import { useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const DebugInfo = () => {

  // This function will test the Supabase connection directly
  const testConnection = async () => {
    console.log("Testing Supabase connection...");
    
    // Test a simple query
    const { data, error } = await supabase
      .from('player_progress')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection ERROR:', error);
      alert('Connection Error: ' + error.message);
    } else {
      console.log('Supabase connection SUCCESS. Data:', data);
      alert('Connection Successful! Found ' + data.length + ' records.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <h4>Debug Info</h4>
      <button onClick={testConnection} style={{padding: '5px', marginBottom: '10px'}}>
        Test DB Connection
      </button>
      <div>Open Browser Console (F12) for more info</div>
    </div>
  );
};

export default DebugInfo;