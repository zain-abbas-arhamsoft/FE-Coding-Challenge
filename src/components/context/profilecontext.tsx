import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
    name: string;
    email: string;
    imageUrl: string;
    gender: string,
    setProfile: (name: string, email: string, imageUrl: string, gender: string) => void;
}

const ProfileContext = createContext<ProfileContextType>({
    name: '',
    email: '',
    imageUrl: '',
    gender: '',
    setProfile: () => { },
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState({ name: '', email: '', imageUrl: '', gender: '' });

    const setProfileData = (name: string, email: string, imageUrl: string, gender: string) => {
        setProfile({ name, email, imageUrl, gender });
    };

    return (
        <ProfileContext.Provider value={{ ...profile, setProfile: setProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};
