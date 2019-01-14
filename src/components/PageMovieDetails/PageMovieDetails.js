import React, { Component } from 'react';

//components
import MovieRecommendation from '../MovieRecommendation/MovieRecommendation.js';
import GoBack from '../GoBack/GoBack.js';

//styles
import './PageMovieDetails.css';

//services
import getData from '../../services/getData.js';

//images
import Preloader from '../../preloader.gif';

export default class PageMovieDetails extends Component {
	constructor(props) {
		super(props);

		this.state = { data: null };

		this.getMovieDetails = this.getMovieDetails.bind(this);
	}

	componentDidMount() {
		this.getMovieDetails(this.props.movieID);
	}

	async getMovieDetails(id) {
		try {
			let movie = await getData({ action: 'getDetails', id: id });

			this.setState({ data: movie });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		let details, recommendation;

		if (this.state.data) {
			details = <MovieDetails details={this.state.data} />;
			recommendation = <MovieRecommendation movieID={this.state.data.id} onClick={this.getMovieDetails} />;
		} else {
			details = <img className="pageMovieDetails-state" src={Preloader} alt="preloader" />;
		}

		return (
			<div className="pageMovieDetails">
				<GoBack onClick={this.props.goBack} />
				{details}
				{recommendation}
			</div>
		);
	} //render
} //MovieDetails class

function MovieDetails(props) {
	let { poster_path, original_title, budget, overview, popularity, release_date, revenue } = props.details;

	return (
		<div className="movieDetails">
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				className="movieDetails-image"
				alt="Movie details backdrop"
			/>
			<div>
				<p className="movieDetails-title">{original_title.toUpperCase()}</p>
				<p className="movieDetails-description">
					<b /> {overview}
				</p>
				<p className="movieDetails-description">
					<b>Release date:</b> {release_date}
				</p>
				<p className="movieDetails-description">
					<b>Budget:</b> {budget}
				</p>
				<p className="movieDetails-description">
					<b>Revenue:</b> {revenue}
				</p>
				<p className="movieDetails-description">
					<b>Popularity:</b> {popularity}
				</p>
			</div>
		</div>
	);
};
