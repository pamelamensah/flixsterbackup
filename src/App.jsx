import React, { useState } from 'react';
import './App.css';
import MovieList from './Components/MovieList/MovieList';
import tmdbApi from './api/tmdb';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';


const App = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="App">
        <Header hideAnimation={showModal}/>
        <MovieList showModal={showModal} setShowModal={setShowModal} />
        <Footer/> 
      </div>
    </>
  );
};

export default App;
