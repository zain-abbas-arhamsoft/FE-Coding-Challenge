import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  paginationButton: {
    cursor: 'pointer',
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}))
