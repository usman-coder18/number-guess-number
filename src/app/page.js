"use client"
import React, { useState, useEffect } from "react";
import "./globals.css";

const GuessNumberGame = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [lastResult, setLastResult] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert("Please enter a valid number between 1 and 100.");
      return;
    }

    setGuesses((prevGuesses) => [...prevGuesses, guess]);
    setRemainingAttempts((prevAttempts) => prevAttempts - 1);

    if (guess === randomNumber) {
      setLastResult(`Congratulations! You guessed it right.`);
      setMessage(`You guessed the number in ${guesses.length + 1} attempts.`);
      setGameOver(true);
    } else if (guess < randomNumber) {
      setLastResult("Too low!");
      setMessage("Try a higher number.");
    } else {
      setLastResult("Too high!");
      setMessage("Try a lower number.");
    }

    if (remainingAttempts === 1) {
      setMessage(`Game Over! The correct number was ${randomNumber}.`);
      setGameOver(true);
    }

    setUserGuess("");
  };

  const startNewGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuesses([]);
    setRemainingAttempts(10);
    setLastResult("");
    setMessage("");
    setGameOver(false);
    setUserGuess("");
  };

  return (
    <div id="wrapper">
      <h1>Number Guessing Game</h1>
      <p>Try to guess a random number between 1 and 100.</p>
      <p>You have {remainingAttempts} attempts to guess the right number.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="guessField" id="guess">
          Guess a number:
        </label>
        <input
          type="number"
          id="guessField"
          className="guessField"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={gameOver}
        />
        <input
          type="submit"
          id="subt"
          value="Submit guess"
          className="guessSubmit"
          disabled={gameOver}
        />
      </form>

      <div className="resultParas">
        <p>
          Previous Guesses: <span className="guesses">{guesses.join(", ")}</span>
        </p>
        <p>
          Guesses Remaining: <span className="lastResult">{remainingAttempts}</span>
        </p>
        <p className="lowOrHi">{message}</p>
        <p>{lastResult}</p>
      </div>

      {gameOver && (
        <div className="resultParas">
          <button onClick={startNewGame}>Start New Game</button>
        </div>
      )}
    </div>
  );
};

export default GuessNumberGame;
