// src/App.jsx - Update the imports and component
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CharacterSelect from './pages/CharacterSelect'
import QuestPage from './pages/QuestPage'
import ParentDashboard from './pages/ParentDashboard' // Add this import
import { usePlayerProgress } from './hooks/usePlayerProgress'
import DebugInfo from './components/DebugInfo'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const { totalXp, isLoading, saveProgress } = usePlayerProgress();

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  }

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    navigateTo('quest');
  }

  const handleQuestComplete = async (earnedXp) => {
    await saveProgress(earnedXp);
    alert(`Quest Complete! You earned ${earnedXp} XP! 🎉 Total XP: ${totalXp + earnedXp}`);
    navigateTo('character-select');
  };

  if (isLoading) {
    return <div className="app">Loading your adventures...</div>;
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onStart={() => navigateTo('character-select')} />;
      case 'character-select':
        return (
          <CharacterSelect 
            onSelectCharacter={handleSelectCharacter}
            onOpenDashboard={() => navigateTo('dashboard')} // Add this
          />
        );
      case 'quest':
        return (
          <QuestPage 
            character={selectedCharacter} 
            onQuestComplete={handleQuestComplete}
          />
        );
      case 'dashboard': // Add this case
        return <ParentDashboard onBack={() => navigateTo('character-select')} />;
      default:
        return <HomePage onStart={() => navigateTo('character-select')} />;
    }
  }

  return (
    <div className="app">
      {renderCurrentPage()}
      <DebugInfo />
    </div>
  )
}

export default App