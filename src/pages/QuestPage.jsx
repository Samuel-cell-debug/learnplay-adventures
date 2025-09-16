// src/pages/QuestPage.jsx
import { useState } from 'react';
import './QuestPage.css';
import MathProblem from '../components/MathProblem';

const QuestPage = ({ character, onQuestComplete }) => {
  // State for the player's total XP and streak
  const [totalXp, setTotalXp] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);

  // This function is called when the MathProblem component solves a problem
  const handleProblemSolved = (result) => {
    // Calculate XP based on the result
    const xpEarned = result.wasCorrect ? (10 + (result.timeTaken < 3 ? 5 : 0)) : 0;
    
    setTotalXp(prevXp => prevXp + xpEarned);
    
    if (result.wasCorrect) {
      setProblemsSolved(prev => prev + 1);
    }

    // For the MVP, let's complete the quest after 3 correct answers
    if (problemsSolved + (result.wasCorrect ? 1 : 0) >= 3) {
      setTimeout(() => {
        onQuestComplete(totalXp + xpEarned);
      }, 2000);
    }
  };

  return (
    <div className="quest-page-container" style={{ '--character-color': character?.color }}>
      <header className="quest-header">
        <h1>Learning with {character?.name}!</h1>
        <div className="stats">
          <span>XP: {totalXp}</span>
          <span>Solved: {problemsSolved}/3</span>
        </div>
      </header>

      <MathProblem onProblemSolved={handleProblemSolved} difficulty="easy" />

      <div className="quest-footer">
        <p>Solve 3 problems to help {character?.name} finish cooking! 🍲</p>
      </div>
    </div>
  );
};

export default QuestPage;