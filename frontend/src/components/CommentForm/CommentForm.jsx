import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const CommentForm = ({ onAddComment }) => {

    const [user, token] = useAuth();
    const {videoId} = useParams()
    const [text, setText] = useState('')
    const [likes, setLikes] = useState(0)
    const [dislikes,setDislikes] = useState(0)

    const commentSubmit = async (event) => {
        event.preventDefault();
        let comment = {
            video_id: videoId,
            text: text,
            likes: likes,
            dislikes: dislikes,
        }
        console.log(comment)
        
        onAddComment(comment)
    }


    return ( 
        <div>
            <form onSubmit={commentSubmit}>
                <div>
                    <input type='text' placeholder='Add Comment' value={videoId.comment} onChange={(event) => setText(event.target.value)} />
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default CommentForm;