import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import "../../styles/index.css";
import { List } from "antd";
import { Container } from "react-bootstrap";
import ProfilePicture from "../common/ProfilePicture";

function CommentSectionFactory({ locationId, refreshComments }) {
  const [readResults, setReadComments] = useState([]);

  useEffect(() => {
    // Asynchronous function to fetch comments from the database
    const readComments = async function () {
      console.log("Fetching comments from database...");
      const parseQuery = new Parse.Query("Comment");
      // Include the user details in the query
      parseQuery.include("UserID");
      // Order comments by creation time (newest first)
      parseQuery.descending("createdAt");
      // Filter comments by the current location
      parseQuery.equalTo("LocationID", locationId);

      try {
        let commentsReceived = await parseQuery.find();

        // Fetch associated hashtags for each comment
        for (let comment of commentsReceived) {
          let hashtagRelation = comment.relation("HashtagID");
          // Fetch and store hashtags for each comment
          comment.hashtags = await hashtagRelation.query().find();
        }

        // Update state with fetched comments
        setReadComments(commentsReceived);
      } catch (error) {
        // Handle any errors that occur during fetch
        alert(`Error! ${error.message}`);
      }
    };
    // Execute the fetch function
    readComments();
  }, [locationId, refreshComments]); // Effect dependencies; rerun effect if these values change

  return (
    <div>
      <div className="comment-container">
        <h2>Comments</h2>
        <div className="comment-user-text">
          {/* Check and render comments if available */}
          {readResults.length > 0 && (
            <List
              dataSource={[...readResults]}
              renderItem={(item) => (
                <List.Item className="comment-card-items">
                  <Container className="comment-card-container">
                    <div className="comment-card">
                      <div className="comment-profile-picture">
                        {/* Render user profile picture */}
                        <ProfilePicture user={item.get("UserID")} size="60px" />
                      </div>
                      <div className="comment-content">
                        <div className="user-info">
                          {/* Display username and experience level */}
                          <p className="comment-username">
                            {item.get("UserID").get("username")}
                          </p>
                          <p className="comment-experience">
                            {item.get("UserID").get("experience")}
                          </p>
                        </div>
                        {/* Display comment text and associated hashtags */}
                        <p className="comment-text">
                          {item.get("CommentText")}
                        </p>
                        <p className="comment-tags">
                          {item.hashtags &&
                            item.hashtags
                              .map((hashtag) => hashtag.get("Name"))
                              .join(" ")}
                        </p>
                      </div>
                    </div>
                  </Container>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentSectionFactory;
