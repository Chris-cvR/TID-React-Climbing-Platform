import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartO} from '@fortawesome/free-regular-svg-icons';
import '../../styles/index.css';

export const LikeFunctionality = ({id}) => {
    const [likes, setLikes] = useState(0);

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
    }, [id]);

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
            <i onClick={handleLike}><FontAwesomeIcon icon={likes > 0 ? faHeart : faHeartO} id="likes-heart" /></i>
            <div className="center-likes">{likes}</div>
        </div>
    )
}

export default LikeFunctionality;