// src/hooks/usePlayerProgress.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

// A simple, default player ID for the MVP. Later, we can add user accounts.
const DEFAULT_PLAYER_ID = 'samuel-child-1';

export const usePlayerProgress = () => {
  const [totalXp, setTotalXp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress when the app starts
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      let { data, error } = await supabase
        .from('player_progress')
        .select('total_xp')
        .eq('player_name', DEFAULT_PLAYER_ID)
        .maybeSingle(); // Use maybeSingle() to return null if no record exists

      if (error) {
        console.error('Error loading progress:', error);
      } else if (data) {
        setTotalXp(data.total_xp);
      }
    } catch (error) {
      console.error('Unexpected error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newXp) => {
    const updatedTotalXp = totalXp + newXp;
    setTotalXp(updatedTotalXp);

    // Upsert: Update if record exists, otherwise insert a new one.
    const { error } = await supabase
      .from('player_progress')
      .upsert(
        { 
          player_name: DEFAULT_PLAYER_ID, 
          total_xp: updatedTotalXp 
        },
        { onConflict: 'player_name' } // This tells Supabase which column has the unique constraint
      );

    if (error) {
      console.error('Error saving progress:', error);
    } else {
      console.log('Progress saved successfully!');
    }
  };

  return { totalXp, isLoading, saveProgress };
};