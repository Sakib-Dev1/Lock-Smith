import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

import man from '../../../images/man2.png';
import darkbg from '../../../images/bg3.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  bg: {
    marginTop: '3rem',
    backgroundImage: `url(${darkbg})`,
    backgroundPosition: '0 100%',
    backgroundSize: 'cover',
    // paddingTop: '70px',
    // paddingBottom: '90px',
  },

  white: {
    color: '#fff',
    fontWeight: '700',
  },

  red: {
    color: '#ff3b3e',
    fontWeight: '700',
  },

  btn: {
    width: '40%',
    color: '#ff3b3e',
    fontWeight: '700',
    padding: '0.9rem',
    fontSize: '1rem',
  },

  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '5rem',
  },
}));

const Statistics = () => {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} className={classes.grid}>
            <Typography className={classes.red}>ABOUT OUR LOCKSMITH</Typography>
            <Typography
              variant='h3'
              className={classes.white}
              style={{ marginTop: '1rem' }}
            >
              Our Fact Speaks about the result <br></br>of our Effort
            </Typography>

            <Typography
              className={classes.white}
              style={{ marginTop: '1.3rem', fontWeight: '400' }}
            >
              When a locksmith is discussing re-keying that are referring to
              altering the code of the lock so that it will work with different
              key or a completely new one. Here is the facts.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <img src={man} alt='dark' />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Statistics;
