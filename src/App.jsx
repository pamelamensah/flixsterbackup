import React from 'react';
import './App.css';
import MovieList from './Components/MovieList/MovieList';
import tmdbApi from './api/tmdb';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';


const App = () => {
  return (
    <>
      <div className="App">
        <Header/>
        <MovieList/>
        <Footer/> 
      </div>
    </>
  );
};

export default App;
