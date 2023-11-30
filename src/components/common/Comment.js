import React, { useState } from "react";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment({ locationId }) {
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user

  // Function to add a new comment to the list
  const addComment = async () => {
    // Fetch data of the current user
    const currentUser = Parse.User.current();

    if (newComment) {
      try {
        // Create Parse object for the Comment class and save it to the database
        const Comment = Parse.Object.extend("Comment");
        const commentToSave = new Comment();

        // Set class attributes
        commentToSave.set("CommentText", newComment);
        commentToSave.set("UserID", currentUser);

        // Set the LocationID for the comment
        const location = new Parse.Object("Location");
        location.id = locationId;
        //We need to use location because parse expects an object and not a locationID string. Without this it is unable to know the correct location
        commentToSave.set("LocationID", location);

        // Save the comment
        const savedComment = await commentToSave.save();

        // Update the list of comments with the new comment
        setComments([...comments, savedComment]);
        // Clear the input field
        setNewComment("");

        window.location.reload();
      } catch (error) {
        console.log(`Could not add comment. Error code: ${error}`);
      }
    }
  };

  return (
    <div className="comment-container">
      <h2>Add Comment</h2>
      <input
        className="add-comment-textbox"
        type="text"
        placeholder="Enter your comment here"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={addComment} id="comment-button" className="form-button" size="large">
        {" "}
        Comment{" "}
      </Button>
    </div>
  );
}

export default Comment;
