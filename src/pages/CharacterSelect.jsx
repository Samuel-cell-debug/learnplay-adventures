// src/pages/CharacterSelect.jsx
import './CharacterSelect.css';
import CharacterCard from '../components/CharacterCard';

// This is our character data. Later, we can move it to a separate file.
const CHARACTERS = [
  {
    id: 'puppy-paa',
    name: 'Puppy Paa',
    description: 'Loves stories and words! Helps with reading.',
    image: '🐶',
    color: '#6fb2e0', // Light blue
  },
  {
    id: 'horse-nii',
    name: 'Horse Nii',
    description: 'Great at counting and puzzles! Helps with math.',
    image: '🐴',
    color: '#8bc34a', // Light green
  },
  {
    id: 'kofi-chef',
    name: 'Kofi the Chef',
    description: 'Mixes reading and math to cook up fun!',
    image: '👨🏾‍🍳',
    color: '#ff9800', // Orange
  }
];

const CharacterSelect = ({ onSelectCharacter }) => {
  return (
    <div className="character-select-container">
      <h1>Choose Your Guide!</h1>
      <p>Who do you want to learn with today?</p>

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