// src/App.jsx
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CharacterSelect from './pages/CharacterSelect' // Import the new component

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Track selected character

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  }

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    console.log("Selected character:", character); // We'll see this in the browser's console
    // navigateTo('quest'); // We will set this up after building the quest logic
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onStart={() => navigateTo('character-select')} />;
      case 'character-select':
        return <CharacterSelect onSelectCharacter={handleSelectCharacter} />;
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