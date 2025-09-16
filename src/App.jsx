// src/App.jsx
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CharacterSelect from './pages/CharacterSelect'
import QuestPage from './pages/QuestPage'
import { usePlayerProgress } from './hooks/usePlayerProgress' // Import the new hook

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  // Use the hook to manage XP. This now saves to the database!
  const { totalXp, isLoading, saveProgress } = usePlayerProgress();

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  }

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    navigateTo('quest');
  }

  const handleQuestComplete = async (earnedXp) => {
    await saveProgress(earnedXp); // Save the earned XP to the database
    alert(`Quest Complete! You earned ${earnedXp} XP! 🎉 Total XP: ${totalXp + earnedXp}`);
    navigateTo('character-select');
  };

  // Show a loading screen while fetching progress from the database
  if (isLoading) {
    return <div className="app">Loading your adventures...</div>;
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onStart={() => navigateTo('character-select')} />;
      case 'character-select':
        return <CharacterSelect onSelectCharacter={handleSelectCharacter} />;
      case 'quest':
        return (
          <QuestPage 
            character={selectedCharacter} 
            onQuestComplete={handleQuestComplete}
          />
        );
      default:
        return <HomePage onStart={() => navigateTo('character-select')} />;
    }
  }

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  )
}

export default App