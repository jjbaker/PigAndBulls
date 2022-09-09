import React from "react";
import Header from "./components/Header.js";
import Split from "react-split";
import PlayerBox from "./components/PlayerBox.js";
import Rules from "./components/Rules.js";
import "./style.css";

export default function App() {
  const [players, setPlayers] = React.useState(createPlayers());
  const [turn, setTurn] = React.useState(0);
  const [newGame, setNewGame] = React.useState(false);
  const [gameNum, setGameNum] = React.useState(0);

  //Creates player objects to setup initial state
  function createPlayers() {
    const newPlayers = [];
    for (let i = 0; i < 2; i++) {
      newPlayers.push({
        word: "",
        id: i,
        won: false,
        victoryMsg: "",
        numGuesses: 0,
      });
    }
    return newPlayers;
  }

  //updates state for players' word
  function setPlayerWord(word) {
    setPlayers((oldPlayers) =>
      oldPlayers.map((p) => {
        return p.id === turn ? { ...p, word: word } : p;
      })
    );
  }
  //updates state for number of player guesses
  function incGuess() {
    setPlayers((oldPlayers) =>
      oldPlayers.map((p) => {
        return p.id === turn ? { ...p, numGuesses: p.numGuesses + 1 } : p;
      })
    );
  }
  //updates state for player win
  function setWin() {
    setPlayers((oldPlayers) =>
      oldPlayers.map((p) => {
        return p.id === turn ? { ...p, won: true } : p;
      })
    );
  }
  //updates turn state
  function nextTurn(catchAsync = false) {
    const next = 1 - turn;
    if (!players[next].won) {
      setTurn(next);
    } else if (players[turn].won || catchAsync) {
      setTurn(2);
    }
  }
  //resets states for new game
  function createNewGame() {
    setPlayers(createPlayers());
    setTurn(0);
    setNewGame(false);
    setGameNum((old) => old + 2);
  }
  //after each guess, looks for winner and sets "win" message
  React.useEffect(() => {
    const winners = players.filter((p) => p.won === true).length;
    const message = players.filter((p) => p.victoryMsg.length > 0).length;
    if (winners == 2 || (winners == 1 && players[0].numGuesses === players[1].numGuesses)) {
      if (winners == 2 && message == 0) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((p) => {
            return { ...p, victoryMsg: "Nice Job. You Tied!" };
          })
        );
      } else if (message == 0) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((p) => {
            return {
              ...p,
              victoryMsg: p.won ? "Nice Job. You won!" : "Nice Try.",
            };
          })
        );
      }
      setNewGame(true);
    }
  }, [players[0].numGuesses, players[1].numGuesses]);

  const playerBoxes = [];
  for (let i = 0; i < players.length; i++) {
    playerBoxes.push(
      <PlayerBox
        key={players[i].id + gameNum}
        id={players[i].id}
        word={players[i].word}
        won={players[i].won}
        victoryMsg={players[i].victoryMsg}
        oppWord={players[1 - i].word}
        setPlayerWord={setPlayerWord}
        turn={turn}
        setTurn={nextTurn}
        incGuess={incGuess}
        setWin={setWin}
      />
    );
  }

  return (
    <div className="game">
      <Header />
      <Split key={gameNum} sizes={[50, 50]} className="split">
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
