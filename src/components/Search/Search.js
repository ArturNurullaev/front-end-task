import React, { Component } from 'react';

//styles
import './Search.css';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.value.length > 0) {
			this.props.onSubmit(this.state.value);
		}
	}

	render() {
		return (
			<form className="searchForm" onSubmit={this.handleSubmit}>
				<label>
					<input
						type="text"
						value={this.state.searchValue}
						onChange={this.handleChange}
						placeholder="Type to find a movie"
					/>
				</label>
			</form>
		);
	}
};
