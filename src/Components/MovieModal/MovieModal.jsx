import React, { useState, useEffect } from "react";
import "./MovieModal.css";
import tmdbApi from "../../api/tmdb"; 
import { FaPlay, FaHeart, FaEye } from "react-icons/fa";

const MovieModal = ({ show, onClose, movie }) => {
    if (!show || !movie) return null;

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
    const PROFILE_BASE = "https://image.tmdb.org/t/p/w185"; 

    const [trailerKey, setTrailerKey] = useState(null);
    const [loadingTrailer, setLoadingTrailer] = useState(true);
    const [cast, setCast] = useState([]); 
    const [loadingCast, setLoadingCast] = useState(true); 
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [fullMovieData, setFullMovieData] = useState(null);



    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [show]); 


    useEffect(() => {
        const fetchMovieExtras = async () => {
            if (!movie || !movie.id) {
                setLoadingTrailer(false);
                setLoadingCast(false);
                return;
            }

            setLoadingTrailer(true);
            setTrailerKey(null);
            setLoadingCast(true);
            setCast([]);
            setFullMovieData(null);

            console.log("Fetching movie extras for movie ID:", movie.id); 

            try {
                const movieDetailsResponse = await tmdbApi.get(`/movie/${movie.id}`);
                setFullMovieData(movieDetailsResponse.data);

                const videosResponse = await tmdbApi.get(`/movie/${movie.id}/videos`);
                const trailer = videosResponse.data.results.find(
                    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
                console.log("Fetched Videos:", videosResponse.data.results); 

                const creditsResponse = await tmdbApi.get(`/movie/${movie.id}/credits`);
                setCast(creditsResponse.data.cast.slice(0, 15)); 
                console.log("Fetched Cast:", creditsResponse.data.cast); 

            } catch (err) {
                console.error(`Error fetching movie extras for ${movie.id}:`, err);
            } finally {
                setLoadingTrailer(false);
                setLoadingCast(false);
            }
        };

        fetchMovieExtras();
    }, [movie?.id]);

    const handlePlayTrailer = () => {
        if (trailerKey) {
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
        } else {
            alert("No trailer available for this movie.");
        }
    };
    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    const toggleWatched = () => {
        setIsWatched((prev) => !prev);
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <div className="modal" onClick={onClose}>
            <div
                className="modal-backdrop-blur"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(${BACKDROP_BASE}${movie.backdrop_path})`
                        : "none",
                }}
            />
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {movie.backdrop_path ? (
                    <img
                        src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                        alt={`${movie.title} Backdrop`}
                        className="modal-image-header"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1280x720/212121/FFFFFF?text=No+Image`; }}
                    />
                ) : (
                    <div className="modal-image-header-placeholder">No Image Available</div>
                )}

                <button className="close-btn" onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                    </svg>
                </button>

                <div className="modal-info-bar">
                    <div className="modal-title-area">
                        <h2 className="modal-title">{movie.title}</h2>
                        <p className="modal-subtitle">
                            HD {movie.vote_average ? `• ${movie.vote_average.toFixed(1)}` : ''} ({movie.vote_count ?? 0}) {' '}
                            {movie.release_date ? `• ${new Date(movie.release_date).getFullYear()}` : ''}
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button className="action-button play-button" onClick={handlePlayTrailer} disabled={loadingTrailer || !trailerKey}>
                            <FaPlay className="action-icon" />
                            {loadingTrailer ? 'Loading...' : 'Play'}
                        </button>
                        <button className={`action-button ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
                            <FaHeart className="action-icon" />
                        </button>
                        <button className={`action-button ${isWatched ? 'active' : ''}`} onClick={toggleWatched}>
                            <FaEye className="action-icon" />
                        </button>
                    </div>
                </div>

                <div className="modal-overview">
                    <p>{movie.overview || 'No overview available.'}</p>
                </div>

                <div className="modal-details-grid">
                    <div className="detail-item">
                        <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
                    </div>
                    <div className="detail-item">
                        <strong>Language:</strong> {movie.original_language?.toUpperCase() ?? 'N/A'}
                    </div>
                    <div className="detail-item">
                        <strong>Release Date:</strong> {movie.release_date || 'N/A'}
                    </div>
                    <div className="detail-item">
                        <strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? 'N/A'}
                    </div>
                    <div className="detail-item">
                        <strong>ID:</strong> {movie.id || 'N/A'}
                    </div>
                    <div className="detail-item">
                        {movie.imdb_id && (
                            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" className="imdb-link">
                            </a>
                        )}
                    </div>
                </div>
                {fullMovieData?.genres && fullMovieData.genres.length > 0 && (
                    <div className="genre-section">
                        <div className="genre-list">
                            {fullMovieData.genres.map((genre) => (
                                <span key={genre.id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                {!loadingCast && cast.length > 0 && (
                    <div className="cast-section">
                        <h3>Top Cast</h3>
                        <div className="cast-list">
                            {cast.map((person) => (
                                person.profile_path && ( 
                                    <div key={person.id} className="cast-item">
                                        <img
                                            src={`${PROFILE_BASE}${person.profile_path}`}
                                            alt={person.name}
                                            className="cast-photo"
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/333333/FFFFFF?text=No+Pic`; }}
                                        />
                                        <p className="cast-name">{person.name}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}
                {loadingCast && (
                    <div className="cast-section loading-cast">
                        <h3>Top Cast</h3>
                        <p>Loading cast...</p>
                    </div>
                )}
                {!loadingCast && cast.length === 0 && (
                    <div className="cast-section">
                        <h3>Top Cast</h3>
                        <p>No cast information available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
