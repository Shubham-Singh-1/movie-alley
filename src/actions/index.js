//action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE';
export const SET_SHOW_FAVOURITE = 'SET_SHOW_FAVOURITE';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';

//action creators
export  function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies, //shorthand for movies: movies,
    }
}

export function addFavourite(movie) {
    return {
        type: ADD_TO_FAVOURITE,
        movie,
    }
}

export function removeFromFavourites (movie) {
    return {
        type: REMOVE_FROM_FAVOURITE,
        movie,
    }
}

export function setShowFavourites (val) {
    return {
        type: SET_SHOW_FAVOURITE,
        val,
    }
}

export function addMovieToList(movie) {
    return {
      type: ADD_MOVIE_TO_LIST,
      movie,
    };
}

export function handleMovieSearch(movie) {

    const url = `http://www.omdbapi.com/?apikey=ee4d4f4e&t=${movie}`;

    return function(dispatch){ // this function is called Thunk
        fetch(url)
        .then(response => response.json())
        .then(movie => {
            console.log('movie',movie);

            // dispatch an action
            // dispatch({ type:'ADD_SEARCH_RESULT',movie});
        });
    }
    
}