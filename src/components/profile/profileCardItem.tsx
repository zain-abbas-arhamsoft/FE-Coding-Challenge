import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Profile } from "./type/type"
interface ProfileCardItemProps {
    profile: Profile;
    onClick: () => void;
}

const ProfileCardItem: React.FC<ProfileCardItemProps> = ({ profile, onClick }) => {
    return (
        <Card onClick={onClick}>
            <CardHeader
                avatar={<Avatar src={profile.imageUrl}><PersonIcon /></Avatar>}
                title={profile.name}
                subheader={profile.email}
            />
            <CardContent>
                <Typography variant="body1" component="p">
                    Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </Typography>
                <Typography variant="body1" component="p">
                    Gender: {profile.gender}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCardItem;
