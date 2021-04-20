import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useContext } from 'react';
import { getReviewsAction } from '../../../store/action/action';
import { store } from '../../../store/store';
import Testimonial from './Testimonial';
import axios from 'axios';

const AllTestimonials = () => {
  const {
    dispatch,
    state: { reviews },
  } = useContext(store);

  const getReviews = async () => {
    return axios.get('http://localhost:5000/reviews');
  };

  useEffect(() => {
    const loadReviews = async () => {
      const reviews = await getReviews();

      dispatch(getReviewsAction(reviews.data));
    };

    try {
      loadReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div style={{ paddingBottom: '3rem' }}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          {reviews.map((testimonial) => (
            <Grid key={testimonial._id} item xs={12} sm={6}>
              <Testimonial key={testimonial._id} testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AllTestimonials;
