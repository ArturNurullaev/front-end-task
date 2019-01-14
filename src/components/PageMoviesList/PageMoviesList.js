import React, { Component } from 'react';

//components
import MoviesList from './MoviesList/MoviesList.js';
import Pagination from './Pagination/Pagination.js';

export default class PageMoviesList extends Component {
	constructor(props) {
		super(props);

		this.state = { currentPage: parseInt(localStorage.getItem('currentPage')) || 1, paginationCursor: 1 };

		this.changePage = this.changePage.bind(this);
	}

	changePage(e) {
		localStorage.setItem('currentPage', e.target.innerHTML);
		this.setState({ currentPage: +e.target.innerHTML });
	}

	changePaginationCursor(cursor) {
		this.setState({ paginationCursor: cursor });
	}

	render() {
		let pagination = (
			<Pagination
				onClick={this.changePage}
				currentPage={this.state.currentPage}
				paginationCursor={this.state.paginationCursor}
				changePaginationCursor={this.changePaginationCursor.bind(this)}
			/>
		);

		return (
			<div>
				{pagination}
				<MoviesList page={this.state.currentPage} onClick={this.props.onClick} />
				{pagination}
			</div>
		);
	} //render
} //class
