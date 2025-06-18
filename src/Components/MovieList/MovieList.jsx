import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import "./MovieList.css";
import tmdbApi from "../../api/tmdb";

const MovieList = ({ showModal, setShowModal }) => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [view, setView] = useState("nowPlaying");
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data } = await tmdbApi.get(`/movie/now_playing?page=${page}`);
                if (data.results.length === 0) {
                    setHasMore(false);
                } else {
                    setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
                }
            } catch (err) {
                console.error("Error fetching 'Now Playing' movies:", err);
            }
        };

        if (view === "nowPlaying") {
            fetchList();
        }
    }, [page, view]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                const { data } = await tmdbApi.get(
                    `/search/movie?query=${encodeURIComponent(searchQuery)}`
                );
                setSearchResults(data.results);
            } catch (err) {
                console.error("Error searching movies:", err);
            }
        };

        if (view === "search") {
            const handler = setTimeout(() => {
                fetchSearch();
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [searchQuery, view]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleCardClick = async (movieId) => {
        setShowModal(true);
        setSelectedMovie(null);
        try {
            const { data } = await tmdbApi.get(`/movie/${movieId}`);
            setSelectedMovie(data);
        } catch (err) {
            console.error(`Error fetching movie details for ${movieId}:`, err);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    const handleNowPlayingClick = () => {
        setView("nowPlaying");
        setSearchQuery("");
        setSearchResults([]);
        setPage(1);
        setHasMore(true);
        setSortOption("default");
    };

    const handleSearchClick = () => {
        setView("search");
    };


    const handleClearSearch = () => {
        setSearchQuery(""); 
        setSearchResults([]); 
        setView("nowPlaying"); 
    };
  
    const displayedMovies = view === "nowPlaying" ? movies : searchResults;

    const sortedMovies = [...displayedMovies].sort((a, b) => {
        if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        } else if (sortOption === "release_date") {
            return new Date(b.release_date) - new Date(a.release_date);
        } else if (sortOption === "vote_average") {
            return b.vote_average - a.vote_average;
        }
        return 0;
    });

    return (
        <>
            <div className="top-controls">
                <div className="toggle-buttons">
                    <button
                        className={view === "nowPlaying" ? "active" : ""}
                        onClick={handleNowPlayingClick}
                    >
                        Now Playing
                    </button>
                </div>


                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <AiOutlineSearch className="search-icon" />
                        <input
                        type="text"
                        placeholder="What do you want to watch?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setView("search")}
                        />
                    </div>

                    <button onClick={handleSearchClick}>Search</button>
                    {searchQuery && ( 
                        <button onClick={handleClearSearch} className="clear-button">
                            Clear
                        </button>
                    )}
                </div>

                <div className="sort-dropdown">
                    <label htmlFor="sort"></label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="title">Title (A–Z)</option>
                        <option value="release_date">Release Date (Newest → Oldest)</option>
                        <option value="vote_average">Rating (High → Low)</option>
                    </select>
                </div>
            </div>

            <div className="movie-list">
                {sortedMovies.length > 0 ? (
                    sortedMovies.map((m) => (
                        <MovieCard
                            key={m.id}
                            name={m.title}
                            posterPath={m.poster_path}
                            voterAverage={m.vote_average}
                            onClick={() => handleCardClick(m.id)}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        {view === "nowPlaying"
                            ? "No movies currently playing."
                            : searchQuery
                            ? `No results found for "${searchQuery}".`
                            : "Start typing to search for movies!"}
                    </p>
                )}
            </div>

            {view === "nowPlaying" && hasMore && (
                <div className="load-more">
                    <button onClick={handleLoadMore}>Load More</button>
                </div>
            )}

            <MovieModal show={showModal} onClose={handleClose} movie={selectedMovie} />
        </>
    );
};

export default MovieList;