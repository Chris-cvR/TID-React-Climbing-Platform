import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Comment from "../components/common/Comment";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CommentSectionFactory from "../components/sections/CommentSectionFactory";
import DetailedLocationCard from "../components/common/DetailedLocationCard";
import EditLocation from "../components/common/EditLocation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailedLocationPage = () => {
  const { id } = useParams();
  const [locationDetails, setLocationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = Parse.User.current();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State to trigger a refresh in the CommentSectionFactory
  const [refreshComments, setRefreshComments] = useState(false);

  // Callback function to be passed to the Comment component
  const handleNewCommentAdded = () => {
    setRefreshComments((prev) => !prev); // Toggle to trigger re-fetch in CommentSectionFactory
  };

  const fetchLocationDetails = async () => {
    const parseQuery = new Parse.Query("Location");
    parseQuery.include("Country");

    try {
      const location = await parseQuery.get(id);
      setLocationDetails(location);
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  useEffect(() => {
    fetchLocationDetails();
  }, [id]);

  return (
    <div>
      <Navbar />
      <EditLocation show={show} handleClose={handleClose} locationId={id} />
      <div className="detailed-container">
        <Container className="detailed-container">
          {isLoading ? (
            <Skeleton height={200} width={400} />
          ) : (
            locationDetails && (
              <DetailedLocationCard
                locationPicture={locationDetails.get("Picture")?.url()}
                locationLatitude={locationDetails.get("Latitude")}
                locationLongitude={locationDetails.get("Longitude")}
                locationType={locationDetails.get("Type")}
                locationName={locationDetails.get("Name")}
                locationCountry={locationDetails.get("Country").get("Country")}
                locationDetails={locationDetails.get("Description")}
                locationDifficulty={locationDetails
                  .get("Difficulty")
                  .get("Difficulty")}
                locationID={id}
                userID={locationDetails.get("UserID")}
                currentUserID={user}
                handleShow={handleShow}
              />
            )
          )}
        </Container>
      </div>
      <div className="detailed-container">
        {isLoading ? (
          <Skeleton height={100} width={400} count={3} />
        ) : (
          <Comment locationId={id} onCommentAdded={handleNewCommentAdded} />
        )}
      </div>
      <div className="comments-container">
        {isLoading ? (
          <Skeleton height={150} width={400} count={3} />
        ) : (
          <CommentSectionFactory
            locationId={id}
            refreshComments={refreshComments}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailedLocationPage;
