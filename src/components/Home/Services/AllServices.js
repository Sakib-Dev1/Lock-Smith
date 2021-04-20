import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import Service from './Service';
import { useEffect } from 'react';
import { getServicesAction } from '../../../store/action/action';
import { useContext } from 'react';
import { store } from '../../../store/store';

const AllServices = () => {
  const {
    dispatch,
    state: { services },
  } = useContext(store);

  const getServices = async () => {
    return axios.get('http://localhost:5000/services');
  };

  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServices();
      console.log({ services });
      dispatch(getServicesAction(services.data));
    };

    try {
      fetchServices();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container maxwidth='lg'>
      <Grid container spacing={3} style={{ marginTop: '3rem' }}>
        {services.map((service) => (
          <Grid key={service.title} xs={12} sm={12} md={4}>
            <Service service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllServices;
