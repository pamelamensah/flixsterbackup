/*
import React, { useState, useEffect}from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal"
import "./MovieList.css"
import tmdbApi from "../../api/tmdb";


const MovieList = () => {
    const [movies, setmovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [view, setView] = useState("nowPlaying");
    const[sortOption,setSortOption] = useState("default");


    useEffect(() => {
        const fetchList = async () => {
            try{
                const {data} = await tmdbApi.get(
                `/movie/popular?page=${page}`);
                if (data.results.length === 0) setHasMore(false);
                setmovies((prev) => [...prev, ...data.results]);
                console.log(data.results);
            } catch (err){
                console.error("Error fetching list:", err);
            }
        };
        fetchList();
    },[page]);
        
        const handleLoadMore = () => {
            setPage((prev) => prev + 1);
        };

        const handleSearch = async () => {
            if (!searchQuery.trim()) return;
            try {
                const { data } = await tmdbApi.get(
                    `/search/movie?query=${encodeURIComponent(searchQuery)}`
                );
                setSearchResults(data.results);
                setView("search");
            } catch (err) {    
                console.error("Error searching movies:", err);
            }    
        };




        const handleCardClick = async (movieId) => {
            setShowModal(true);
            setSelectedMovie(null);
            try{
                const { data } = await tmdbApi.get(`/movie/${movieId}`);
                setSelectedMovie(data);
            } catch (err){
                console.error(`Error fetching ${movieId}:`, err);
            }
        };

        const handleClose = () => {
            setShowModal(false);
            setSelectedMovie(null);
        };

        const displayedMovies = view === "nowPlaying" ? movies : searchResults;

        const sortedMovies = [...displayedMovies].sort((a, b) => {
            if (sortOption === "title") {
                return a.title.localeCompare(b.title)
            } else if (sortOption === "release_date") {
                return new Date(b.release_date) - new Date(a.release_date);
            } else if (sortOption === "vote_average") {
                return b.vote_average - a.vote_average;
            }
            return 0;
        });
        return(
            <>
                <div className="top-controls">
                    <div className="toggle-buttons">
                        <button
                        className={view === "nowPlaying" ? "active" : ""}
                        onClick={()=> {
                            setView("nowPlaying");
                            setSearchQuery("");
                            setSearchResults([]);
                        }}
                        >
                            Now Playing
                        </button>
                        <button 
                            className={view === "search" ? "active" : ""}
                            onClick={() => setView("search")}
                        >
                            Search
                        </button>
                    </div>

                    <div className ="sort-dropdown">
                        <label htmlFor="sort">Sort by:</label>
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


                    <div className="search-bar">
                        <input
                        type="text"
                        placeholder="🔎 What do you want to watch?" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="movie-list">
                    {sortedMovies.map((m)=>(
                        <MovieCard
                            key = {m.id}
                            name = {m.title}
                            posterPath = {m.poster_path}
                            voterAverage = {m.vote_average}
                            onClick={() => handleCardClick(m.id)}
                        />
                    ))}
                </div>

                {view === "nowPlaying" && hasMore && (
                    <div className="load-more">
                        <button onClick={handleLoadMore}>Load More</button>
                    </div>
                )}

                {view === "search" && searchResults.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        No results found for "{searchQuery}".
                    </p>
                )}    
                <MovieModal
                    show = {showModal}
                    onClose = {handleClose}
                    movie = {selectedMovie}
                />
            </>
        );


};


export default MovieList;


import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import "./MovieList.css";
import tmdbApi from "../../api/tmdb";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [view, setView] = useState("nowPlaying");
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data } = await tmdbApi.get(`/movie/now_playing?page=${page}`);
                if (data.results.length === 0) setHasMore(false);
                setMovies((prev) => [...prev, ...data.results]);
            } catch (err) {
                console.error("Error fetching list:", err);
            }
        };
        fetchList();
    }, [page]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!searchQuery.trim()) return;
            try {
                const { data } = await tmdbApi.get(
                    `/search/movie?query=${encodeURIComponent(searchQuery)}`
                );
                setSearchResults(data.results);
            } catch (err) {
                console.error("Error searching movies:", err);
            }
        };

        if (view === "search" && searchQuery.trim()) {
            fetchSearch();
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
            console.error(`Error fetching ${movieId}:`, err);
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
        setmovies([]);         // 👈 clear old data
        setPage(1);            // 👈 reset page
        setHasMore(true);      // 👈 re-enable "Load More"
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

                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort by:</label>
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

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="🔎 What do you want to watch?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => setView("search")}>Search</button>
                </div>
            </div>

            <div className="movie-list">
                {sortedMovies.map((m) => (
                    <MovieCard
                        key={m.id}
                        name={m.title}
                        posterPath={m.poster_path}
                        voterAverage={m.vote_average}
                        onClick={() => handleCardClick(m.id)}
                    />
                ))}
            </div>

            {view === "nowPlaying" && hasMore && (
                <div className="load-more">
                    <button onClick={handleLoadMore}>Load More</button>
                </div>
            )}

            {view === "search" && searchResults.length === 0 && searchQuery && (
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    No results found for "{searchQuery}".
                </p>
            )}

            <MovieModal show={showModal} onClose={handleClose} movie={selectedMovie} />
        </>
    );
};

export default MovieList;
*/
import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import "./MovieList.css";
import tmdbApi from "../../api/tmdb";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [view, setView] = useState("nowPlaying");
    const [sortOption, setSortOption] = useState("default");

    // Effect for fetching "Now Playing" movies
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

    // Effect for fetching search results
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
        setMovies([]);
        setPage(1);
        setHasMore(true);
        setSortOption("default");
    };

    const handleSearchClick = () => {
        setView("search");
    };

    // --- New handler for clearing the search bar ---
    const handleClearSearch = () => {
        setSearchQuery(""); // Clear the search input
        setSearchResults([]); // Clear any previous search results
        setView("nowPlaying"); // Optional: Switch back to "Now Playing" view
        // You might also want to reset the page and movies if you were deep in search results
        // For simplicity, we'll just clear the search and switch view
    };
    // --- End new handler ---

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

                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort by:</label>
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

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="🔎 What do you want to watch?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setView("search")}
                    />
                    <button onClick={handleSearchClick}>Search</button>
                    {/* --- New Clear button --- */}
                    {searchQuery && ( // Only show the clear button if there's text in the search bar
                        <button onClick={handleClearSearch} className="clear-button">
                            Clear
                        </button>
                    )}
                    {/* --- End new Clear button --- */}
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