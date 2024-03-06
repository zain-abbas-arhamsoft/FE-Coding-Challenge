import React from 'react';
import ReactPaginate from 'react-paginate';
import { useStyles } from './styles/profile.css'; // Import the styles

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
    const classes = useStyles(); // Use the useStyles hook

    return (
        <div className={classes.pagination}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}
                containerClassName={classes.pagination}
                pageClassName={classes.paginationButton}
                activeClassName="active"
                previousClassName={classes.paginationButton}
                nextClassName={classes.paginationButton}
                previousLabel="Previous"
                nextLabel="Next"
            />
        </div>
    );
};

export default Pagination;
