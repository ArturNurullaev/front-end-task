const apiKey = 'bcd4b204b553d7d8bb969e495e4ab201';


let genresCache, numberOfPagesCache;


export default function (pocket){


	switch(pocket.action){
	
		
		case 'getGenres':
			
			return getGenres(pocket);
			
			
		case 'getNumberOfPages':
			
			return getNumberOfPages(pocket);

			
		case 'getList':

			return DB(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pocket.page}`);

		case 'searchMovies':

			return DB(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${pocket.query}&page=1&include_adult=false`);
			
		case 'getDetails':
			
			return DB(`https://api.themoviedb.org/3/movie/${pocket.id}?api_key=${apiKey}&language=en-US`);
		
		case 'getRecommendation':
			
			return DB(`https://api.themoviedb.org/3/movie/${pocket.movieID}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
			
		default:
			return DB(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pocket.page}`);
	
	}


}




async function DB (url){


	try{

		let data = await fetch(url);

		let result = await data.json();

		return result;


	}catch(err){

		processError(err);

	};
	
};




async function getGenres(pocket){


		if(!genresCache){
		
			genresCache =  await DB(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
		
			return Promise.resolve(genresCache);

		}else{
		
		
			return Promise.resolve(genresCache);
		
		}
	
};




async function getNumberOfPages(pocket){


		if(!numberOfPagesCache){
		
			numberOfPagesCache =  await DB(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pocket.page}`);
		
			return Promise.resolve(numberOfPagesCache);

		}else{
		
		
			return Promise.resolve(numberOfPagesCache);
		
		}
	
};



function processError(err){

	console.log(err);
	
}