import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




//components
import Pages from './components/PAGES/Pages.js';
import Search from './components/Search/Search.js';





class App extends Component {
	
	
	constructor(){
	super();
		
	    this.state = {searchValue: ''};

	}

	
	
	searchQuery(query){
	this.setState({searchValue:query});
	}
	
	
	
	
	
  render() {

 		 
    return (
      <div className="App">
	 <div className='App-background'></div>	
		
		
		
        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
		
			<Search onSubmit={this.searchQuery.bind(this)}/>
		
        </header>


		
		<main className="App-body">
		<Pages searchQuery={this.state.searchValue}/>
		</main>

		
      </div>
    );
  }
}

export default App;
