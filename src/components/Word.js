import React from 'react'

export default function Word(props) {
  function lettersOnly(event) {
    const char = event.charCode
    if(!(char >= 65 && char <= 90) && !(char >= 97 && char <= 122)){
      event.preventDefault();
    }
  }
  return (
    <div className="guess">
      <input type="text" 
        value={props.word} 
        maxlength="5" 
        onKeyPress={event => lettersOnly(event)} 
        onChange={(event) =>props.setWord("word",event.target.value, props.id)}  
      />
      <button type="button" onClick={() => props.submitWord(props.id)}>Submit</button>
    </div>
  )
}

//(event) => /[a-z]/i.test(event.key)