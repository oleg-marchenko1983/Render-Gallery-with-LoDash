const form = document.getElementById('form');
const moviesList =document.querySelector('.movies-list');
const input = document.getElementById('input');
const link = document.querySelector('#link');
const lightButton = document.querySelector('#light_button');
const darkButton = document.querySelector('#dark_button');


const endpoint = 'https://api.themoviedb.org/3/';
const res = 'search/movie';
const apiKey = 'f24a0fd18f52218851075901c5a108a0';
const apiUrl = `${endpoint}${res}?api_key=${apiKey}`;

const fetchMovies = (searchQuery) => fetch(apiUrl + `&query=${searchQuery}`)
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error (
				'error while fetching: ' + response.statusText
			);
		})
		.then(data => data.results)
		.catch(error => console.log('error'))

 /* tamplate */

const source = document.querySelector('#cards')
	.textContent
	.trim();
	console.log(source);

const complied = _.template(source);

/*render tamplate*/

const renderGalleryCards = (items,template,parent) =>{
	let htmlString = "";
	items.forEach(item => {
		htmlString += template(item);
	});
	parent.innerHTML = htmlString;
};


/*form submit*/

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
   if (input.value !== '') {
    	const movieCards = fetchMovies(input.value);
    	movieCards.then(data => { 
    		const formatMovieData = data.map(movie => ({
     			rating: movie.vote_average,
				img: movie.poster_path,
				title: movie.title,
				details: movie.overview.slice(0, 99),
				date: movie.release_date
    		})
    		);
    		renderGalleryCards(formatMovieData, complied, moviesList);
});
		input.value = "";
    } else {
  		alert('Enter the name of the movie');
    }
});

/*local storage*/

const changeTheme = (theme) => {
	link.setAttribute('href', `css/${theme}.css`);
}

const saveState = (state) => {
	try {
		localStorage.setItem('themeNow', state);
	} catch (err) {
		console.log('save state error: ', err);
	}
};

window.addEventListener('load', () => {
	if (localStorage.getItem('themeNow') === null ){
	changeTheme(light-theme)
	} else {
	changeTheme(localStorage.getItem('themeNow'));
    }
});

darkButton.addEventListener('click', () => {
	changeTheme('dark-theme');
	saveState('dark-theme');
});

lightButton.addEventListener('click', () => {
	changeTheme('light-theme');
	saveState('light-theme');
});