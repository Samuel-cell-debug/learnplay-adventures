// src/pages/HomePage.jsx
import './HomePage.css'; // We'll create this next

const HomePage = ({ onStart }) => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1>LearnPlay Adventures</h1>
        <p>Where learning feels like play!</p>
        <button className="start-button" onClick={onStart}>
          Let's Play!
        </button>
      </div>
    </div>
  );
};

export default HomePage;