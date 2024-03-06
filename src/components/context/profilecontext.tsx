import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
    name: string;
    email: string;
    imageUrl: string;
    setProfile: (name: string, email: string, imageUrl: string) => void;
}

const ProfileContext = createContext<ProfileContextType>({
    name: '',
    email: '',
    imageUrl: '',
    setProfile: () => { },
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState({ name: '', email: '', imageUrl: '' });

    const setProfileData = (name: string, email: string, imageUrl: string) => {
        setProfile({ name, email, imageUrl });
    };

    return (
        <ProfileContext.Provider value={{ ...profile, setProfile: setProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};
