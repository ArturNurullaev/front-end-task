import React, { Component } from 'react';

//components
import PageMoviesList from '../PageMoviesList/PageMoviesList.js';
import PageMovieDetails from '../PageMovieDetails/PageMovieDetails.js';
import PageSearchResult from '../PageSearchResult/PageSearchResult.js';


export default class Pages extends Component {
	constructor(props) {
		super(props);

		this.state = { currentPage: 'moviesList', previousPage: 'moviesList' };

		this.findMovies = this.findMovies.bind(this);
		this.goBack = this.goBack.bind(this);
		this.showDetailsPage = this.showDetailsPage.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.findMovies(nextProps.searchQuery);
	}

	showDetailsPage(id) {
		this.setState({ previousPage: this.state.currentPage, currentPage: 'movieDetail', id: id });
	}

	findMovies(query) {
		this.setState({ previousPage: this.state.currentPage, currentPage: 'searchResults', query: query });
	}

	goBack() {
		this.setState({ previousPage: this.state.currentPage, currentPage: this.state.previousPage });
	}

	render() {
		switch (this.state.currentPage) {
			case 'moviesList':
				return (
					<div className="pages">
						<PageMoviesList onClick={this.showDetailsPage} />
					</div>
				);

			case 'movieDetail':
				return (
					<div className="pages">
						<PageMovieDetails goBack={this.goBack} movieID={this.state.id} />
					</div>
				);

			case 'searchResults':
				return (
					<div className="pages">
						<PageSearchResult
							query={this.state.query}
							goBack={this.goBack}
							onClick={this.showDetailsPage}
						/>
					</div>
				);

			default:
				return (
					<div className="pages">
						<PageMoviesList onClick={this.showDetailsPage} />
					</div>
				);
		}
	}
};

