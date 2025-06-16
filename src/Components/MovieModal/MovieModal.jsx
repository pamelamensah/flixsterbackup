/*import React from "react";
import "./MovieModal.css";

const MovieModal = ({ show, onClose, movie }) => {
    if (!show) return null;

    // Base URL for TMDB images
    const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; 

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{movie.title}</h2>
                    <button onClick={onClose} aria-label="Close modal">X</button>
                </div>
                <div className="modal-body">
                    {!movie ? (
                        <p>Loading movie details...</p> // More descriptive loading message
                    ) : (
                        <div className="details">
                            <h2>
                                {movie.title} 
                            </h2>
                
                            {movie.poster_path && ( // Check if poster_path exists before rendering
                                <img
                                    src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-modal-poster" // Add a class for styling
                                />
                            )}
                        
                            <p>
                                <strong>Release Date:</strong> {movie.release_date}
                            </p>
                            {movie.runtime && (
                                <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                            )}
                            <p>
                                <strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                            </p>
                            <p>
                                <strong>Overview:</strong> {movie.overview}
                            </p>
                            {movie.genres && movie.genres.length > 0 && (
                                <p>
                                    <strong>Genres:</strong>{" "}
                                    {movie.genres.map((genre) => genre.name).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default MovieModal;

import React from "react";
import "./MovieModal.css";

const MovieModal = ({ show, onClose, movie }) => {
    if (!show) return null;

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
    console.log("Modal shown:", show, movie);


    return (
        <div className="modal" onClick={onClose}>
           
            <div
                className="modal-backdrop-blur"
                style={{
                    backgroundImage: movie?.backdrop_path
                        ? `url(${BACKDROP_BASE}${movie.backdrop_path})`
                        : "none",
                }}
            />

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{movie.title}</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
                </div>

                <div className="modal-body">
                    {!movie ? (
                        <p>Loading movie details...</p>
                    ) : (
                        <div className="details">
                            {movie.poster_path && (
                                <img
                                    src={`${IMAGE_BASE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-modal-poster"
                                />
                            )}
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            {movie.runtime && (
                                <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                            )}
                            <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
                            <p><strong>Overview:</strong> {movie.overview}</p>
                            {movie.genres?.length > 0 && (
                                <p>
                                    <strong>Genres:</strong>{" "}
                                    {movie.genres.map((genre) => genre.name).join(", ")}

                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
*/

import React from "react";
import "./MovieModal.css";

const MovieModal = ({ show, onClose, movie }) => {
    if (!show || !movie) return null;

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

    return (
        <div className="modal" onClick={onClose}>
            {/* Blurred backdrop */}
            <div
                className="modal-backdrop-blur"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(${BACKDROP_BASE}${movie.backdrop_path})`
                        : "none",
                }}
            />
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{movie.title}</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
                </div>

                <div className="modal-body">
                    <div className="details">
                        {movie.poster_path && (
                            <img
                                src={`${IMAGE_BASE}${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-modal-poster"
                            />
                        )}
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        {movie.runtime && <p><strong>Runtime:</strong> {movie.runtime} minutes</p>}
                        <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
                        <p><strong>Overview:</strong> {movie.overview}</p>
                        {movie.genres?.length > 0 && (
                            <p>
                                <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;






