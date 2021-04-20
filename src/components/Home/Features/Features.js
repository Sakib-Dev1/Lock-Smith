import { Grid, Typography } from '@material-ui/core';

const featureInfo = [
  {
    title: 'Household Security Installation',
    description:
      'we offering you you comprehensive services to the industrial, commercial, residential & automotive sectors',

    buttonText: 'Learn More',

    bg: '#13131c',
  },

  {
    title: 'Automobile Door Lock Opening',
    description:
      'we offering you you comprehensive services to the industrial, commercial, residential & automotive sectors',
    buttonText: 'Learn More',
    bg: '#1e1e2a',
  },

  {
    title: 'Opening Locked House Door',
    description:
      'Our team include the trained locksmiths experienced architectural hardware specialists & lock exprerts',
    buttonText: 'Learn More',
    bg: '#3f1817',
  },
];

const Features = () => {
  return (
    <Grid style={{ color: '#fff' }} container>
      {featureInfo.map((feature) => (
        <Grid
          key={feature.bg}
          style={{ backgroundColor: `${feature.bg}`, padding: '2.5rem' }}
          item
          xs={12}
          sm={12}
          md={4}
        >
          <Typography
            variant='h5'
            style={{ color: '#ff3b3e', fontWeight: '700' }}
          >
            {feature.title}
          </Typography>

          <Typography
            variant='body1'
            style={{ lineHeight: '1.9', marginTop: '1.3rem' }}
          >
            {feature.description}
          </Typography>

          <Typography variant='h6' style={{ marginTop: '1.5rem' }}>
            {feature.buttonText}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
