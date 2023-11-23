import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Parse from "parse/dist/parse.min.js";
import CommentFactory from "../sections/CommentFactory";

function Comment({ locationId }) {
  // Initialize state variables using the useState hook
  const [comments, setComments] = useState([]); // Store the list of comments
  const [newComment, setNewComment] = useState(""); // Store the new comment being typed by the user
  const [hashtags, setHashtags] = useState([]); // Keeping track of available hashtags
  const [selectedHashtags, setSelectedHashtags] = useState([]); // Keeping track of selected hashtags
  const [checkedStatus, setCheckedStatus] = useState({});

  useEffect(() => {
    const fetchHashtags = async () => {
      const Hashtags = Parse.Object.extend("Hashtags");
      const query = new Parse.Query(Hashtags);

      try {
        const hashtagResults = await query.find();
        setHashtags(hashtagResults);
      } catch (error) {
        console.error(`Error while fetching Hashtags: ${error}`);
      }
    };

    // Call the fetch function
    fetchHashtags();
  }, []);

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
        commentToSave.set("LocationID", location);

        // Set the selected hashtags
        const relation = commentToSave.relation("HashtagID");
        selectedHashtags.forEach((hashtag) => relation.add(hashtag));

        // Save the comment
        const savedComment = await commentToSave.save();

        // Comment object saved successfully
        const commentObject = {
          id: savedComment.id,
          locationID: locationId,
          text: newComment,
          username: currentUser.get("username"),
          experience: currentUser.get("experience"),
          tags: selectedHashtags
            .map((hashtag) => "#" + hashtag.get("Name"))
            .join(" "), // Added tags to the comment
        };

        // Update the list of comments with the new comment
        setComments([...comments, commentObject]);
        // Clear the input field
        setNewComment("");
        // Clear selected hashtags
        setSelectedHashtags([]);
        // Reset checked status
        setCheckedStatus({});
      } catch (error) {
        console.log(`Could not add comment. Error code: ${error}`);
      }
    }
  };

  // Call whenever Checkbox state changes
  const handleCheckboxChange = (event, hashtagObj) => {
    if (event.target.checked) {
      setSelectedHashtags([...selectedHashtags, hashtagObj]);
    } else {
      setSelectedHashtags(
        selectedHashtags.filter((tag) => tag.id !== hashtagObj.id)
      );
    }
    // Record the checked status for specific checkbox
    setCheckedStatus({
      ...checkedStatus,
      [hashtagObj.id]: event.target.checked,
    });
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      <input
        className="add-comment-textbox"
        type="text"
        placeholder="Enter your comment here"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="checkbox-container">
        Hashtags:&nbsp;
        {hashtags.map((hashtagObj) => (
          <label key={hashtagObj.id} className="checkbox-hashtag">
            <input
              type="checkbox"
              checked={checkedStatus[hashtagObj.id] || false}
              onChange={(event) => handleCheckboxChange(event, hashtagObj)}
            />
            {"#" + hashtagObj.get("Name")}&nbsp;&nbsp;&nbsp;
          </label>
        ))}
      </div>

      <Button onClick={addComment} className="form-button" size="large">
        {" "}
        Add Comment{" "}
      </Button>
    </div>
  );
}

export default Comment;
