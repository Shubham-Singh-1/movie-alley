import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

// function logger(obj,dispatch,getState)
// logger(obj)(next)(action)

// const logger = function( { dispatch,getState} ) {
//     return function (next) {
//         return function (action) {
//             // middleware code
//             console.log("ACTION TYPE=",action.type);
//             next(action);
//         }
//     }
// }

const logger = ( {dispatch,getState} ) => (next) => (action) => {

    if(typeof action !== 'function'){
        console.log("ACTION TYPE:",action.type);
    }
    next(action);
}

// const thunk = ( {dispatch,getState} ) => (next) => (action) => {

//     if(typeof action === 'function'){
//         action(dispatch);
//         return;
//     }
//     next(action);
// }


const store = createStore(rootReducer,applyMiddleware(logger,thunk));

console.log('store',store);

export const StoreContext = createContext();

console.log('StoreContext',StoreContext);

class Provider extends React.Component {
    render() {
        const { store } = this.props;
        return <StoreContext.Provider value={store}>
            {this.props.children}
        </StoreContext.Provider>
    }
} 
// console.log('BEFORE STATE',store.getState());


// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Superman'}]
// });

// console.log('AFTER STATE',store.getState());

// const connectedAppComponent = connect(callback)(App);

export function connect(callback) {
    return function (Component) {
      class ConnectedComponent extends React.Component {
        constructor(props) {
          super(props);
          this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
          });
        }
  
        componentWillUnmount() {
          this.unsubscribe();
        }
        render() {
          const { store } = this.props;
          const state = store.getState();
          const dataToBeSentAsProps = callback(state);
  
          return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
        }
      }
  
      class ConnectedComponentWrapper extends React.Component {
        render() {
          return (
            <StoreContext.Consumer>
              {(store) => {
                return <ConnectedComponent store={store} />;
              }}
            </StoreContext.Consumer>
          );
        }
      }
      return ConnectedComponentWrapper;
    };
  }

ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>
    ,document.getElementById('root')
);
