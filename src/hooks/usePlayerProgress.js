// src/hooks/usePlayerProgress.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const DEFAULT_PLAYER_ID = 'samuel-child-1';

export const usePlayerProgress = () => {
  const [totalXp, setTotalXp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from Supabase
  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .select('total_xp')
        .eq('player_name', DEFAULT_PLAYER_ID)
        .single(); // Use .single() to get one record

      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('Error loading progress:', error);
        return;
      }

      // If we found data, set the XP. Otherwise, keep it at 0.
      setTotalXp(data?.total_xp || 0);
    } catch (error) {
      console.error('Unexpected error in loadProgress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save progress to Supabase
  const saveProgress = async (newXp) => {
    const updatedTotalXp = totalXp + newXp;
    
    try {
      // Upsert is a combination of insert and update.
      // It first tries to update a record that matches the UNIQUE constraint on `player_name`.
      // If no record matches, it inserts a new one.
      const { error } = await supabase
        .from('player_progress')
        .upsert(
          { 
            player_name: DEFAULT_PLAYER_ID, 
            total_xp: updatedTotalXp 
          },
          {
            onConflict: 'player_name', // This is the key
            ignoreDuplicates: false // This is important
          }
        );

      if (error) {
        throw error;
      }

      // Only update the local state if the database save was successful
      console.log('Progress saved successfully to DB! Total XP:', updatedTotalXp);
      setTotalXp(updatedTotalXp);

    } catch (error) {
      console.error('Error saving progress to DB:', error);
      // Revert the local state on error
      alert('Could not save progress. Please check your connection.');
    }
  };

  // Load progress when the hook is first used
  useEffect(() => {
    loadProgress();
  }, []);

  return { totalXp, isLoading, saveProgress, loadProgress };
};