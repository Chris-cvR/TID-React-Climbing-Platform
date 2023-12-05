import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartO} from '@fortawesome/free-regular-svg-icons';
import '../../styles/index.css';

// This component is responsible for displaying the like functionality for a post.
// It fetches the current number of likes for the post from the Parse server and updates the number of likes when the heart icon is clicked.
// Props: id = The ID of the post.
export const LikeFunctionality = ({id}) => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const user = Parse.User.current();

    // useEffect hook to fetch the current number of likes when the component mounts
    useEffect(() => {
        const fetchLikes = async () => {
        const parseQuery = new Parse.Query('Like');
        parseQuery.equalTo('user', user);
        parseQuery.equalTo('location', { "__type": 'Pointer', "className": 'Location', "objectId": id });
    

        try {
            const likes = await parseQuery.count();
            setLikes(likes);
            setHasLiked(likes > 0);
        } catch (error) {
            console.error('Error fetching likes: ', error);
        }
    };
        fetchLikes();
    }, [id]); // Dependency array for the useEffect hook. The hook will run again if the id prop changes.

    // Function to increase the likes by 1 when the heart icon is clicked
    const handleLike = async () => {
        const parseQuery = new Parse.Query('Like');
        parseQuery.equalTo('user', user);
        parseQuery.equalTo('location', { "__type": 'Pointer', "className": 'Location', "objectId": id });

         try {
            const existingLike = await parseQuery.first();
            if(existingLike) { //the user has already the location, unlike it
                await existingLike.destroy();
                setLikes(likes - 1);
                setHasLiked(false);
            } else {
                // If the Like doesn't exist, create a new one
                const like = new Parse.Object('Like');
                like.set('user', user);
                like.set('location', { "__type": "Pointer", "className": "Location", "objectId": id});
                await like.save();

                //update number of likes
                setLikes(likes + 1);
                setHasLiked(true);
            }
        } catch (error) {
            console.error('Error updating likes: ', error);
        }
    }

    return (
        <div>
            {/* If the number of likes is greater than 0, display the solid heart icon. Otherwise, display the outlined heart icon. */}
            <i onClick={handleLike}><FontAwesomeIcon icon={likes > 0 ? faHeart : faHeartO} id="likes-heart" /></i>
            <div className="center-likes">{likes}</div> {/* Displays the number of likes */}
        </div>
    )
}

export default LikeFunctionality;