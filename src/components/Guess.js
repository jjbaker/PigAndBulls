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
    guessBox.push(<div><input key={prop} type="text" readOnly={true} value={prop} />{guesses[prop][0]}{guesses[prop][1]}</div>)
  } 

 
  
  return (
    <div className="guess">
      {guessBox}
      <input type="text" 
        value={props.guess} 
        maxLength="5"
        onKeyPress={event => lettersOnly(event)}  
        onChange={(event) =>props.setWord("guess",event.target.value, props.id)}
      />
      <button type="button"  onClick={() => props.submitGuess(props.id)}>Submit</button>
    </div>
  )
}