import React from "react";
import Header from "./components/Header.js";
import Split from "react-split";
import Word from "./components/Word.js";
import Guess from "./components/Guess.js";
import Rules from "./components/Rules.js";
import "./style.css";

export default function App() {
  const [players, setPlayers] = React.useState(createPlayers());
  const [pTurn, setPTurn] = React.useState(0);
  const [canGuess, setCanGuess] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  //Creates player objects to setup initial state
  function createPlayers() {  
    const newPlayers = [];
    for (let i = 0; i < 2; i++) {
      newPlayers.push({
        word: "",
        guess: "",
        id: i,
        guesses: {},
        won: false,
        victoryM: "",
      });
    }
    return newPlayers;
  }

  //updates state for players' word and guesses
  function setWord(key, word, id) { 
    setPlayers((oldPlayers) =>
      oldPlayers.map((p) => {
        return p.id == id ? { ...p, [key]: word } : p;
      })
    );
  }

  //makes sure word follows rules
  function validateWord(word) { 
    if (word.length != 5) { 
      setErrorMsg("Must be 5 letters");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(word)) { 
      setErrorMsg("Only letters allowed");
      return false;
    }
    if (/(.).*\1/.test(word)) { 
      setErrorMsg("No duplicate letters");
      return false;
    }
    setErrorMsg("");
    return true;
  }

  //sets player word - starts guessing when both players set their word
  function submitWord(id) {
    const word = players[id].word.toLowerCase();
    if (validateWord(word)) {
      setPTurn((oldTurn) => 1 - oldTurn);
      if (pTurn == 1) {
        setCanGuess(true);
      }
    }
  }

  //counts pigs and bulls
  function countPBs(word, guess) {
    let pigs = 0;
    let bulls = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] == guess[i]) {
        bulls++;
      } else if (word.includes(guess[i])) {
        pigs++;
      }
    }
    return [pigs, bulls];
  }

  //handles player guesses
  function submitGuess(id) {
    const player = players[id];
    const opponent = players[1-id];
    const guess = player.guess.toLowerCase();

    if (validateWord(guess)) {
      if (guess in player.guesses) {
        setErrorMsg("Already guessed that");
        return;
      }

      const pigsBulls = countPBs(opponent.word,guess);
      
      setPlayers((oldPlayers) =>
        oldPlayers.map((p) => {
          return p.id == id
            ? {
                ...p,
                guesses: { [guess]: pigsBulls, ...p.guesses },
                guess: "",
                won: pigsBulls[1] === 5,
              }
            : p;
        })
      );

      if (!opponent.won) {
        setPTurn((oldTurn) => 1 - oldTurn);
      } else if (pigsBulls[1] === 5) {
        setPTurn(2);
      }
    }
  }

  //resets states for new game
  function createNewGame() {
    setPlayers(createPlayers());
    setPTurn(0);
    setCanGuess(false);
    setNewGame(false);
  }

  //after each guess, looks for winner and sets "win" message
  React.useEffect(() => {
    const winners = players.filter((p) => p.won === true).length;
    const message = players.filter((p) => p.victoryM.length > 0).length;
    if (winners == 2 || (winners == 1 && 
      Object.keys(players[1].guesses).length == Object.keys(players[0].guesses).length)) {
      if (winners == 2 && message == 0) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((p) => {
            return { ...p, victoryM: "Nice Job. You Tied!" };
          })
        );
      } else if (message == 0) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((p) => {
            return {
              ...p,
              victoryM: p.won ? "Nice Job. You won!" : "Nice Try.",
            };
          })
        );
      }
      setNewGame(true);
    }
  }, [players[0].guesses, players[1].guesses]);

  const playerBoxes = players.map((p) => (
    <div
      key={p.id}
      className="player--box"
      style={
        p.id === pTurn ? { border: "medium solid white" } : { border: "none" }
      }
    >
      <Word
        error={errorMsg}
        id={p.id}
        pTurn={pTurn}
        canGuess={canGuess}
        word={p.word}
        submitWord={submitWord}
        setWord={setWord}
        msg={p.victoryM}
      />
      {canGuess && (
        <Guess
          error={errorMsg}
          won={p.won}
          pTurn={pTurn}
          id={p.id}
          guesses={p.guesses}
          guess={p.guess}
          setWord={setWord}
          submitGuess={submitGuess}
        />
      )}
    </div>
  ));

  
  return (
    <div className="game">
      <Header />
      <Split sizes={[50, 50]} className="split">
        {playerBoxes}
      </Split>
      <div className="center">
        {newGame && (
          <button className="button-31" type="button" onClick={createNewGame}>
            New Game
          </button>
        )}
      </div>
      <Rules />
    </div>
  );
}
