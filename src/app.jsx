import React from 'react'
import { MTRow, MTColumn } from 'mt-ui'
import ExcelDropzone from './excel-dropzone.jsx'

import scores from './scores.js'
import users from './users.js'

import ScoreSubmitForm from './components/ScoreSubmitForm'
import Highscores from './components/Highscores'
import UserScores from './components/UserScores'

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      highscores: [],
      userScores: [],
      score: '',
      name: '',
      currUser: null
    }
  }


  componentDidMount() {
    this.updateHighscores();
  }



  handleNewScore = (name, score) => {

    this.submitScore(name, score);
    this.updateHighscores();

    // Remove conditional if you want to look up the users scores after submitting a new score
    if (this.state.currUser && 
        this.state.currUser === name) this.setUserScores(this.state.currUser); 
  }

  handleSheetData (data) {

    data.forEach((entry) => {
      this.submitScore(entry.name, entry.score);
    });

    this.updateHighscores();

    if (this.state.currUser) this.setUserScores(this.state.currUser); 
  }



  submitScore (name, score) {
    
    if (this.isNewUser(name)) users.push( {_id: users.length + 1, name: name} )
    scores.push( { userId: this.getId(name), score: score } )

  }



  getName (id) {

    var filteredUser = users.filter((user) => {
      return user._id === id
    })[0];

    return filteredUser.name;

  }

  getId (name) {

    var filteredUser = users.filter((user) => {
      return user.name === name
    })[0];

    return filteredUser._id

  }
  
  isNewUser(name) {

    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name) return false;
    } 

    return true;

  }



  getHighscores () {

    let highscoresMap = new Map();
  
    for (var score in scores) {
      const userId = scores[score].userId;
      const name = this.getName(userId);
      const newScore = scores[score].score;
      const oldScore = highscoresMap.get(name) ? highscoresMap.get(name) : 0;
  
      highscoresMap.set(name, Math.max(newScore, oldScore));
    }

    //Array required for sorting
    const highscoresArray = Array.from(highscoresMap, ([name, score]) => ({ name, score }))
  
    return highscoresArray;
  }
  
  sortScores(scores) { 
    const sortedScoreKeys = Object.keys( scores ).sort((a, b) => {
      return scores[b].score - scores[a].score;
    });
    const sortedScores = sortedScoreKeys.map((sortedKey) => {
      return scores[sortedKey];
    });
  
    return sortedScores;
  
  }
  
  updateHighscores() {

    let highscores = this.getHighscores();
    let sortedHighscores = this.sortScores(highscores);

    this.setState({highscores: sortedHighscores})

  }

  setUserScores = (name) => {

    let userScores = scores.filter((score) => { 
      return score.userId === this.getId(name);
    });   
        
    let sortedUserScores = this.sortScores(userScores);

    this.setState({currUser: name, 
                   userScores: [...sortedUserScores]})
  }


  

  render () {
    return (
      <div className="container container--centered">

        <h1 className="m-t">Mediatool exercise</h1>
        <MTRow>
          <MTColumn width={ 20 }>
            <ExcelDropzone
              onSheetDrop={ e => this.handleSheetData(e) }
              label="Drop your file here"
            />
          </MTColumn>
          <MTColumn width={ 75 } offset={ 5 }>
            <div>
              <h2>Initial site</h2>
              <p>
                Drop the excel file scores.xlsx that you will find
                in this repo in the area to the left and watch the log output in the console.
                We hope this is enough to get you started with the import.
              </p>
            </div>
            <div>
              <h2>Explaining the grid</h2>
              <p>
                In the Mediatool grid you can use MTRow and MTColumn
                to structure your graphical components.
                This is basically what you need to know:
              </p>
              <ul>
                <li>
                  The index.jsx file uses these components so you
                  can see an example of how they work
                </li>
                <li>MTRow will always create a line break</li>
                <li>
                  MTColumns will stretch to the width of the entire row,
                  unless you use the properties width and offset
                </li>
                <li>Width and offset is set in percent</li>
              </ul>
            </div>
          </MTColumn>
        </MTRow>
      
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <h1>Solution</h1>
        <hr></hr>

        <ScoreSubmitForm onSubmit={this.handleNewScore}></ScoreSubmitForm>

        <MTRow className = 'scores'>
          <Highscores 
            scores={this.state.highscores} 
            onUserClick={this.setUserScores}/>
          <UserScores 
            user={this.state.currUser}
            scores={this.state.userScores}  />
        </MTRow>
      </div>
    )
  }
}
