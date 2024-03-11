import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ProfileSearch from './search';
import ProfileCardItem from './cardItem';
import { Pagination } from './pagination/pagination';
import { useProfileContext } from '../context/profileContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStyles } from '../styles/profile.css';
interface Profile {
    name: string;
    email: string;
    imageUrl: string;
    gender: string
}

const ProfileCard: React.FC<{ count: number }> = ({ count }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const { setProfile } = useProfileContext();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
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
                        gender: user.gender
                    };
                });
                setProfiles(newProfiles);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // handle search logic and filter profiles
        const urlSearchParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlSearchParams.get('searchTerm');
        setSearchTerm(searchTermFromURL || '');
        let filteredProfilesFromStorage = null;
        if (searchTermFromURL === null)
            localStorage.removeItem("filteredProfiles")
        const storedFilteredProfiles = localStorage.getItem('filteredProfiles');
        if (storedFilteredProfiles) {
            filteredProfilesFromStorage = JSON.parse(storedFilteredProfiles);
        }

        if (filteredProfilesFromStorage) {
            setFilteredProfiles(filteredProfilesFromStorage);
        } else {
            const filteredProfilesFromURL = searchTermFromURL
                ? profiles.filter((profile) => profile.gender.toLowerCase().includes(searchTermFromURL.toLowerCase()))
                : profiles;
            setFilteredProfiles(filteredProfilesFromURL);
        }
    }, [location.search, profiles]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update search term and filter profiles
        const newSearchTerm = event.target.value.toLowerCase();
        setSearchTerm(newSearchTerm);
        const filteredProfiles = newSearchTerm
            ? profiles.filter((profile) => profile.gender.toLowerCase().includes(newSearchTerm))
            : profiles;
        setFilteredProfiles(filteredProfiles);
        const urlSearchParams = new URLSearchParams();
        if (newSearchTerm) {
            urlSearchParams.set('searchTerm', newSearchTerm);
        }
        navigate(`?${urlSearchParams.toString()}`);

    };
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };
    const handleCardClick = (profile: Profile) => {
        setProfile(profile.name, profile.email, profile.imageUrl, profile.gender);
        localStorage.setItem('filteredProfiles', JSON.stringify(filteredProfiles));
        navigate(`/profile/${profile.gender}`);
    };

    return (
        <div className={classes.centerContainer}>
            <ProfileSearch searchTerm={searchTerm} onSearchChange={handleSearch} />
            <Grid container spacing={2}>
                {filteredProfiles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((profile, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <ProfileCardItem profile={profile} onClick={() => handleCardClick(profile)} />
                    </Grid>
                ))}
            </Grid>
            {filteredProfiles.length > itemsPerPage && (
                <Pagination pageCount={Math.ceil(filteredProfiles.length / itemsPerPage)} currentPage={currentPage} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default ProfileCard;
