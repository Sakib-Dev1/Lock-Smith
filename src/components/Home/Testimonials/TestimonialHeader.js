import { Container, Typography } from '@material-ui/core';
import { LockOpenRounded } from '@material-ui/icons';

const TestimonialHeader = () => {
  return (
    <Container maxWidth='sm'>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <LockOpenRounded style={{ marginTop: '2rem', color: '#fff' }} />
        <Typography
          variant='h5'
          style={{
            color: '#ff3b3e',
            marginTop: '1rem',
            marginBottom: '0.7rem',
          }}
        >
          CLIENTS TESTIMONIAL
        </Typography>

        <Typography
          variant='h4'
          style={{ marginBottom: '1.5rem', color: '#fff' }}
        >
          What our clients say about us
        </Typography>

        <Typography style={{ color: '#fff' }}>
          When a locksmith is discussing re-keying that are referring to
          altering the code of the lock so that it
        </Typography>
      </div>
    </Container>
  );
};

export default TestimonialHeader;
