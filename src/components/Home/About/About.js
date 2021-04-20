import { Button, Container, Grid, Typography } from '@material-ui/core';
import { LockOpenRounded } from '@material-ui/icons';
import aboutImage from '../../../images/image5.png';
import aboutImage2 from '../../../images/image6.png';

const About = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} sm={12} md={6}>
          <div style={{ display: 'flex' }}>
            <img src={aboutImage} alt='About' />
            <img
              style={{ marginLeft: '-6rem' }}
              src={aboutImage2}
              alt='About'
            />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <LockOpenRounded />
          <Typography
            style={{ marginTop: '1rem', color: '#ff3b3e', fontWeight: '700' }}
          >
            ABOUT CHAVEIRO LOCKSMITH
          </Typography>

          <Typography
            variant='h4'
            style={{ marginTop: '1rem', marginBottom: '2rem' }}
          >
            Quickest Responding Makes Us Reliable
          </Typography>

          <Typography
            variant='body1'
            style={{ lineHeight: '1.6', color: 'gray' }}
          >
            When a locksmith is discussing re-keying that are referring to
            altering the code of the lock so that it will work with different
            key or a completely new one. You have purchased a new lock & want it
            to match the rest of the locks.
          </Typography>

          <Typography
            variant='body1'
            style={{
              marginTop: '0.5rem',
              fontWeight: '700',
              marginBottom: '1.7rem',
            }}
          >
            Call for appointment{' '}
            <span style={{ color: '#ff3b3e' }}>+33 123 456 789</span>
          </Typography>

          <Button variant='contained' color='secondary'>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
