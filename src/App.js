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
  function createPlayers() {
    const newPlayers = [];
    for (let i = 0; i < 2; i++) {
      newPlayers.push({
        word: "",
        guess: "",
        id: i,
        guesses: {},
        won: false,
        victoryM:""
      });
    }
    return newPlayers;
  }

  function setWord(key, word, id) {
    setPlayers((oldPlayers) =>
      oldPlayers.map((player) => {
        return player.id == id ? { ...player, [key]: word } : player;
      })
    );
  }
  function validateWord(word) {
    if (word.length != 5) {
      return false;
    }
    if (/(.).*\1/.test(word)) {
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(word)) {
      return false;
    }
    return true;
  }

  function submitWord(id) {
    const word = players.find((p) => p.id == id).word.toLowerCase();
    if (validateWord(word)) {
      setPTurn((oldTurn) => 1 - oldTurn);
      if (pTurn == 1) {
        setCanGuess(true);
      }
    }
  }

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

  function submitGuess(id) {
    const play = players.find((p) => p.id == id);
    const word = play.guess.toLowerCase();

    if (validateWord(word)) {
      if (word in play.guesses) {
        return;
      }

      const pigsBulls = countPBs(
        players.find((p) => p.id != id).word.toLowerCase(),
        word
      );
      setPlayers((oldPlayers) =>
        oldPlayers.map((player) => {
          return player.id == id
            ? {
                ...player,
                guesses: { [word]: pigsBulls, ...player.guesses },
                guess: "",
                won: pigsBulls[1] === 5,
              }
            : player;
        })
      );

      if (!players[1 - id].won) {
        setPTurn((oldTurn) => 1 - oldTurn);
      } else if (pigsBulls[1] === 5) {
        setPTurn(2);
      }
    }
  }
  function createNewGame() {
    setPlayers(createPlayers());
    setPTurn(0);
    setCanGuess(false)
    setNewGame(false)
  }
  const words = players.map((p) => (
    <div
      className="player--box"
      style={
        p.id === pTurn ? { border: "medium solid white" } : { border: "none" }
      }
    >
      <Word
        key={p.id}
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

  React.useEffect(()=>{
    const winners = players.filter(p => p.won===true).length;
    const message =  players.filter(p => p.victoryM.length>0).length;
    if(winners==2 || (winners==1 && Object.keys(players[1].guesses).length == Object.keys(players[0].guesses).length)){
      if(winners==2 && message==0){
        setPlayers(oldPlayers => oldPlayers.map(p => {
          return { ...p, victoryM:"Nice Job. You Tied!"}
        }))
      }
      else if(message==0){
        setPlayers(oldPlayers => oldPlayers.map(p => {
          return { ...p, victoryM:p.won ? "Nice Job. You won!": "Nice Try."}
        }))
      }
      setNewGame(true)
    }
  },[players[0].guesses,players[1].guesses])
  return (
    <div className="game">
      <Header />
      <Split sizes={[50, 50]} className="split">
        {words}
      </Split>
      <div className="center">
        {newGame && <button className="button-31" type="button" onClick={createNewGame}>New Game</button>}</div>
      <Rules />
    </div>
  );
}
