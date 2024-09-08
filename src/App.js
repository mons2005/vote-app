import React, { useState } from 'react';
import './App.css';

function App() {
  const [votes, setVotes] = useState({
    Dora: 0,
    ChotaBheem: 0,
    Ben10: 0,
    MrBean: 0,
    Shinchan: 0,
    Doremon: 0,
    TomAndJerry: 0
  });

  // URLs of images from the web
  const characterImages = {
    Dora: 'https://vignette.wikia.nocookie.net/doratheexplorer/images/b/b5/1010191148418107051.png/revision/latest?cb=20150907052505',
    ChotaBheem: 'https://th.bing.com/th/id/OIP.HeMQz5hl3OY64AoQV9oCqAAAAA?w=170&h=349&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    Ben10: 'https://3.bp.blogspot.com/-4pLhDEEY_2w/ThBeizcVykI/AAAAAAAAA3I/O3D1YWhsTKQ/s1600/Benc.jpg',
    MrBean: 'https://clipground.com/images/mr-bean-clipart-1.jpg',
    Shinchan: 'https://www.enwallpaper.com/wp-content/uploads/2021/05/400-4009174-cartoon-crayon-shin-chan-hd-png-download.png',
    Doremon: 'https://th.bing.com/th/id/OIP.Jxgb9GwfTqedcxJ6yft6YQHaHu?rs=1&pid=ImgDetMain',
    TomAndJerry: 'https://th.bing.com/th/id/OIP.oIiTWTkv9ogE_O9R6MSgfwHaI4?rs=1&pid=ImgDetMain'
  };

  const handleVote = (character) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [character]: prevVotes[character] + 1
    }));
  };

  const handleRemoveVote = (character) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [character]: Math.max(0, prevVotes[character] - 1)
    }));
  };

  const sortedCharacters = Object.keys(votes).sort((a, b) => votes[b] - votes[a]);
  const topThreeWinners = sortedCharacters.filter(character => votes[character] > 0).slice(0, 3);

  const allVotesZero = Object.values(votes).every(vote => vote === 0);

  return (
    <div className="App">
      <h1>Vote for Your Favorite Cartoon Character</h1>
      <div className="voting-section">
        {Object.keys(votes).map(character => (
          <div key={character} className="character">
            <img 
              src={characterImages[character]} 
              alt={character} 
              className="character-img"
            />
            <h2>{character}</h2>
            <p>Votes: {votes[character]}</p>
            <div className="vote-buttons">
              <button onClick={() => handleVote(character)}>Vote</button>
              <button onClick={() => handleRemoveVote(character)}>Remove Vote</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Results</h2>
      <div className="results-container">
        <div className="results-box">
          {sortedCharacters.map(character => (
            <div key={character} className="result-item">
              <img 
                src={characterImages[character]} 
                alt={character} 
                className="result-img"
              />
              <h3>{character}</h3>
              <p>{votes[character]} votes</p>
            </div>
          ))}
        </div>
      </div>

      <h2>Top 3 Winners</h2>
      <div className="winners-container">
        {!allVotesZero && topThreeWinners.length > 0 ? (
          topThreeWinners.map((winner, index) => (
            <div key={winner} className="winner-item">
              <img 
                src={characterImages[winner]} 
                alt={winner} 
                className="winner-img"
              />
              <h3>{`${index + 1}. ${winner}`}</h3>
              <p>{votes[winner]} votes</p>
            </div>
          ))
        ) : (
          <p>No votes yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
