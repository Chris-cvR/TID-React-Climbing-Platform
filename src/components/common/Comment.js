import React, { useState } from "react";
import "../../styles/index.css";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment() {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user

  // Function to add a new comment to the list
  const addComment = async () => {
    if (newComment) {
      //Fetch data of current user
      const currentUser = Parse.User.current();
      //Create Parse object for the Comment class and save it to the database
      const Comment = Parse.Object.extend("Comment");
      const commentToSave = new Comment();
      // set class attributes
      commentToSave.set("CommentText", newComment);
      commentToSave.set("UserID", currentUser);
      //commentToSave.set('LocationID', currentLocation);
      //commentToSave.set('HashtagID', checkedHashtags);

      if (currentUser) {
        commentToSave.set("username", currentUser.get("username")); //get the username of the current user
        commentToSave.set("experience", currentUser.get("experience"));
      } else {
        commentToSave.set("username", ""); //if the user does not exist
        commentToSave.set("experience", "");
      }

      try {
        const savedComment = await commentToSave.save();
        //Comment object saved successfully

        const commentObject = {
          id: savedComment.id,
          text: newComment,
          username: savedComment.get("username"),
          experience: savedComment.get("experience"),
          tags: "#Safety #Experience",
        };

        setComments([...comments, commentObject]); // Update the list of comments with the new comment
        setNewComment(""); // Clear the input field
      } catch (error) {
        console.log(`Could not add comment. Error code: ${error}`);
      }
    }
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="posted-comment">
          <p className="comment-title">{comment.username} </p>
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
          #Experience&nbsp;&nbsp;&nbsp;
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
