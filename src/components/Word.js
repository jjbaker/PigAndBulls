import React from "react";

export default function Word(props) {
  function lettersOnly(event) {
    const char = event.charCode;
    if (!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)) {
      event.preventDefault();
      if(char==13){
        props.submitWord(props.id)
      }
    }
  }
  return (
    <div className="word">
      <h2>Player {props.id + 1}</h2>
      {props.msg && <h2>{props.msg}</h2>}
      {props.pTurn == props.id && !props.canGuess && (
        <div>
          <h3>Enter a 5 letter word that is not a proper noun with no duplicate letters.</h3>
          <input
            type="text"
            value={props.word}
            maxLength="5"
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
