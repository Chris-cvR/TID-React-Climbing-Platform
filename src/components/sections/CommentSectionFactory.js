import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import "../../styles/index.css";
import { List } from "antd";
import { Container } from "react-bootstrap";
import ProfilePicture from "../common/ProfilePicture";

function CommentSectionFactory({ locationId }) {
  const [readResults, setReadComments] = useState([]);

  useEffect(() => {
    const readComments = async function () {
      const parseQuery = new Parse.Query("Comment");
      parseQuery.include("UserID");
      parseQuery.descending("createdAt");
      parseQuery.equalTo("LocationID", locationId);

      try {
        let commentsReceived = await parseQuery.find();

        // Fetch associated hashtags for each comment
        for (let comment of commentsReceived) {
          let hashtagRelation = comment.relation("HashtagID");
          comment.hashtags = await hashtagRelation.query().find();
        }

        setReadComments(commentsReceived);
      } catch (error) {
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
                        <div className="comment-profile-picture">
                          <ProfilePicture
                            user={item.get("UserID")}
                            size="60px"
                          />
                        </div>
                        <div className="comment-content">
                          <div className="user-info">
                            <p className="comment-username">
                              {item.get("UserID").get("username")}
                            </p>
                            <p className="comment-experience">
                              {item.get("UserID").get("experience")}
                            </p>
                          </div>
                          <p className="comment-text">
                            {item.get("CommentText")}
                          </p>
                          <p className="comment-tags">
                            {item.hashtags &&
                              Array.isArray(item.hashtags) &&
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
