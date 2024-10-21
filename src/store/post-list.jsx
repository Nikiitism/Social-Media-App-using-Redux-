import { createContext, useCallback, useEffect, useReducer, useState } from "react";


export const PostList = createContext( {
    postList: [],
    addPost: () => {},
    // fetching : false,
    deletePost: () => {}
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if(action.type === 'DELETE_POST')
    {
        newPostList = currPostList.filter (post => post.id !== action.payload.postId)
    }
    else if (action.type === 'ADD_POST')
    {
        newPostList = [action.payload, ...currPostList]
    }
    else if (action.type === 'ADD_INITIAL_POSTS')
    {
         newPostList = action.payload.posts;
    }
    return newPostList;
}

const PostListProvider = ({children}) => {

    const [postList, dispatchPostList] = useReducer(postListReducer,[])
    // const [fetching, setFetching] = useState(false);

    const addPost = (post) => {
        dispatchPostList({
            type: "ADD_POST",
            payload: post }) 
    };

    const addInitialPosts = (posts) => {
        dispatchPostList({
            type: "ADD_INITIAL_POSTS",
            payload: {posts,},
        })
    };

    const deletePost = useCallback((postId) => {
        console.log(`delete post called for : ${postId}`)
        dispatchPostList({
            type: 'DELETE_POST',
            payload: {postId}
        })        
    }, [ dispatchPostList])

    // useEffect( () => {
    //     setFetching(true)
    //     const controller = new AbortController()
    //     const signal = controller.signal;

    //     fetch('https://dummyjson.com/posts', {signal})
    //     .then(res => res.json())
    //     .then(data => {
    //         const transformedPosts = data.posts.map(post => ({
    //             id: post.id,
    //             title: post.title,
    //             body: post.body,
    //             tags: post.tags,
    //             reactions: post.reactions.likes + post.reactions.dislikes,
    //             userId: post.userId
    //         }));
    //         addInitialPosts(transformedPosts);
    //         setFetching(false)
    //     })
    //     .catch(error => {
    //         if (error.name !== 'AbortError') {
    //             console.error('Error fetching posts:', error);
    //         }
    //     });

    //     return () =>{ controller.abort(); }
    // }, []);

    return <PostList.Provider value={{postList, addPost, deletePost}}>  {children} </PostList.Provider>
}

export default PostListProvider;