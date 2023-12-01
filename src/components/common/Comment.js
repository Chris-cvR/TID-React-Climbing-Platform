import React, { useState } from "react";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment({ locationId, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newHashtags, setNewHashtags] = useState(""); // Add this line for new hashtags textbox

  //const normalizeHashtag = (hashtag) => hashtag.replace(/#\s*/g, ""); // Normalize hashtags input

  const addComment = async () => {
    const currentUser = Parse.User.current();

    if (newComment) {
      try {
        const Comment = Parse.Object.extend("Comment");
        const commentToSave = new Comment();

        commentToSave.set("CommentText", newComment);
        commentToSave.set("UserID", currentUser);

        const location = new Parse.Object("Location");
        location.id = locationId;
        commentToSave.set("LocationID", location);

        const relation = commentToSave.relation("HashtagID"); // Add this line.

        // Process newHashtags here: Explain to users that they need to begin their hashtag with # and seperate with a space
        const hashtagStrings = newHashtags
          .split(" ") // split by space
          .filter((hashtag) => hashtag.startsWith("#")); // keep only strings that start with #

        // Search for existing Hashtag
        for (const hashtagStr of hashtagStrings) {
          const Hashtags = Parse.Object.extend("Hashtags");
          const hashtagQuery = new Parse.Query(Hashtags);

          hashtagQuery.equalTo("Name", hashtagStr);
          let hashtag = await hashtagQuery.first();

          // If it doesn't exist, create it
          if (!hashtag) {
            hashtag = new Hashtags();
            hashtag.set("Name", hashtagStr);
            await hashtag.save();
          }

          relation.add(hashtag); // Add the new Hashtag to the relation.
        }

        const savedComment = await commentToSave.save();

        setComments([...comments, savedComment]);
        setNewComment("");
        setNewHashtags(""); // Clear the newHashtags input field

        if (onCommentAdded) {
          onCommentAdded(savedComment);
        }
      } catch (error) {
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

      <input // Add this block for new hashtags input field
        type="text"
        placeholder="Enter your hashtags here, separated by commas"
        value={newHashtags}
        onChange={(e) => setNewHashtags(e.target.value)}
      />

      <Button
        onClick={addComment}
        id="comment-button"
        className="form-button"
        size="large"
      >
        {" "}
        Comment{" "}
      </Button>
    </div>
  );
}

export default Comment;
