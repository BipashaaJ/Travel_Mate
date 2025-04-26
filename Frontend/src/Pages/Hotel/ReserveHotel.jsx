import React, { useState, useEffect } from 'react';
import { 
  Star as StarIcon,
  LocationOn,
  Phone,
  Email,
  Language,
  Event,
  AttachMoney,
  CheckCircle,
  Send,
  Hotel,
  Spa,
  Restaurant,
  KingBed,
  Pool,
  Wifi,
  LocalParking,
  FitnessCenter,
  RoomService,
<<<<<<< Updated upstream
  ExpandMore
=======
  ExpandMore,
  Edit,
  Delete
>>>>>>> Stashed changes
} from '@material-ui/icons';
import { 
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
<<<<<<< Updated upstream
  Snackbar
=======
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
>>>>>>> Stashed changes
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
<<<<<<< Updated upstream
=======
import HotelReviews from '../Review/HotelReviews';
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes

const useStyles = makeStyles((theme) => ({
  rating: {
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  },
  amenityChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
  cardMedia: {
    objectFit: 'cover',
    height: 600,
    width: 620
  },
  packageTableHead: {
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold'
  },
  submitButton: {
    borderRadius: theme.shape.borderRadius * 2
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
<<<<<<< Updated upstream
=======
  },
  reviewActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  },
  reviewItem: {
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[3]
    }
  },
  hotelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  contactAvatar: {
    marginBottom: theme.spacing(0.5)
>>>>>>> Stashed changes
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HotelReservationPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [review, setReview] = useState({
    name: '',
    rating: 5,
<<<<<<< Updated upstream
    comment: ''
=======
    comment: '',
    review_id: null
>>>>>>> Stashed changes
  });
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState('panel1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
<<<<<<< Updated upstream
=======
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const navigate = useNavigate();
>>>>>>> Stashed changes

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
<<<<<<< Updated upstream
  };

// Fetch hotel data from API
useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/hotel/hotels/${id}`);
  
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }
        const data = await response.json();
        
        // Directly use the returned hotel data
        setHotel(data.hotel || data); // Depending on whether your API returns { hotel } or just the hotel object
        
        // In a real app, you might fetch reviews separately
        setReviews((data.hotel || data).reviews || []);

      // Get username from localStorage
      const user = localStorage.getItem('username');

      if (user) {
        setReview(prev => ({ ...prev, name: user }));
      }

=======
    setSuccessMessage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch hotel data
        const hotelResponse = await fetch(`http://localhost:3001/hotel/hotels/${id}`);
        if (!hotelResponse.ok) throw new Error('Failed to fetch hotel data');
        const hotelData = await hotelResponse.json();
        setHotel(hotelData.hotel || hotelData);
        
        // Get current user from localStorage
        const user = localStorage.getItem('username');
        if (user) {
          setCurrentUser(user);
        }
  
>>>>>>> Stashed changes
      } catch (err) {
        setError(err.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
  
<<<<<<< Updated upstream
    fetchHotelData();
=======
    fetchData();
>>>>>>> Stashed changes
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< Updated upstream
      const newReview = {
        ...review,
        date: new Date(),
        avatar: review.name.split(' ').map(n => n[0]).join('')
      };
      
      // In a real app, you would POST this to your API
      // const response = await fetch(`http://localhost:3001/hotel/hotels/${id}/reviews`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newReview),
      // });
      // const data = await response.json();
      
      // For now, we'll just update the local state
      setReviews([...reviews, newReview]);
      setReview({ name: '', rating: 5, comment: '' });
    } catch (err) {
      setError('Failed to submit review');
      setSnackbarOpen(true);
=======
      // Prepare review data
      const reviewData = {
        hotel_id: id,
        user_name: review.name,
        rating: review.rating,
        review_text: review.comment
      };

      let response, endpoint, method;
      
      if (review.review_id) {
        // Update existing review
        endpoint = `http://localhost:3001/reviews/${review.review_id}`;
        method = 'PUT';
      } else {
        // Create new review
        endpoint = `http://localhost:3001/review/reviews`;
        method = 'POST';
      }

      response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }
      
      const data = await response.json();
      
      // Update local state
      if (review.review_id) {
        setReviews(reviews.map(r => 
          r.review_id === review.review_id ? data.review : r
        ));
        setSuccessMessage('Review updated successfully!');
      } else {
        setReviews([...reviews, data.review]);
        setSuccessMessage('Review submitted successfully!');
      }
      
      // Reset form
      setReview({ 
        name: currentUser || '', 
        rating: 5, 
        comment: '',
        review_id: null
      });
      
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message || 'Failed to submit review');
      setSnackbarOpen(true);
    }
  };

  const handleEditReview = (reviewToEdit) => {
    setReview({
      name: reviewToEdit.user_name,
      rating: reviewToEdit.rating,
      comment: reviewToEdit.review_text,
      review_id: reviewToEdit.review_id
    });
    
    // Scroll to review form
    document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${reviewToDelete}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
      }
      
      setReviews(reviews.filter(r => r.review_id !== reviewToDelete));
      setSuccessMessage('Review deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message || 'Failed to delete review');
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
>>>>>>> Stashed changes
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className={classes.loadingContainer}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!hotel) {
    return (
      <Container maxWidth="lg" style={{ padding: '32px 0', textAlign: 'center' }}>
        <Typography variant="h5">Hotel not found</Typography>
      </Container>
    );
  }

<<<<<<< Updated upstream
  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }}>
      {/* Error Snackbar */}
=======
  const handleBookNow = (pkg) => {
    navigate('/booking', { 
      state: { 
        packageData: pkg,
        hotelData: hotel
      }
    });
  };

  return (
    <Container maxWidth="lg" style={{ padding: '32px 0' }}>
      {/* Error/Success Snackbar */}
>>>>>>> Stashed changes
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
<<<<<<< Updated upstream
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Hotel Header Section */}
      <Card style={{ marginBottom: 32, overflow: 'hidden', height:'100vh' }}>
=======
        <Alert 
          onClose={handleSnackbarClose} 
          severity={error ? 'error' : 'success'}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Review</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteReview} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hotel Header Section */}
      <Card style={{ marginBottom: 32, overflow: 'hidden', height: '100vh' }}>
>>>>>>> Stashed changes
        <Grid container>
          {/* Hotel Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              className={classes.cardMedia}
              image={hotel.hotel_image.startsWith('http') ? hotel.hotel_image : `http://localhost:3001${hotel.hotel_image}`}
              alt={hotel.hotel_name}
            />
          </Grid>

          {/* Hotel Details */}
          <Grid item xs={12} md={6}>
            <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
<<<<<<< Updated upstream
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" style={{ fontWeight: 'bold', marginBottom:'20px', textAlign:'justify' }}>
=======
              <Box className={classes.hotelHeader}>
                <Typography variant="h4" component="h1" style={{ fontWeight: 'bold' }}>
>>>>>>> Stashed changes
                  {hotel.hotel_name}
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Hotel color="primary" style={{ marginRight: 8 }} />
                  <Rating 
                    value={hotel.star_rating} 
                    precision={0.5} 
                    readOnly 
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
                  />
                </Box>
              </Box>
              
              <Typography variant="body1" color="textSecondary" paragraph>
                {hotel.description}
              </Typography>
              
              <Divider style={{ margin: '16px 0' }} />
              
              <Box style={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
<<<<<<< Updated upstream
                      <Avatar style={{ backgroundColor: '#1976d2', marginBottom:'5px' }}>
=======
                      <Avatar style={{ backgroundColor: '#1976d2' }} className={classes.contactAvatar}>
>>>>>>> Stashed changes
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={hotel.address} 
                      secondary={hotel.city}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
<<<<<<< Updated upstream
                      <Avatar style={{ backgroundColor: '#4caf50', marginBottom:'5px'  }}>
=======
                      <Avatar style={{ backgroundColor: '#4caf50' }} className={classes.contactAvatar}>
>>>>>>> Stashed changes
                        <Phone />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={hotel.phone_number} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
<<<<<<< Updated upstream
                      <Avatar style={{ backgroundColor: '#f44336', marginBottom:'5px'  }}>
=======
                      <Avatar style={{ backgroundColor: '#f44336' }} className={classes.contactAvatar}>
>>>>>>> Stashed changes
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={hotel.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
<<<<<<< Updated upstream
                      <Avatar style={{ backgroundColor: '#2196f3', marginBottom:'5px'  }}>
=======
                      <Avatar style={{ backgroundColor: '#2196f3' }} className={classes.contactAvatar}>
>>>>>>> Stashed changes
                        <Language />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <a 
                          href={`https://${hotel.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {hotel.website}
                        </a>
                      } 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Divider style={{ margin: '16px 0' }} />
<<<<<<< Updated upstream
              
              <Box>
                <Typography variant="h6" gutterBottom>Facilities & Amenities</Typography>
                <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {/* Since amenities aren't in your API response, we'll use some defaults */}
                  <Chip
                    icon={<Wifi />}
                    label="Free WiFi"
                    variant="outlined"
                    className={classes.amenityChip}
                  />
                  <Chip
                    icon={<Pool />}
                    label="Swimming Pool"
                    variant="outlined"
                    className={classes.amenityChip}
                  />
                  <Chip
                    icon={<Restaurant />}
                    label="Restaurant"
                    variant="outlined"
                    className={classes.amenityChip}
                  />
                  <Chip
                    icon={<LocalParking />}
                    label="Free Parking"
                    variant="outlined"
                    className={classes.amenityChip}
                  />
                </Box>
              </Box>
=======
>>>>>>> Stashed changes
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Packages Section */}
      <Box style={{ marginBottom: 32 }}>
        <Typography variant="h4" component="h2" style={{ marginBottom: 24, fontWeight: 'bold' }}>
          Our Exclusive Packages
        </Typography>
        
        <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" style={{ fontWeight: 500 }}>View Available Packages</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {hotel.hotel_packages && hotel.hotel_packages.length > 0 ? (
<<<<<<< Updated upstream
              <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} aria-label="hotel packages table">
                  <TableHead className={classes.packageTableHead}>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Package</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                      <TableCell align="center" style={{ fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Inclusions</TableCell>
                      <TableCell align="center" style={{ fontWeight: 'bold' }}>Validity</TableCell>
                      <TableCell align="center" style={{ fontWeight: 'bold' }}>Action</TableCell>
=======
              <TableContainer 
                component={Paper}
                style={{ 
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <Table style={{ minWidth: 800 }} aria-label="hotel packages table">
                  <TableHead 
                    className={classes.packageTableHead}
                    style={{ backgroundColor: '#E4D00A'}}
                  >
                    <TableRow>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '15%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a'
                      }}>Package</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '25%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a'
                      }}>Description</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '8%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a',
                        textAlign: 'center'
                      }}>Rooms</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '15%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a',
                        textAlign: 'center'
                      }}>Price</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '20%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a'
                      }}>Inclusions</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '10%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a',
                        textAlign: 'center'
                      }}>Validity</TableCell>
                      <TableCell style={{ 
                        fontWeight: 'bold', 
                        width: '7%',
                        fontSize: '0.875rem',
                        color: '#3a3a3a',
                        textAlign: 'center'
                      }}>Action</TableCell>
>>>>>>> Stashed changes
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotel.hotel_packages.map((pkg, index) => (
                      <TableRow
                        key={index}
                        hover
<<<<<<< Updated upstream
                        style={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" style={{ fontWeight: 500 }}>
                          {pkg.package_name}
                        </TableCell>
                        <TableCell style={{ color: 'textSecondary' }}>{pkg.package_description}</TableCell>
                        <TableCell align="center">
                          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 style={{marginRight:'4px'}}>Rs</h4>
                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                              {pkg.price.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" style={{ marginLeft: 4 }}>/night</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <List dense>
                            {pkg.inclusions.map((inc, i) => (
                              <ListItem key={i} disableGutters>
                                <ListItemAvatar style={{ minWidth: 32 }}>
                                  <CheckCircle color="primary" fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText primary={inc} />
=======
                        style={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafc'
                        }}
                      >
                        <TableCell 
                          component="th" 
                          scope="row" 
                          style={{ 
                            fontWeight: 600,
                            color: '#2c3e50',
                            fontSize: '0.875rem'
                          }}
                        >
                          {pkg.package_name}
                        </TableCell>
                        <TableCell style={{ color: '#6b7280' }}>
                          <Typography 
                            style={{ 
                              maxWidth: '300px',
                              fontSize: '0.875rem',
                              lineHeight: '1.4'
                            }}
                          >
                            {pkg.package_description}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          <Typography 
                            variant="body1" 
                            style={{ 
                              fontWeight: 'bold',
                              color: '#3b82f6',
                              fontSize: '1.5rem'
                            }}
                          >
                            {pkg.no_of_rooms}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          <Box style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexDirection: 'column'
                          }}>
                            <Typography 
                              variant="body1" 
                              style={{ 
                                fontWeight: 'bold',
                                color: '#10b981',
                                fontSize: '1.5rem',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <span style={{ 
                                fontSize: '0.9rem',
                                marginRight: 4,
                                color: '#6b7280'
                              }}>Rs</span>
                              {pkg.price.toLocaleString()}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              style={{ 
                                color: '#9ca3af',
                                fontSize: '0.7rem'
                              }}
                            >
                              per night
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <List dense disablePadding>
                            {pkg.inclusions.map((inc, i) => (
                              <ListItem 
                                key={i} 
                                disableGutters
                                style={{ padding: '4px 0' }}
                              >
                                <ListItemAvatar style={{ minWidth: 28 }}>
                                  <CheckCircle 
                                    style={{ 
                                      color: '#10b981',
                                      fontSize: '1rem'
                                    }} 
                                  />
                                </ListItemAvatar>
                                <ListItemText 
                                  primary={
                                    <Typography 
                                      style={{ 
                                        fontSize: '0.875rem',
                                        color: '#4b5563'
                                      }}
                                    >
                                      {inc}
                                    </Typography>
                                  } 
                                />
>>>>>>> Stashed changes
                              </ListItem>
                            ))}
                          </List>
                        </TableCell>
<<<<<<< Updated upstream
                        <TableCell align="center">
                          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Event color="action" style={{ marginRight: 8 }} />
                            <Typography variant="body2">
=======
                        <TableCell style={{ textAlign: 'center' }}>
                          <Box style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexDirection: 'column'
                          }}>
                            <Event 
                              style={{ 
                                color: '#8b5cf6',
                                fontSize: '1.5rem',
                                marginBottom: 4
                              }} 
                            />
                            <Typography 
                              variant="body2"
                              style={{ 
                                fontSize: '1rem',
                                color: '#6b7280'
                              }}
                            >
>>>>>>> Stashed changes
                              {new Date(pkg.validity_period).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </TableCell>
<<<<<<< Updated upstream
                        <TableCell align="center">
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small"
                            className={classes.submitButton}
=======
                        <TableCell style={{ textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="medium"
                            style={{
                              borderRadius: 8,
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '0.8rem',
                              padding: '6px 12px',
                              boxShadow: 'none',
                              backgroundColor: '#3b82f6',
                              '&:hover': {
                                backgroundColor: '#2563eb'
                              }
                            }}
                            onClick={() => handleBookNow(pkg)}
>>>>>>> Stashed changes
                          >
                            Book Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
<<<<<<< Updated upstream
              <Typography variant="body1" color="textSecondary">
                No packages available at this time.
              </Typography>
=======
              <Box 
                style={{ 
                  width: '100%',
                  padding: 24,
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  borderRadius: 12
                }}
              >
                <Typography 
                  variant="body1" 
                  style={{ 
                    color: '#64748b',
                    fontSize: '0.875rem'
                  }}
                >
                  No packages available at this time.
                </Typography>
              </Box>
>>>>>>> Stashed changes
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

<<<<<<< Updated upstream
      {/* Reviews Section */}
      <Box>
        <Typography variant="h4" component="h2" style={{ marginBottom: 24, fontWeight: 'bold' }}>
          Guest Experiences
        </Typography>
        
        {/* Review Form */}
        <Paper elevation={3} style={{ padding: 24, marginBottom: 32 }}>
          <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 500 }}>
            Share Your Experience
          </Typography>
          <form onSubmit={handleReviewSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  value={review.name}
                  onChange={(e) => setReview({...review, name: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Rating
                  name="review-rating"
                  value={review.rating}
                  onChange={(e, newValue) => setReview({...review, rating: newValue})}
                  precision={1}
                  icon={<StarIcon fontSize="large" />}
                  emptyIcon={<StarIcon fontSize="large" />}
                  className={classes.rating}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Review"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                  className={classes.submitButton}
                >
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Existing Reviews */}
        <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 500 }}>
          What Our Guests Say
        </Typography>
        {reviews.length > 0 ? (
          <List style={{ width: '100%', backgroundColor: 'background.paper' }}>
            {reviews.map((rev, index) => (
              <Paper key={index} elevation={2} style={{ marginBottom: 16, padding: 16 }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#1976d2' }}>
                      {rev.avatar || rev.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography component="span" variant="subtitle1" color="textPrimary">
                            {rev.name}
                          </Typography>
                          <Rating 
                            value={rev.rating} 
                            readOnly 
                            size="small"
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
                          />
                        </Box>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          style={{ display: 'block', marginBottom: 8 }}
                        >
                          {rev.comment}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                        >
                          {new Date(rev.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No reviews yet. Be the first to review!
          </Typography>
        )}
      </Box>
    </Container>
  );
};
=======
      <HotelReviews 
        hotelId={id} 
        initialReviews={reviews}
        currentUser={currentUser}
      />
          </Container>
        );
      };
>>>>>>> Stashed changes

export default HotelReservationPage;