import React from "react";

export default function Word(props) {
  function lettersOnly(event) {
    const char = event.charCode;
    if (!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)) {
      event.preventDefault();
    }
  }
  return (
    <div className="word">
      <h2>Player {props.id + 1}</h2>
      {props.msg && <h2>{props.msg}</h2>}
      {props.pTurn == props.id && !props.canGuess && (
        <div>
          <input
            type="text"
            value={props.word}
            maxlength="5"
            onKeyPress={(event) => lettersOnly(event)}
            onChange={(event) =>
              props.setWord("word", event.target.value, props.id)
            }
            //autoFocus
          />
          <button
            className="button-31"
            type="button"
            onClick={() => props.submitWord(props.id)}
          >
            Set Word
          </button>
        </div>
      )}
    </div>
  );
}

//(event) => /[a-z]/i.test(event.key)
