import React, { useState } from "react";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";

function Comment({ locationId, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const [newHashtags, setNewHashtags] = useState("");

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

        const relation = commentToSave.relation("HashtagID");

        const hashtagStrings = newHashtags
          .split(" ")
          .filter((hashtag) => hashtag.startsWith("#"));

        for (const hashtagStr of hashtagStrings) {
          const Hashtags = Parse.Object.extend("Hashtags");
          const hashtagQuery = new Parse.Query(Hashtags);

          hashtagQuery.equalTo("Name", hashtagStr);
          let hashtag = await hashtagQuery.first();

          if (!hashtag) {
            hashtag = new Hashtags();
            hashtag.set("Name", hashtagStr);
            await hashtag.save();
          }

          relation.add(hashtag);
        }
        console.log("Saving new comment to database...");
        const savedComment = await commentToSave.save();

        setNewComment("");
        setNewHashtags("");

        if (onCommentAdded) {
          onCommentAdded();
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
