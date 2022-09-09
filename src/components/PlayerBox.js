import React from "react";

export default function PlayerBox(props) {
  const [guess, setGuess] = React.useState("");
  const [guesses, setGuesses] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [canGuess, setCanGuess] = React.useState(false);

  //only allows letter input to text box
  function lettersOnly(event) {
    const char = event.charCode;
    if (!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)) {
      event.preventDefault();
      if (char == 13) {
        submitWord(event.target.name);
      }
    }
  }
  //checks word input to make sure rules are followed
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
  //updates state for player word and guesses
  function setWord(word) {
    !canGuess ? props.setPlayerWord(word) : setGuess(word);
  }
  //count pigs and bulls for guess against word
  function countPBs(oppWord, guess) {
    let pigs = 0;
    let bulls = 0;
    for (let i = 0; i < oppWord.length; i++) {
      if (oppWord[i] == guess[i]) {
        bulls++;
      } else if (oppWord.includes(guess[i])) {
        pigs++;
      }
    }
    return [pigs, bulls];
  }
  //validates and submits player words and guesses
  function submitWord() {
    let word = !canGuess ? props.word : guess;
    word = word.toLowerCase();
    let pigsBulls;

    if (validateWord(word)) {
      if (!canGuess) {
        props.setPlayerWord(word)
        setCanGuess(true);
      } else {
        if (word in guesses) {
          setErrorMsg("Already guessed that");
          return;
        }
        pigsBulls = countPBs(props.oppWord, word);
        setGuesses((oldGuesses) => {
          return { [word]: pigsBulls, ...oldGuesses };
        });
        setGuess("");
        props.incGuess();
        if (pigsBulls[1] === 5) {
          props.setWin();
        }
      }
      props.setTurn(pigsBulls && pigsBulls[1] === 5);
    }
  }

  const guessRows = [];
  for (const g in guesses) {
    guessRows.push(
      <tr key={g}>
        <td>
          <input type="text" readOnly={true} value={g} />
        </td>
        <td>{guesses[g][0]}</td>
        <td>{guesses[g][1]}</td>
      </tr>
    );
  }

  const hideStyle = {
    visibility: props.turn == props.id ? "visible" : "hidden",
  };
  const highlightTurn = {
    border: props.turn == props.id ? "medium solid white" : "none",
  };
  return (
    <div className="playerbox" style={highlightTurn}>
      <h2> Player {props.id + 1}</h2>
      <h2 className="h2--victory">{props.victoryMsg}</h2>
      {!props.won && (
        <div style={hideStyle}>
          <h3>
            {!canGuess
              ? "Enter any 5 letter word with no duplicate letters that is not a proper noun."
              : "Guess your opponent's word"}
          </h3>

          <div className="rel">
            {props.turn == props.id && (
              <input
                type="text"
                value={!canGuess ? props.word : guess}
                maxLength="5"
                onKeyPress={(event) => lettersOnly(event)}
                onChange={(event) => setWord(event.target.value)}
                autoFocus
              />
            )}
            <button
              className="button-31"
              type="button"
              onClick={(event) => submitWord()}
            >
              {!canGuess ? "Set Word" : "Guess"}
            </button>
            <h5 className="warning">{errorMsg}</h5>
          </div>
        </div>
      )}
      {guessRows != 0 && (
        <table>
          <tbody className={props.won ? "table--won" : "table--"}>
            <tr>
              <th>Guess</th>
              <th>Pigs</th>
              <th>Bulls</th>
            </tr>

            {guessRows}
          </tbody>
        </table>
      )}
    </div>
  );
}
