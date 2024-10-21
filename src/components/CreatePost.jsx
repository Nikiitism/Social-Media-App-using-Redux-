// import { useContext, useEffect, useState } from "react";

import { Form, redirect } from "react-router-dom";

const CreatePost = () =>{

  // const {addPost} = useContext(PostList);

  // const [isPopupVisible, setPopupVisible] = useState(false);
  // const [error, setError] = useState('');
  
  // const handleSubmit = (event) => {

    // if(userIdElement.current.value === '' ||
    //   postTitleElement.current.value === '' ||
    //   postBodyElement.current.value === '' ||
    //   reactionsElement.current.value === ''||
    //   tagsElement.current.value === '')
    //   {
    //     setError('All fields are required');
    //     return;}

    // setError('');
    // setPopupVisible(true);
  // }
  
  // useEffect(() => {
  //   if (isPopupVisible) {
  //     const timer = setTimeout(() => {
  //       setPopupVisible(false);
  //     }, 2000); 
  //     return () => clearTimeout(timer);
  //   }
  // }, [isPopupVisible]);

  return (
    <div>
      <Form method="POST" className="create-post">

<div className="mb-3">
      <label htmlFor="userId" className="form-label">Enter your User Id here</label>
      <input type="text" name="userId" placeholder="Your User Id" className="form-control" id="userId"/>
    </div>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Post Title</label>
      <input type="text" name="title" placeholder="How are you feeling today...?" className="form-control" id="title"/>
    </div>
    <div className="mb-3">
      <label htmlFor="body" className="form-label">Post Content</label>
      <textarea type="text" rows="4" name="body" placeholder="Tell us more abouot it" className="form-control" id="body"/>
    </div>
    <div className="mb-3">
      <label htmlFor="reactions" className="form-label">Number of Reactions</label>
      <input type="number" name="reaction" placeholder="How many people reacted to this post" className="form-control" id="reactions"/>
    </div>
    <div className="mb-3">
      <label htmlFor="tags" className="form-label">Enter your tags here</label>
      <input type="text" name="tags" placeholder="Please enter tags using space" className="form-control" id="tags"/>
    </div>

    <button type="submit" className="btn btn-primary">Post</button>
    {/* {error && <p className="error-message">{error}</p>} */}
  </Form> 
{/* 
  {isPopupVisible && (
  <div className="popup-top">
    <p id="postId">Posted!</p>
    <p>Your post has been successfully added.</p>
  </div>
)} */}
    </div> )}

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries (formData);
  postData.tags = postData.tags.split (" ")
  console.log(postData)

  console.log(postData)

  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  })
  .then(res => res.json())
  .then(post => {console.log(post); });

  return redirect("/")
}

export default CreatePost;