import React, { Component } from 'react';

//styles
import './Pagination.css';

//services
import getData from '../../../services/getData.js';

export default class Pagination extends Component {
	constructor(props) {
		super(props);

		this.settings = { limit: 14 };

		this.state = { pagesTotal: 1, cursor: 1, currentPage: 1 };
	}

	componentDidMount() {
		this.getNumber(this.props.currentPage);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ currentPage: nextProps.currentPage, cursor: nextProps.paginationCursor });
	}

	async getNumber(currentPage) {
		try {
			let number = await getData({ action: 'getNumberOfPages', page: this.props.page });

			this.setState({ pagesTotal: number.total_pages, currentPage: currentPage });
		} catch (err) {
			console.log(err);
		}
	}

	encreaseCursor() {
		let currentCursor = this.state.cursor;
		let limit = this.settings.limit;

		let newCursor = currentCursor + limit;

		let limitCursor = this.state.pagesTotal - limit;

		if (newCursor > limitCursor) {
			newCursor = limitCursor;
		}

		this.props.changePaginationCursor(newCursor);
	}

	decreaseCursor() {
		let currentCursor = this.state.cursor;
		let limit = this.settings.limit;

		let newCursor = currentCursor - limit;

		if (newCursor < 0) {
			newCursor = 1;
		}

		this.props.changePaginationCursor(newCursor);
	}

	render() {
		let buttons = [];

		if (this.state.pagesTotal) {
			for (let i = this.state.cursor; i <= this.settings.limit + this.state.cursor; i++) {
				if (i === this.state.currentPage) {
					buttons.push(
						<a href="#" className="pagination-currentNumber" key={i} onClick={this.props.onClick}>
							{i}
						</a>
					);
				} else {
					buttons.push(
						<a href="#" className="pagination-number" key={i} onClick={this.props.onClick}>
							{i}
						</a>
					);
				}
			}
		}

		return (
			<div className="pagination">
				<div className="pagination-left" onClick={this.decreaseCursor.bind(this)} />
				{buttons}
				<div className="pagination-right" onClick={this.encreaseCursor.bind(this)} />
			</div>
		);
	}
};
