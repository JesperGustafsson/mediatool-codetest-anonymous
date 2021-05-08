import React from 'react'

const Highscores = ( {scores, onUserClick} ) => {
    
    return (

        <div className = 'highscore'>
            <h1>Highscores</h1>

                {   
                scores.map((score) => {
                    return <button key = {score.name} onClick={(e) => onUserClick(score.name)}>{score.name} - {score.score}</button>
                })
                }
            
        </div>
    )
}

export default Highscores