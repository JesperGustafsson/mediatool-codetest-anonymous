import React from 'react'

const UserScores = ( {scores, user} ) => {

    return (
        
        user ? 
        <div className = 'sidedisplay'>
            <h1>{user}'s scores</h1>
                {
                scores?.map((score, index) => {
                    return <p key={index}>{score.score}</p>
                })
                }
        </div>
            :
        <div className = 'sidedisplay'></div>
    )
}

export default UserScores