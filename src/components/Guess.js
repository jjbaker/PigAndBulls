import React from "react"

export default function Guess(props){
  function lettersOnly(event) {
    const char = event.charCode
    if(!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)){
      event.preventDefault();
    }
  }

  const guesses = props.guesses;
  const guessBox = [];
  for(const prop in guesses){
    guessBox.push(<tr><td><input key={prop} type="text" readOnly={true} value={prop} /></td><td>{guesses[prop][0]}</td><td>{guesses[prop][1]}</td></tr>)
  } 

 
  
  return (
    <div className="guess">
      <table>
        <tbody>
          <tr>
            <td>
      {props.pTurn==props.id && <input type="text" 
        value={props.guess} 
        maxLength="5"
        onKeyPress={event => lettersOnly(event)}  
        onChange={(event) =>props.setWord("guess",event.target.value, props.id)}
        autofocus
      />}
      </td><td colSpan="2">
      {props.pTurn==props.id && <button type="button"  onClick={() => props.submitGuess(props.id)}>Guess</button>}
      </td>
      </tr>
      <tr>
        <td>Guess</td>
        <td>Pigs</td>
        <td>Bulls</td>
        </tr>
    
          {guessBox}
          </tbody>
      </table>
    </div>
  )
}