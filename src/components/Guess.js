import React from "react";

export default function Guess(props) {
  function lettersOnly(event) {
    const char = event.charCode;
    if (!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)) {
      event.preventDefault();
    }
  }

  const guesses = props.guesses;
  const guessBox = [];
  for (const prop in guesses) {
    guessBox.push(
      <tr>
        <td>
          <input key={prop} type="text" readOnly={true} value={prop} />
        </td>
        <td>{guesses[prop][0]}</td>
        <td>{guesses[prop][1]}</td>
      </tr>
    );
  }

  const styles = {
    visibility: props.pTurn == props.id ? "visible" : "hidden"
  };
  

  return (
    <div className="guess">
      
      {!props.won && (<div style={styles}><h3>Guess your oponents word.</h3><input
        type="text"
        value={props.guess}
        maxLength="5"
        onKeyPress={(event) => lettersOnly(event)}
        onChange={(event) =>
          props.setWord("guess", event.target.value, props.id)
        }
        //autoFocus
      />
      <button
          className="button-31"
          type="button"
          onClick={() => props.submitGuess(props.id)}
        >
          Guess
        </button></div>)}

    
      {Object.keys(guesses).length != 0 && (
        <table>
          <tbody  className={props.won ? "table--won":"table--"}>
            <tr>
              <th>Guess</th>
              <th>Pigs</th>
              <th>Bulls</th>
            </tr>

            {guessBox}
          </tbody>
        </table>
      )}
    </div>
  );
}
