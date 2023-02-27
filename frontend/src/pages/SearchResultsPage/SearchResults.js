import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SearchResults.css'

const SearchResults = () => {

    const { videoId } = useParams()
    const [user, token] = useAuth();
    const[SearchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const searchQuery = location.pathname.split('/')[2]

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=$&part=snippet&type=video&maxResults=6`)
            setSearchResults(response.data.items)
        }
        fetchData();
    },[searchQuery])

    return (  
        <div>
            <div className='search-results'>
                <ul>
                    {SearchResults.map((result) => {
                        return(
                            <li key={result.id.videoId}>
                                <Link to={`/videoPage/${result.id.videoId}`}>
                                    <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title}/>
                                    <p>{result.snippet.title}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        </div>
    );
}

export default SearchResults;
