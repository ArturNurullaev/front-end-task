import React, { Component } from 'react';

//styles
import './MoviesList.css';

//services
import getData from '../../../services/getData.js';

//components
import MovieItem from '../../MovieItem/MovieItem.js';

export default class MoviesList extends Component {
	constructor(props) {
		super(props);

		this.genresCache = null;

		this.state = { data: null };
	}

	async componentWillMount() {
		this.getList();
	}

	componentWillReceiveProps(nextProps) {
		this.getList(nextProps.page);
	}

	async getList(page) {
		try {
			this.genresCache = await getData({ action: 'getGenres' });

			let list = await getData({ action: 'getList', page: page || this.props.page });

			list.results.forEach((movie) => this.restoreGenres(movie));

			this.setState({ data: list });
		} catch (err) {
			console.log(err);
		}
	}

	restoreGenres(movie) {
		movie.genre_ids.forEach((genreID, index, arr) => {
			for (let i = 0; i <= this.genresCache.genres.length; i++) {
				if (this.genresCache.genres[i].id === genreID) {
					arr[index] = this.genresCache.genres[i].name;
					break;
				}
			} //loop
		}); //forEach

		movie.genres = movie.genre_ids;
		delete movie.genre_ids;
	}

	render() {
		let moviesList = this.state.data ? (
			this.state.data.results.map((item) => {
				return (
					<MovieItem
						title={item.title.toUpperCase()}
						key={item.id}
						movieID={item.id}
						image={item.poster_path}
						popularity={item.popularity}
						releaseDate={item.release_date}
						votes={item.vote_average}
						genres={item.genres}
						onClick={this.props.onClick}
					/>
				);
			})
		) : (
			<div />
		);

		return <div className="moviesList">{moviesList}</div>;
	}
};
