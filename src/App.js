import React from "react";
import Header from "./components/Header.js";
import Split from "react-split";
import Word from "./components/Word.js";
import Guess from "./components/Guess.js";
import { nanoid } from "nanoid";
import "./style.css";

export default function App() {
  const [players, setPlayers] = React.useState(createPlayers());
  const [canGuess, setCanGuess] = React.useState(false);
  function createPlayers() {
    const newPlayers = [];
    for (let i = 0; i < 2; i++) {
      newPlayers.push({
        word: "",
        guess: "",
        id: nanoid(),
        guesses: {},
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
    return true;
  }

  function submitWord(id) {
    const word = players.find((p) => p.id == id).word.toLowerCase();
    if (validateWord(word)) {
      setCanGuess(true);
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
    const word = players.find((p) => p.id == id).guess.toLowerCase();
    if (validateWord(word)) {
      const pigsBulls = countPBs(
        players.find((p) => p.id != id).word.toLowerCase(),
        word
      );
      setPlayers((oldPlayers) =>
        oldPlayers.map((player) => {
          return player.id == id
            ? {
                ...player,
                guesses: { ...player.guesses, [word]: pigsBulls },
                guess: "",
              }
            : player;
        })
      );
    }
  }
  const words = players.map((p) => (
    <div>
      <Word
        key={p.id}
        id={p.id}
        word={p.word}
        submitWord={submitWord}
        setWord={setWord}
      />
      {canGuess && (
        <Guess
          id={p.id}
          guesses={p.guesses}
          guess={p.guess}
          setWord={setWord}
          submitGuess={submitGuess}
        />
      )}
    </div>
  ));
  /*React.useEffect(() =>{
    players[0].word="qwert";
    players[1].word="qwert";
    setCanGuess(true);
  },[])*/
  return (
    <div>
      <Header />
      <Split sizes={[50, 50]} className="split">
        {words}
      </Split>
    </div>
  );
}
