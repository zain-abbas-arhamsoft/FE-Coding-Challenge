import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            maxWidth: 300,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 400,
        },
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    centerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2),
    },
    searchInput: {
        width: '100%',
        maxWidth: 400,
        marginBottom: theme.spacing(2),
    },
}));

interface ProfileCardProps {
    name: string;
    email: string;
    imageUrl: string;
}

const ProfileCard: React.FC<{ count: number }> = ({ count }) => {
    const classes = useStyles();
    const [profiles, setProfiles] = useState<ProfileCardProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    Array.from({ length: count }, () => fetch('https://randomuser.me/api/').then((response) => response.json()))
                );

                const newProfiles = responses.map((response) => {
                    const user = response.results[0];
                    return {
                        name: `${user.name.first} ${user.name.last}`,
                        email: user.email,
                        imageUrl: user.picture.large,
                    };
                });

                setProfiles(newProfiles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [count]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
// filter profile cards on the basis of name
    const filteredProfiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={classes.centerContainer}>
            <TextField
                className={classes.searchInput}
                label="Search by Name"
                variant="outlined"
                onChange={handleSearch}
                value={searchTerm}
            />
            <Grid container spacing={2}>
                {filteredProfiles.map((profile, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} src={profile.imageUrl}>
                                        <PersonIcon />
                                    </Avatar>
                                }
                                title={profile.name}
                                subheader={profile.email}
                            />
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProfileCard;
