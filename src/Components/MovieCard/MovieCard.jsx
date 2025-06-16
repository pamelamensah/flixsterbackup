import React from "react";
import tmdbApi from "../../api/tmdb";
import PropTypes from "prop-types";
import "./MovieCard.css";


const MovieCard = ({name, onClick, posterPath,voterAverage}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return(
        <>
            <div className="movie-item" onClick={() => {console.log("Clicked:", name);  onClick();}}>
                <img src = {imageUrl} 
                alt = {name}
                />

                <h4>
                    {name}
                </h4>

                <h5>
                    {voterAverage}
                </h5>

            </div>
        </>
    );
};

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  posterPath: PropTypes.string.isRequired,
  voterAverage: PropTypes.number,
};


export default MovieCard;
