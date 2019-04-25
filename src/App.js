import React, { Component } from 'react';
import logo from './friedhead.svg';
import Word from './Words/Words'
import './App.css';


class App extends Component {

  state = {
    dataLoaded: false,
    yourQuote: []
  }


// ------  FUNCTIONS ------ //


fetchQuote = async () => {
//Fetches a quote, for first render and onClick

  let quote = ''
     
  let index = Math.floor(Math.random()*40+1)
  const api_call = await fetch('https://api.whatdoestrumpthink.com/api/v1/quotes'); 
  const response = await api_call.json();
  quote = response.messages.non_personalized[index].split(" ")

  this.setState({quote: quote})
  this.setState({dataLoaded: true})
}



selectWordHandler = (index) => {
// Takes the word of your choice and pushed it into yourQuote
  
  let yourQuote = this.state.yourQuote;
  let wordToAdd = this.state.quote[index];

  yourQuote.push(wordToAdd)
  
  this.setState({yourQuote: yourQuote})
  this.fetchQuote()
};


// ------ INITIAL API CALL ------ //
componentDidMount() {
    this.fetchQuote()
}


// ------  DEFINING AND RENDERING  ------ //

render() {


// DEFINES + DISPLAYS WORDS FROM FETCHED QUOTE WITH CLICK HANDLER
const loaded = this.state.dataLoaded
let trumpQuote;

if (loaded === true) {
 
 trumpQuote = (
    <div>
    {this.state.quote.map((word, index) => 
      <Word
      word={word}
      click={() => this.selectWordHandler(index)}/>
      )}
    </div>)

// Displays 'loading' if waiting on data
   } else {
  trumpQuote = <p>Loading</p>
}




// DEFINES YOUR OWN TRUMP QUOTE
let yourQuote;
if (this.state.yourQuote.length > 0) {
 
  yourQuote = (
    <div>
    {this.state.yourQuote.map((word) => 
      <Word
      word={word}/>
      )}
    </div>)

} else {

  yourQuote = (
    <div>
      <h2>Click words from the trump quote below to build your own</h2>
      <h2>⬇</h2>
    </div>
  )
}


// ------  THE RETURN BLOCK  ------ //

return (
  <div className="App">


{/* HEADER */}

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>30 days of React</h1>
          <h2>Day Fourteen / Build a Trump Quote</h2>
        </header>

{/* COMPONENTS */}

      <div className='newtrumpquote'>
        {yourQuote}
      </div>

      <div className='quote'>
        {trumpQuote}
      </div>
        
   </div>

  );
 }
}

export default App;

