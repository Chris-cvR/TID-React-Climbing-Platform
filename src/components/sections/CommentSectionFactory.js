import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import "../../styles/index.css";
import { List } from "antd";
import { Container } from "react-bootstrap";

function CommentSectionFactory({ locationId }) {
  const [readResults, setReadComments] = useState([]);

  const handleCommentAdded = (newComment) => {
    // Update the list of comments with the new comment
    setReadComments([...readResults, newComment]);
  };

  useEffect(() => {
    const readComments = async function () {
      // Create a new query on the Comment class
      const parseQuery = new Parse.Query("Comment");
      parseQuery.include("UserID");
      parseQuery.include("Hashtags");
      parseQuery.descending("createdAt"); //Now the comments will be sorted by the newest first

      // Use equalTo to find comments related to a specific locationId
      parseQuery.equalTo("LocationID", locationId);

      try {
        // Perform the query to get comments matching the locationId
        let commentsReceived = await parseQuery.find();
        // Set the results to state variable
        setReadComments(commentsReceived);
      } catch (error) {
        // Handle errors, like lack of Internet connection
        alert(`Error! ${error.message}`);
      }
    };
    readComments();
  }, [locationId, readResults]); // Depend on locationId and readResults to refetch when they change

  return (
    <div>
      <div className="comment-container">
        <h2>Comments</h2>
        <div>
          {readResults !== null &&
            readResults !== undefined &&
            readResults.length > 0 && (
              <List
                dataSource={[...readResults]}
                renderItem={(item) => (
                  <List.Item className="comment-card-items">
                    <Container className="comment-card-container">
                      <div className="comment-card">
                        <div className="user-info">
                          <p className="comment-username">
                            {item.get("UserID").get("username")}
                          </p>
                          <p>{item.get("UserID").get("experience")}</p>
                        </div>
                        <p>{item.get("CommentText")}</p>
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
