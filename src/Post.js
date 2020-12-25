import { Avatar } from '@material-ui/core';
import React,{useState} from 'react'

import './Post.css';
import Post1 from './post.jpeg';

function Post({username,caption,imageUrl}) {
    const [comments,setcomments]=useState([]);
    
    
    return (
        <div className="post">
            <div className="post_header">
            <img src={Post1} height="40px"className="post_avatar"/>
            <h3>{username}</h3>
            </div>
            {/* header->avatar +username */}
    <img className="post_Image" src={imageUrl}/>
            {/* image */}

            {/* username+caption */}
            <h4 class="post_text"><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post
