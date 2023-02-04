
import React, { useContext, useState } from "react";
import { postContext, userContext, postListContext } from "../../App";
import "./AddPost.css";
export default function AddPost() {
  const setPostDisplay = useContext(postContext);
  const [user, setUser] = useContext(userContext);
  const [posts, setPosts] = useContext(postListContext);
  const [postDetails, setPostDetails] = useState({
    postedBy: user,
    title: "",
    description: "",
    upVotes: 0,
    downVotes: 0,
    notVoted: null
  });

  const onChangePost = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setPostDetails((prev) => ({ ...prev, [key]: value }));
  };

  const submitPost = (e) => {
    e.preventDefault();
    const newPosts = JSON.parse(window.localStorage.getItem("posts"));
    newPosts.push(postDetails);
    window.localStorage.setItem("posts", JSON.stringify(newPosts));
    setPostDisplay(false);
    setPosts(newPosts);
  };
  return (
    <div className="postCard">
      <div className="layer"></div>
      <form>
        <i
          onClick={() => setPostDisplay(false)}
          className="fa fa-times cross"
        ></i>
        <h1>New Post</h1>
        <input
          type="text"
          name="title"
          value={postDetails.title}
          onChange={onChangePost}
          placeholder="Post Title"
          required
        />
        <textarea
          cols={30}
          name="description"
          rows={10}
          value={postDetails.description}
          onChange={onChangePost}
          placeholder="Write about something..."
          required
        ></textarea>
        <button onClick={submitPost} type="submit">Post</button>
        <button onClick={()=>setPostDisplay(false)}>Cancel</button>
      </form>
    </div>
  );
}
