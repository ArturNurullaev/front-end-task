import React, { Component } from 'react';




//components
import MovieItem from '../MovieItem/MovieItem.js';
import GoBack from '../GoBack/GoBack.js';

//services
import getData from '../../services/getData.js';

//image
import Preloader from '../../preloader.gif';

//styles
import './PageSearchResult.css';




export default class PageSearchResult extends Component {
	
	constructor(props){
	super(props);

	this.state = {data:null};
	
	}
	
componentDidMount(){

this.getList(this.props.query);
	
}	

componentWillReceiveProps (nextProps){	this.getList(nextProps.query)	}

	
async getList(query){

	try {

		this.setState({data:null});
		
		this.genresCache = await getData({action:'getGenres'});
		
		let list = await getData({action:'searchMovies', query:query});
		
		list.results.forEach((movie)=>this.restoreGenres(movie));

		this.setState({data:list});
		
		
	}catch(err){
	
		console.log(err);
		
	}
	
}
	

restoreGenres(movie){

	
movie.genre_ids.forEach(	(genreID, index, arr)=>{

				for (let i=0; i<=this.genresCache.genres.length; i++){

					if(this.genresCache.genres[i].id === genreID) {

						arr[index] = this.genresCache.genres[i].name; break;

					};

				};//loop


				});//forEach

movie.genres = movie.genre_ids;
delete movie.genre_ids;
	
}
	
	

  render() {

	  
	  let moviesList;
	  

if (this.state.data && this.state.data.results){

		if(this.state.data.results.length===0){
		
			moviesList = <p className='searchPage-state'>Nothing found :(</p>
		
		}else{
		
		moviesList = this.state.data.results.map((item)=> {
		return <MovieItem title={item.title.toUpperCase()} key={item.id} image={item.poster_path} popularity={item.popularity} releaseDate={item.release_date} votes={item.vote_average} genres={item.genres} onClick={this.props.onClick} movieID={item.id}/>
		
		})
		}//else
}else{
												 
	moviesList = <img className='searchPage-state' src={Preloader} alt='preloader'/>;
												 
	 }
		
		 
    return (
      <div className='searchPage'>
		<GoBack onClick={this.props.goBack}></GoBack>
		{moviesList}
      </div>
    );
  }}

