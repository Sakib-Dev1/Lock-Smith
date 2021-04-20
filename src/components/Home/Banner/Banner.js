import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import bannerImg from '../../../images/slider_bg1.jpg';
import personImg from '../../../images/man1.png';
import Features from '../Features/Features';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  bg: {
    backgroundImage: `url(${bannerImg})`,
    backgroundPosition: '0 100%',
    backgroundSize: 'cover',
    paddingTop: '70px',
    // paddingBottom: '90px',
  },

  grid: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    marginTop: '5rem',
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
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.bg}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <Typography className={classes.white} variant='h4'>
              URGENT SERVICE:{' '}
              <span style={{ color: '#ff3b3e' }}>+44 321 653 978</span>
            </Typography>

            <div>
              <Typography className={classes.white} variant='h2'>
                Emergencry
              </Typography>

              <Typography variant='h2' className={classes.red}>
                <span color='secondary'>Locksmith service</span>
              </Typography>

              <Typography className={classes.white} variant='h3'>
                available 24/7
              </Typography>
            </div>

            <Typography
              className={classes.white}
              style={{ marginTop: '2rem' }}
              variant='body1'
            >
              We offer comprehensive services to the industrial
            </Typography>

            <Typography
              className={classes.white}
              variant='body1'
              style={{ marginBottom: '1.5rem' }}
            >
              residential and automotive sectoes
            </Typography>

            <Button className={classes.btn} variant='contained'>
              LEARN MORE
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <img style={{ maxWidth: '100%' }} src={personImg} alt='Banner' />
          </Grid>
        </Grid>
      </Container>
      <Features />
    </div>
  );
};

export default Banner;
