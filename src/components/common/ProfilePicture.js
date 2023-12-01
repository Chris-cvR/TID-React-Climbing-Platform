import { useEffect, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

const ProfilePicture = ({user, size}) => {
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {  
        if(user){
            setProfilePicture(user.get('ProfilePicture'));
        }else{
            const loggedInUser = Parse.User.current();
            if(loggedInUser) setProfilePicture(loggedInUser.get('ProfilePicture'));
        }
    }, [user]);

    return (
        profilePicture ?   (
        <img 
            src={profilePicture.url()} 
            alt="profile" 
            style={{ 
                borderRadius: '50%', 
                width: size, 
                height: size,
                objectFit: 'cover'
            }}
        />
    ) : null
    )
}

export default ProfilePicture;