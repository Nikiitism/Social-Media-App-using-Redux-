import { useContext, useEffect, useState } from "react";
import Post from "./Post"
import { PostList as PostListData } from "../store/post-list";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import { useLoaderData } from "react-router-dom";

const PostList = () =>{
    const postList = useLoaderData();
    
    return <>
    { postList.length===0 && (<WelcomeMessage></WelcomeMessage>)}

    {postList.map((post) => (
        <Post key={post.id} post={post}/>
    ))}
    </>
}

export const  postLoader = () => {
    return fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(data => {
            const transformedPosts = data.posts.map(post => ({
                id: post.id,
                title: post.title,
                body: post.body,
                tags: post.tags,
                reactions: post.reactions.likes + post.reactions.dislikes,
                userId: post.userId
            }));
            return transformedPosts;
        })
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Error fetching posts:', error);
            }
        })
}

export default PostList;