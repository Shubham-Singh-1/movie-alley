import React from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
// import { data } from '../data';

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            showSearchResults: false,
            searchText: ''
        }
    }

    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    };

    handleSearch = () => {
        const { searchText } = this.state;

        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    render () {

        const { result: movie,showSearchResults } = this.props.search;

        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange}/>
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>
                    {showSearchResults && (
                        <div className="search-results">
                            <div className="search-result">
                                <img src={movie.Poster} alt="search-pic" />
                                <div className="movie-info">
                                    <span>{movie.Title}</span>
                                    <button onClick={() => this.handleAddToMovies(movie)}>
                                        Add to Movies
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Navbar;