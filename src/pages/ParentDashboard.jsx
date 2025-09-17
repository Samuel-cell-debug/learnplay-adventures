// src/pages/ParentDashboard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import './ParentDashboard.css';

const ParentDashboard = ({ onBack }) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch progress data from Supabase
  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .select('*')
        .eq('player_name', 'samuel-child-1')
        .single();

      if (error) {
        console.error('Error fetching progress:', error);
      } else {
        setProgressData(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="parent-dashboard">
      <header className="dashboard-header">
        <h1>📊 Parent Dashboard</h1>
        <button onClick={onBack} className="back-button">
          ← Back to Game
        </button>
      </header>

      <div className="dashboard-content">
        {/* Summary Card */}
        <div className="dashboard-card summary-card">
          <h2>Learning Summary</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{progressData?.total_xp || 0}</span>
              <span className="stat-label">Total XP</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.floor((progressData?.total_xp || 0) / 10)}</span>
              <span className="stat-label">Problems Solved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {progressData?.total_xp ? '⭐' : '—'}
              </span>
              <span className="stat-label">Engagement</span>
            </div>
          </div>
        </div>

        {/* Strengths Card */}
        <div className="dashboard-card">
          <h2>🌟 Strengths</h2>
          <ul className="strengths-list">
            <li>Quick problem-solving when engaged</li>
            <li>Good with basic addition concepts</li>
            <li>Persistent when motivated by rewards</li>
          </ul>
        </div>

        {/* Areas to Improve Card */}
        <div className="dashboard-card">
          <h2>📚 Areas to Practice</h2>
          <ul className="improvement-list">
            <li>Number recognition speed</li>
            <li>Focus during longer sessions</li>
            <li>Advanced addition (numbers above 10)</li>
          </ul>
        </div>

        {/* Suggestions Card */}
        <div className="dashboard-card suggestion-card">
          <h2>💡 Suggested Activities</h2>
          <div className="suggestions">
            <div className="suggestion-item">
              <span className="suggestion-emoji">🍲</span>
              <div className="suggestion-text">
                <strong>Cooking Math:</strong> Practice measuring ingredients together
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-emoji">🛒</span>
              <div className="suggestion-text">
                <strong>Grocery Count:</strong> Count items while shopping
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-emoji">⚽</span>
              <div className="suggestion-text">
                <strong>Sports Math:</strong> Count goals and passes during play
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;