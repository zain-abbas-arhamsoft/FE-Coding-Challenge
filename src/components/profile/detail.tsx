import React from 'react';
import { useProfileContext } from '../context/profileContext'; // Import the context

const ProfileDetailPage: React.FC = () => {
  const { name, email, imageUrl, gender } = useProfileContext(); // Get the selected profile from the context

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
      <p>Email: {email}</p>
      <p>Gender:{gender}</p>
    </div>
  );
};

export default ProfileDetailPage;
