import React, { useState } from 'react'

const ScoreSubmitForm = ( { onSubmit } ) => {

    const [score, setScore] = useState('')
    const [name, setName] = useState('')

    return (
        <form onSubmit={e => { e.preventDefault(); onSubmit(name, score)}}>
          <input required placeholder="name" 
                 value={name}
                 onChange={e => setName(e.target.value)} />
          <input required placeholder="score" type='number' step='any' min='0' 
                 value={score}
                 onChange={e => setScore(e.target.value)} />
          <button type='submit'>Submit Score</button>
        </form>
    )
}

export default ScoreSubmitForm