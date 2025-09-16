// src/components/CharacterCard.jsx
import './CharacterCard.css';

const CharacterCard = ({ name, description, image, color, onSelect }) => {
  return (
    <div 
      className="character-card" 
      style={{ '--accent-color': color }}
      onClick={onSelect}
    >
      <div className="character-image">
        {/* We'll use emojis for now! Easy and fun. */}
        <span role="img" aria-label={name}>{image}</span>
      </div>
      <div className="character-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;