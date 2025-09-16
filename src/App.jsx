// src/App.jsx
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

function App() {
  // State to manage the current page/view
  const [currentPage, setCurrentPage] = useState('home');

  // Function to navigate to different pages
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  }

  // Render the current page
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onStart={() => navigateTo('character-select')} />;
      case 'character-select':
        return <div>Character Selection Screen - Coming Next!</div>;
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