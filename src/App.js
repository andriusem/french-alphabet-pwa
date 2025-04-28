import React, { useState } from "react";
import "./App.css";

// French alphabet data: letter, type (vowel/consonant), IPA pronunciation
const ALPHABET = [
  { letter: "A", type: "vowel", ipa: "/a/" },
  { letter: "B", type: "consonant", ipa: "/be/" },
  { letter: "C", type: "consonant", ipa: "/se/" },
  { letter: "D", type: "consonant", ipa: "/de/" },
  { letter: "E", type: "vowel", ipa: "/ə/" },
  { letter: "F", type: "consonant", ipa: "/ɛf/" },
  { letter: "G", type: "consonant", ipa: "/ʒe/" },
  { letter: "H", type: "consonant", ipa: "/aʃ/" },
  { letter: "I", type: "vowel", ipa: "/i/" },
  { letter: "J", type: "consonant", ipa: "/ʒi/" },
  { letter: "K", type: "consonant", ipa: "/ka/" },
  { letter: "L", type: "consonant", ipa: "/ɛl/" },
  { letter: "M", type: "consonant", ipa: "/ɛm/" },
  { letter: "N", type: "consonant", ipa: "/ɛn/" },
  { letter: "O", type: "vowel", ipa: "/o/" },
  { letter: "P", type: "consonant", ipa: "/pe/" },
  { letter: "Q", type: "consonant", ipa: "/ky/" },
  { letter: "R", type: "consonant", ipa: "/ɛʁ/" },
  { letter: "S", type: "consonant", ipa: "/ɛs/" },
  { letter: "T", type: "consonant", ipa: "/te/" },
  { letter: "U", type: "vowel", ipa: "/y/" },
  { letter: "V", type: "consonant", ipa: "/ve/" },
  { letter: "W", type: "consonant", ipa: "/dubləve/" },
  { letter: "X", type: "consonant", ipa: "/iks/" },
  { letter: "Y", type: "vowel", ipa: "/igʁɛk/" },
  { letter: "Z", type: "consonant", ipa: "/zɛd/" },
];

function App() {
  const [flipped, setFlipped] = useState(Array(26).fill(false));
  const audioRef = React.useRef(null);

  const handleClick = (idx) => {
    setFlipped((prev) => prev.map((_, i) => i === idx));
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const letter = ALPHABET[idx].letter.toUpperCase();
    const audio = new window.Audio(process.env.PUBLIC_URL + `/sound/${letter}.mp3`);
    audioRef.current = audio;
    audio.play();
  };

  return (
    <div className="container">
      <img
        src={process.env.PUBLIC_URL + "/speaker.webp"}
        alt="Speaker icon"
        className="speaker-icon"
        style={{ display: "block", margin: "0 auto 1rem", width: 64, height: 64 }}
      />
      <div className="alphabet-grid">
        {ALPHABET.map((item, idx) => (
          <button
            key={item.letter}
            className={`alpha-btn ${item.type} ${flipped[idx] ? "flipped" : ""}`}
            onClick={() => handleClick(idx)}
            aria-label={`Play pronunciation for ${item.letter}`}

          >
            <div className="flip-inner">
              <span className="front">{item.letter}</span>
              <span className="back">{item.letter.toLowerCase()}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
