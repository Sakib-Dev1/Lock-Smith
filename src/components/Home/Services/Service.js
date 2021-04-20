import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MonetizationOnOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

  card: {
    transition: 'all 0.3s ease-out',
    borderRadius: '15px',

    '&:hover': {
      transform: 'translateY(-5px) scale(1.005) translateZ(0)',
    },
  },
});

export default function Service({ service }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={`${classes.root} ${classes.card}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={service.image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {service.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {service.description}
          </Typography>

          <Typography
            gutterBottom
            variant='h3'
            component='h2'
            style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
          >
            <MonetizationOnOutlined style={{ fontSize: '3rem' }} />
            <Typography variant='h3'>{service.price}</Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            history.push(`/book/${service._id}`);
          }}
          size='large'
          color='primary'
          variant='contained'
        >
          Get Service
        </Button>
      </CardActions>
    </Card>
  );
}
