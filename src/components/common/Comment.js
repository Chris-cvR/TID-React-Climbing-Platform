import React, { useState } from "react";
//import "../../styles/index.css";
import "../../styles/Comment.css";

function Comment() {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user

  // Function to add a new comment to the list
  const addComment = () => {
    if (newComment) {
      setComments([...comments, newComment]); // Update the list of comments with the new comment
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>

      {comments.map((comment, index) => (
        <div key={index} className="posted-comment">
          <p className="comment-title">UserName</p>
          <p className="comment-text">{comment}</p>
        </div> // Map through the list of comments and display each in a separate container + add "UserName" as a title for each comment
      ))}
      <input
        type="text"
        placeholder="Enter your comment here"
        style={{ width: "500px", height: "100px" }}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="comment-button" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default Comment;
