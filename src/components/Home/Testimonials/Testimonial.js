import { Avatar, Card, CardContent, Typography } from '@material-ui/core';

const Testimonial = ({ testimonial }) => {
  return (
    <div style={{ marginTop: '3rem' }}>
      <Card style={{ height: '200px' }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: '1rem' }} />
            <Typography variant='h5'>{testimonial.name}</Typography>
          </div>
          <Typography
            variant='caption'
            style={{ marginTop: '1rem' }}
            variant='body2'
          >
            {testimonial.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonial;
