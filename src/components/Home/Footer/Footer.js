import { Container, Grid, Typography } from '@material-ui/core';
import { PhoneAndroidOutlined } from '@material-ui/icons';

const Footer = () => {
  return (
    <div style={{ background: '#ff3b3e', padding: '3rem', marginTop: '2rem' }}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={6}>
            <Typography variant='h4' style={{ color: '#fff' }}>
              If You have any other Questions <br/>You Can call Us
            </Typography>
          </Grid>

          <Grid xs={12} sm={12} md={6}>
            <Typography variant='h4' style={{ color: '#fff' }}>
              <PhoneAndroidOutlined />{' '}
              <span style={{ color: '#fff' }}>(+123)987.654.32</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
