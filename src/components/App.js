import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions'
import { StoreContext } from '../index';

class App extends React.Component {

  componentDidMount(){
    // make api call
    // dispatch the action 

    const { store } = this.props;

    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();
    });
    
    store.dispatch(addMovies(data)); 

    console.log('STATE',this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }


  render(){

      const { movies,search } = this.props.store.getState(); // { movies: {} , list: {} }

      const { list,favourites,showFavourites } = movies; 

      console.log('RENDER',this.props.store.getState());

      const displayMovies = showFavourites ? favourites : list;

      return (
        <div className="App">
          <Navbar
              search={search} 
          />
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
              <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
            </div>

            <div className="list">
              {displayMovies.map((movie,index) => (
                <MovieCard 
                    movie={movie} 
                    key={`movies-${index}`} 
                    dispatch={this.props.store.dispatch}
                    isFavourite = {this.isMovieFavourite(movie)}
                />
              ))}
            </div>
            {displayMovies.length === 0 ? <div className="no-movies">No Movies To Display!</div> : null}
          </div>
        </div>
      );
    }
}

class AppWrapper extends React.Component {

  render(){
    
    return(
      <StoreContext.Consumer>
        {(store) => {
         return <App store={store}/>
        }}
      </StoreContext.Consumer>
    );

  }
}


// function callback(state) {
//   return {
//     movies: state.movies,
//     search: state.search
//   }
// }

// const connectedAppComponent = connect(callback)(App);

export default AppWrapper;
