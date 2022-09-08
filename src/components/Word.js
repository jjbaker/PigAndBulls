import React from "react";

export default function Word(props) {
  function lettersOnly(event) {
    const char = event.charCode;
    if (!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)) {
      event.preventDefault();
      if (char == 13) {
        props.submitWord(props.id);
      }
    }
  }
  
  return (
    <div className="word">
      <h2>Player {props.id + 1}</h2>
      {props.msg && <h2 className="h2--victory">{props.msg}</h2>}
      {props.pTurn == props.id && !props.canGuess && (
        <div className="rel">
          <h3>
            Enter a 5 letter word with no duplicate letters that is not a proper
            noun.
          </h3>
          <input
            id="focus"
            type="text"
            value={props.word}
            maxLength="5"
            onKeyPress={(event) => lettersOnly(event)}
            onChange={(event) =>
              props.setWord("word", event.target.value, props.id)
            }
            autoFocus
          />
          <button
            className="button-31"
            type="button"
            onClick={() => props.submitWord(props.id)}
          >
            Set Word
          </button>

          <h5 className="warning">{props.error}</h5>
        </div>
      )}
    </div>
  );
}

