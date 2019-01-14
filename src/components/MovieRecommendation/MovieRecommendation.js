import React, { Component } from 'react';

//styles
import './MovieRecommendation.css';

//services
import getData from '../../services/getData.js';

export default class MovieRecommendation extends Component {
	constructor() {
		super();

		this.state = { data: null };
	}

	componentDidMount() {
		this.getMovieRecommendation();
	}

	componentWillReceiveProps(newProps) {
		this.getMovieRecommendation();
	}

	async getMovieRecommendation() {
		try {
			let recommendation = await getData({ action: 'getRecommendation', movieID: this.props.movieID });
			this.setState({ data: recommendation });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		let list = this.state.data ? (
			this.state.data.results.map((item) => {
				return (
					<MovieRecommendationItem
						title={item.title}
						image={item.poster_path}
						key={item.id}
						movieID={item.id}
						onClick={this.props.onClick}
					/>
				);
			})
		) : (
			<div />
		);

		return (
			<div className="movieRecommendation">
				<p className="movieRecommendation-title">The following movies also might be interested for you:</p>
				<div className="movieRecommendation-list">{list}</div>
			</div>
		);
	} //render
}; //MovieRecommendation class

function MovieRecommendationItem(props) {
	let { image, title, movieID, onClick } = props;

	return (
		<div
			className="movieRecommendation-item"
			onClick={() => {
				return onClick(movieID);
			}}
		>
			<img
				src={`https://image.tmdb.org/t/p/w500/${image}`}
				className="movieRecommendation-itemImage"
				alt={title}
			/>
		</div>
	);
};
