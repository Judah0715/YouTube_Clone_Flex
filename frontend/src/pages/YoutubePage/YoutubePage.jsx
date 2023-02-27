import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { KEY } from '../../localKey';
import './YoutubePage.css'
import SearchResults from '../SearchResultsPage/SearchResults';
import SearchBar from '../../components/SearchBar/SearchBar';

const YoutubePage = () => {
    const [user, token] = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        const videoArray = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=The Office&key=${KEY}&part=snippet&type=video&maxResults=3`)
                setVideos(response.data.items)
                console.log('response',response.data.items)
            } catch (error) {
                console.log(error.message)
            }
        };
        videoArray();
    },[])


    return (
        <div className='container'>
            <div className='search-form'>
            <h1>Home Page for {user.username}</h1>
            </div>  
            <div>
                <h2>Featured Videos</h2>
            </div>
                <div className='videos'>
                    <ul>
                    {videos.map((video) => {
                        return (
                        <div style={{margin:'.5rem'}} key={video.id.videoId}>
                            <li >
                                <Link to={`/videoPage/${video.id.videoId}`}>
                                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}/>
                                    <p style={{'fontSize':'.25rem'}}>{video.snippet.title}</p>
                                </Link>
                            </li>
                        </div>
                        );
                    })}
                    </ul>
                </div>
           
        </div>
     );
};
export default YoutubePage;