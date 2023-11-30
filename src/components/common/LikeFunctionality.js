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

    // useEffect hook to fetch the current number of likes when the component mounts
    useEffect(() => {
        const fetchLikes = async () => {
        const parseQuery = new Parse.Query('Location');

        try {
            const likes = await parseQuery.get(id);
            setLikes(likes.get('Likes'));
        } catch (error) {
            console.error('Error fetching likes: ', error);
        }
    };
        fetchLikes();
    }, [id]); // Dependency array for the useEffect hook. The hook will run again if the id prop changes.

    // Function to increase the likes by 1 when the heart icon is clicked
    const handleLike = async () => {
        const parseQuery = new Parse.Query('Location');

        try {
            const location = await parseQuery.get(id);
            location.increment('Likes');
            await location.save();
            setLikes(location.get('Likes'));
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