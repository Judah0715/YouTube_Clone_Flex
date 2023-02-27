import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import { KEY } from '../../localKey';
import { Link, useParams } from 'react-router-dom';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import './VideoPage.css'
import CommentForm from '../../components/CommentForm/CommentForm';

const VideoPage = () => {
    const [user, token] = useAuth();
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [likes, setLikes] = useState(0)
    const [dislike, setDislike] = useState(0)
    const { videoId } = useParams()

    const fetchVideo = async () => {
        try {
            const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${KEY}`)   
            setVideo(videoResponse.data.items)
            console.log('video Data',videoResponse.data);
        } catch (error) {
            console.log(error.message)
        }    
    }

    const fetchComments = async () => {
        try {
            const commentsResponse = await axios.get('http://127.0.0.1:8000/api/comments/${videoId}/')
            setComments(commentsResponse.data)
            console.log('comments', commentsResponse.data)
        } catch (error) {
            console.log(error.meeage)
        }

    }

    const handleCommentSubmit = async (comment) => {
        console.log('created comment', comment)
        try {
            await axios.post('http://127.-.-.1:8000/api/comments/', comment, {
                headers: {
                    Authorization: "Bearer " + token}
                });
            } catch (error) {
                console.log(error.message)
            }

            fetchComments();
        }

        useEffect(() => {
            fetchVideo();
            fetchComments();
        }, [videoId])

       
        return ( 
            <div>
                <div className='iframe-div'>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title='embedded-player'
                        type= "text/html"
                        id="ytplayer"
                    ></iframe>
                </div>
                <div className='comments-section'>
                    <div className='comment-container'>
                    <h3>Comments:</h3>
                    <ul>
                    {comments.map((comment)=> {
                    return(
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <p> {comment.user.username}</p>
                            <button type='button'>Likes{comment.likes}</button>
                            <button type='button'>Dislikes{comment.dislikes}</button>
                            <br/>
                        </li>
                            )
                        })}
                    </ul>
                    </div>
                    <div className='comment-submit-form'>
                    {user ? (
                        <CommentForm onAddComment={handleCommentSubmit} />
                    ) : (
                        <p>You Must be Logged-in to Post a Comment</p>
                    )}
                    </div>
                </div> 
                <div>
                    <RelatedVideos videoId={videoId} />
                </div>  
            </div>
        );
    }
                 
        export default VideoPage;