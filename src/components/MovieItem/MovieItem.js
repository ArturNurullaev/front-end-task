import React, { Component } from 'react';
import './MovieItem.css';



export default function MovieItem (props) {
	
	
let {title, votes, releaseDate, popularity, overview} = props;

let genres = props.genres.join(', ');

	let image = props.image ? <img src={`https://image.tmdb.org/t/p/w500/${props.image}`} className="item-image" alt="Movie item"/> : <div className="item-image"></div> 


	
    return (
		
<div  className="item" onClick={()=>{return props.onClick(props.movieID)}	}>
{image}
<div>
<p className="item-title">{title}</p>
<p className="item-description"><b>Genres:</b> {genres}</p>
<p className="item-description"><b>Release date:</b> {releaseDate}</p>
<p className="item-description"><b>Popularity:</b> {popularity}</p>
<p className="item-description"><b>Votes:</b> {votes}</p>
</div>
</div>
    );
  
	
	
	
}


