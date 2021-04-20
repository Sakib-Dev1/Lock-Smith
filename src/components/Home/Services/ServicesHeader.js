import { Container, Typography } from '@material-ui/core';
import { LockOpenRounded } from '@material-ui/icons';

const ServicesHeader = () => {
  return (
    <Container maxWidth='sm'>
      <div style={{ textAlign: 'center' }}>
        <LockOpenRounded />
        <Typography
          variant='h5'
          style={{
            color: '#ff3b3e',
            marginTop: '1rem',
            marginBottom: '0.7rem',
          }}
        >
          Common Problem Solutions
        </Typography>

        <Typography variant='h4' style={{ marginBottom: '1.5rem' }}>
          Most popular locksmith services
        </Typography>

        <Typography>
          When a locksmith is discussing re-keying that are referring to
          altering the code of the lock so that it
        </Typography>
      </div>
    </Container>
  );
};

export default ServicesHeader;
