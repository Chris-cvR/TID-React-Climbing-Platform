import React, { useState } from "react";
import "../../styles/index.css";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment() {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user

  // Function to add a new comment to the list
  const addComment = () => {
    if (newComment) {
      //Fetch data of current user
      const currentUser = Parse.User.current();
      // Create comment with assigning id and text to each. Maybe we need to have title here as well?
      const commentObject = {
        id: Date.now(), // Timestamp as id - Not sure if we want this, but I figured it might make sense in this case
        text: newComment,
        experience: "Beginner",
        tags: "#Safety #Experience",
      };

      if (currentUser) {
        commentObject.title = currentUser.get("username"); //get the username of the current user
      } else {
        commentObject.title = "User_Not_Found"; //if the user does not exist. This should be changed, since it should not be possible to comment without being logged in.
      }

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
          <p className="comment-tags">{comment.tags}</p>
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

      <Button onClick={addComment} className="form-button" id="comment-button">
        {" "}
        Add Comment{" "}
      </Button>
    </div>
  );
}

export default Comment;
