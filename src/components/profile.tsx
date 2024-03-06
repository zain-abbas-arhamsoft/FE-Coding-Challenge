import { Card, CardContent, CardHeader, Avatar, Typography, Grid, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Pagination from './pagination';
import { useState, useEffect } from 'react';
import { useStyles } from './styles/profile.css';
import { useProfileContext } from './context/profilecontext'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

interface ProfileCardProps {
    name: string;
    email: string;
    imageUrl: string;
}

const ProfileCard: React.FC<{ count: number }> = ({ count }) => {
    const classes = useStyles();
    const navigate = useNavigate(); // Initialize useNavigate

    const { setProfile } = useProfileContext(); // Get the setProfile function from the context
    const [profiles, setProfiles] = useState<ProfileCardProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    Array.from({ length: count }, () => fetch(`https://randomuser.me/api/`).then((response) => response.json()))
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

    const filteredProfiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredProfiles.length / itemsPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0); // Reset to first page when searching
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };
    const handleCardClick = (profile: ProfileCardProps) => {
        setProfile(profile.name, profile.email, profile.imageUrl); // Set the selected profile
        navigate(`/profile/${profile.name}`); // Navigate to the profile detail page
    };
    const renderCards = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProfiles.length);

        return (
            <Grid container spacing={2}>
                {filteredProfiles.slice(startIndex, endIndex).map((profile, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <Card className={classes.card}
                            onClick={() => handleCardClick(profile)} // Handle card click
                        >
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
        );
    };

    return (
        <div className={classes.centerContainer}>
            <TextField
                className={classes.searchInput}
                label="Search by Name"
                variant="outlined"
                onChange={handleSearch}
                value={searchTerm}
            />

            {renderCards()}

            {pageCount > 1 && (
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ProfileCard;
