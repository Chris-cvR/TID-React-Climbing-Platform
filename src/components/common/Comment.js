import React, { useState } from "react";
import "../../styles/index.css";
import PrimaryButton from "../common/PrimaryButton";

function Comment() {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user

  // Function to add a new comment to the list
  const addComment = () => {
    if (newComment) {
      // Create comment with assigning id and text to each. Maybe we need to have title here as well?
      const commentObject = {
        id: Date.now(), // Timestamp as id - Not sure if we want this, but I figured it might make sense in this case
        text: newComment,
        title: "UserName",
        experience: "Beginner",
      };

      setComments([...comments, commentObject]); // Update the list of comments with the new comment
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="posted-comment">
          <p className="comment-title">{comment.title} </p>
          <p className="user-experience">{comment.experience}</p>
          <p className="comment-text">{comment.text}</p>
        </div> // Map through the list of comments and display each in a separate container + add "UserName" as a title for each comment
      ))}
      <input
        className="add-comment-textbox"
        type="text"
        placeholder="Enter your comment here"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="checkbox-container">
        Hashtags:&nbsp;
        <label className="checkbox-hashtag">
          <input type="checkbox" />
          #Safety&nbsp;&nbsp;&nbsp;
        </label>
        <label className="checkbox-hashtag">
          <input type="checkbox" />
          #Experience&nbsp;&nbsp;&nbsp;
        </label>
        <label className="checkbox-hashtag">
          <input type="checkbox" />
          #State&nbsp;&nbsp;&nbsp;
        </label>
      </div>

      <PrimaryButton id="comment-button" onClick={addComment}>
        {"Add Comment"}
      </PrimaryButton>
    </div>
  );
}

export default Comment;
