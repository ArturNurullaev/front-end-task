import React, { Component } from 'react';
import './App.css';

//images
import logo from './logo.svg';

//components
import Pages from './components/PAGES/Pages.js';
import Search from './components/Search/Search.js';

export default class App extends Component {
	constructor() {
		super();

		this.state = { searchValue: '' };
	}

	searchQuery(query) {
		this.setState({ searchValue: query });
	}

	render() {
		return (
			<div className="App">
				<div className="App-background" />

				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>

					<Search onSubmit={this.searchQuery.bind(this)} />
				</header>

				<main className="App-body">
					<Pages searchQuery={this.state.searchValue} />
				</main>
			</div>
		);
	}
};
