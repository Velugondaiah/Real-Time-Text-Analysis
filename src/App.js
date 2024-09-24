
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [uniqueWords, setUniqueWords] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');


  const getUniqueWordCount = (inputText) => {
    const words = inputText.toLowerCase().replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean); 
    const uniqueWordsSet = new Set(words);
    console.log(uniqueWordsSet)
    return uniqueWordsSet.size;
  };

  const getCharacterCount = (inputText) => {
    return inputText.replace(/[\W_]+/g, '').length; 
  };


  useEffect(() => {
    setUniqueWords(getUniqueWordCount(text));
    setCharCount(getCharacterCount(text));
  }, [text]);

  const handleReplace = () => {
    const regex = new RegExp(searchTerm, 'g');
    console.log(regex)
    const replacedText = text.replace(regex, replaceTerm);
    console.log(replacedText)
    setText(replacedText);

    const highlighted = replacedText.replace(
      new RegExp(replaceTerm, 'g'),
      `<mark>${replaceTerm}</mark>`
    );
    setHighlightedText(highlighted);
    setSearchTerm("")
    setReplaceTerm("")
  };

  return (
    <div className="container">
      <h1 className='main-heading'>Real-Time Text Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        rows="10"
      ></textarea>

      <div className="stats">
        <p className='words-count'>Unique Words: <span> {uniqueWords}</span></p>
        <p className='words-count'>Character Count (excluding spaces and punctuation): <span> {charCount}</span></p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for..."
           className='input'
        />
        <input
          type="text"
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
          placeholder="Replace with..."
          className='input'
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div
        className="highlighted-text"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    </div>
  );
};

export default App;
