import React, { useState } from "react";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment({ locationId, onCommentAdded }) {
  // State for storing the new comment and hashtags
  const [newComment, setNewComment] = useState("");
  const [newHashtags, setNewHashtags] = useState("");

  const addComment = async () => {
    // Get the current logged-in user
    const currentUser = Parse.User.current();

    // Check if the new comment is not empty
    if (newComment) {
      try {
        // Create a new Comment object
        const Comment = Parse.Object.extend("Comment");
        const commentToSave = new Comment();

        // Set the comment text and user details
        commentToSave.set("CommentText", newComment);
        commentToSave.set("UserID", currentUser);

        // Associate the comment with a location
        const location = new Parse.Object("Location");
        location.id = locationId;
        commentToSave.set("LocationID", location);

        // Create a relation for hashtags
        const relation = commentToSave.relation("HashtagID");

        // Process and add hashtags to the comment
        const hashtagStrings = newHashtags
          .split(" ")
          .filter((hashtag) => hashtag.startsWith("#"));

        for (const hashtagStr of hashtagStrings) {
          const Hashtags = Parse.Object.extend("Hashtags");
          const hashtagQuery = new Parse.Query(Hashtags);

          // Check if the hashtag already exists
          hashtagQuery.equalTo("Name", hashtagStr);
          let hashtag = await hashtagQuery.first();

          // If not, create a new hashtag object
          if (!hashtag) {
            hashtag = new Hashtags();
            hashtag.set("Name", hashtagStr);
            await hashtag.save();
          }

          // Add the hashtag to the relation
          relation.add(hashtag);
        }

        // Save the new comment to the database
        console.log("Saving new comment to database...");
        const savedComment = await commentToSave.save();

        // Reset the comment and hashtag input fields
        setNewComment("");
        setNewHashtags("");

        // Invoke the callback if provided
        if (onCommentAdded) {
          onCommentAdded();
        }
      } catch (error) {
        // Log error if the comment could not be added
        console.log(`Could not add comment. Error code: ${error}`);
      }
    }
  };
  return (
    <div className="comment-container">
      <h2>Add Comment</h2>
      <textarea
        className="add-comment-textbox"
        placeholder="Enter your comment here"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <input
        className="hashtag-input-field"
        type="text"
        placeholder="Begin each hashtag with a '#' and separate with space"
        value={newHashtags}
        onChange={(e) => setNewHashtags(e.target.value)}
      />
      <Button
        onClick={addComment}
        id="comment-button"
        className="form-button"
        size="large"
      >
        Comment
      </Button>
    </div>
  );
}

export default Comment;
