// src/App.jsx
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CharacterSelect from './pages/CharacterSelect'
import QuestPage from './pages/QuestPage' // Import the new QuestPage

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerXp, setPlayerXp] = useState(0); // Track total XP earned

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  }

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    navigateTo('quest'); // Now go straight to the quest!
  }

  // This is called when the quest is completed
  const handleQuestComplete = (earnedXp) => {
    setPlayerXp(earnedXp);
    alert(`Quest Complete! You earned ${earnedXp} XP! 🎉`); // Simple feedback for now
    // In the future, we'll go to a rewards screen here
    navigateTo('character-select'); // Go back to character select for now
  };

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