// src/pages/CharacterSelect.jsx
import './CharacterSelect.css';
import CharacterCard from '../components/CharacterCard';

const CHARACTERS = [
  {
    id: 'puppy-paa',
    name: 'Puppy Paa',
    description: 'Loves stories and words! Helps with reading.',
    image: '🐶',
    color: '#6fb2e0',
  },
  {
    id: 'horse-nii',
    name: 'Horse Nii',
    description: 'Great at counting and puzzles! Helps with math.',
    image: '🐴',
    color: '#8bc34a',
  },
  {
    id: 'kofi-chef',
    name: 'Kofi the Chef',
    description: 'Mixes reading and math to cook up fun!',
    image: '👨🏾‍🍳',
    color: '#ff9800',
  }
];

const CharacterSelect = ({ onSelectCharacter, onOpenDashboard }) => {
  return (
    <div className="character-select-container">
      <div className="character-select-header">
        <div>
          <h1>Choose Your Guide!</h1>
          <p>Who do you want to learn with today?</p>
        </div>
        <button onClick={onOpenDashboard} className="dashboard-button">
          📊 Parent Dashboard
        </button>
      </div>

      <div className="characters-grid">
        {CHARACTERS.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            description={character.description}
            image={character.image}
            color={character.color}
            onSelect={() => onSelectCharacter(character)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterSelect;