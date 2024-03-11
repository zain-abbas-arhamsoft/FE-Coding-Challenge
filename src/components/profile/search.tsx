import React from 'react';
import { TextField } from '@material-ui/core';

interface ProfileSearchProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSearch: React.FC<ProfileSearchProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <TextField
            label="Search by Gender"
            variant="outlined"
            onChange={onSearchChange}
            value={searchTerm}
        />
    );
};

export default ProfileSearch;
