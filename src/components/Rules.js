import React from 'react'

export default function Rules(){
  return (
    <div className="rules">
      <p>Each player submits a 5 letter word without any duplicate letters that is not a proper noun. Players then guess their opponents word using 5 letter words without duplicate letters(can be proper nouns). One Bull is scored whenever a letter in the guess is in the same spot as the opponents word. One Pig is scored whenever a letter in the guess is in the opponent's word, but in a different location. Examples are:</p>
      <table>
        <tbody>
          <tr>
            <td>Word</td>
            <td>Guess</td>
            <td>Pigs</td>
            <td>Bulls</td>
          </tr>
          <tr>
            <td>freak</td>
            <td>count</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>freak</td>
            <td>frost</td>
            <td>0</td>
            <td>2</td>
          </tr>
          <tr>
            <td>freak</td>
            <td>peaky</td>
            <td>3</td>
            <td>0</td>
          </tr>
          <tr>
            <td>freak</td>
            <td>frame</td>
            <td>2</td>
            <td>2</td>
          </tr>

          </tbody>
          </table>
      <p>The player to guess their opponents word in the least guesses wins.</p>
    </div>
  )
}