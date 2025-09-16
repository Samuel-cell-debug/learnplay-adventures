// src/components/MathProblem.jsx
import { useState, useEffect } from 'react';
import './MathProblem.css';

const MathProblem = ({ onProblemSolved, difficulty = 'easy' }) => {
  // State for the current problem, user's answer, and feedback
  const [problem, setProblem] = useState(generateProblem(difficulty));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeStarted, setTimeStarted] = useState(Date.now());
  const [timeToSolve, setTimeToSolve] = useState(0);

  // Generate a new math problem
  function generateProblem(diff) {
    let num1, num2, answer, operator;
    
    switch(diff) {
      case 'easy':
        num1 = Math.floor(Math.random() * 5) + 1; // 1-5
        num2 = Math.floor(Math.random() * 5) + 1; // 1-5
        operator = '+';
        answer = num1 + num2;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 8) + 1; // 1-8
        num2 = Math.floor(Math.random() * 5) + 1; // 1-5
        operator = '+';
        answer = num1 + num2;
        break;
      // We can add more difficulty levels later
      default:
        num1 = 1;
        num2 = 1;
        operator = '+';
        answer = 2;
    }

    return { num1, num2, operator, answer, text: `${num1} ${operator} ${num2} = ?` };
  }

  // Check the user's answer when they press Enter or click Submit
  const checkAnswer = () => {
    if (userAnswer === '') return;

    const timeEnded = Date.now();
    const timeTaken = (timeEnded - timeStarted) / 1000; // Time in seconds
    setTimeToSolve(timeTaken);

    const wasCorrect = parseInt(userAnswer) === problem.answer;
    setIsCorrect(wasCorrect);

    // After a short delay, move to the next problem and report back to QuestPage
    setTimeout(() => {
      onProblemSolved({
        wasCorrect,
        timeTaken,
        problem: problem
      });
      setUserAnswer('');
      setIsCorrect(null);
      setProblem(generateProblem(difficulty));
      setTimeStarted(Date.now());
    }, 1500); // 1.5 second delay for feedback
  };

  // Handle the 'Enter' key to submit an answer
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // Calculate XP based on speed and accuracy (Adaptive Logic Starts Here!)
  const calculateXp = (correct, timeSec) => {
    if (!correct) return 0; // No XP for wrong answers

    let baseXp = 10;
    // Bonus XP for solving quickly (e.g., 5 bonus XP for solving in under 3 seconds)
    let speedBonus = timeSec < 3 ? 5 : 0;

    return baseXp + speedBonus;
  };

  return (
    <div className="math-problem-container">
      <h2>Horse Nii's Cooking Puzzle 🧩</h2>
      <p>Can you help Horse Nii solve this? He needs the right ingredients!</p>
      
      <div className="problem-display">
        <h3>{problem.text}</h3>
      </div>

      <div className="answer-section">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Your answer..."
          disabled={isCorrect !== null} // Disable input while showing feedback
        />
        <button onClick={checkAnswer} disabled={isCorrect !== null}>
          Submit
        </button>
      </div>

      {/* Feedback Message */}
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect 
            ? `✅ Correct! 🎉 You earned ${calculateXp(true, timeToSolve)} XP!` 
            : '❌ Try again! You can do it!'}
        </div>
      )}
    </div>
  );
};

export default MathProblem;