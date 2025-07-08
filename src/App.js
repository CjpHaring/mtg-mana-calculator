import React, { useState, useEffect } from "react";
import "./App.css";

const MODES = {
  commander: 38,
  standard: 23,
  draft: 16,
};

const DECK_SIZES = {
  commander: 100,
  standard: 60,
  draft: 40,
};

const COLORS = [
  { name: "white", label: "White", image: "/images/plains.svg" },
  { name: "blue", label: "Blue", image: "/images/island.svg" },
  { name: "black", label: "Black", image: "/images/swamp.svg" },
  { name: "red", label: "Red", image: "/images/mountain.svg" },
  { name: "green", label: "Green", image: "/images/forest.svg" },
];

export default function App() {
  const [mode, setMode] = useState("commander");
  const [deckSize, setDeckSize] = useState(100);
  const [colorCounts, setColorCounts] = useState({
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0,
  });
  const [maxManaCards, setMaxManaCards] = useState(MODES[mode]);

  useEffect(() => {
    const newMax = MODES[mode];
    setMaxManaCards(newMax);
    const deckSizeForMode = DECK_SIZES[mode];
    setDeckSize(deckSizeForMode);
  }, [mode]);

  const totalColorCount = Object.values(colorCounts).reduce((a, b) => a + b, 0);

  const manaBase = {};
  for (let color in colorCounts) {
    manaBase[color] = totalColorCount
      ? Math.round((colorCounts[color] / totalColorCount) * maxManaCards)
      : 0;
  }

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColorCounts({ ...colorCounts, [name]: parseInt(value) || 0 });
  };

  const handleMaxManaChange = (e) => {
    setMaxManaCards(parseInt(e.target.value) || 0);
  };

  const handleDeckSizeChange = (e) => {
    setDeckSize(parseInt(e.target.value) || 0);
  };

  return (
    <div className="app">
      <h1>MTG Mana Calculator</h1>

      <div className="controls">
        <div className="row-input">
          <label>
            Game Mode:
          </label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="commander">Commander</option>
            <option value="standard">Standard</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="row-input">
          <label>
            Deck Size:
          </label>
            <input type="number" value={deckSize} onChange={handleDeckSizeChange} />
        </div>
        <div className="row-input">
          <label>
            Max Mana Cards:
          </label>
          <input type="number" value={maxManaCards} onChange={handleMaxManaChange} />
        </div>
      </div>
      <div className="color-inputs">
        {COLORS.map(({ name, label, image }) => (
          <div key={name} className="color-box">
            <div className="image-wrapper">
              <img src={image} alt={label} />
              <span className="mana-count">{manaBase[name]}</span>
            </div>
            <div className="row-input">
              <label>
                {label} Cost:
              </label>
              <input
                type="number"
                name={name}
                value={colorCounts[name]}
                onChange={handleColorChange}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
