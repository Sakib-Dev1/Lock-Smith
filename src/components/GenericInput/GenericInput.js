import { TextField } from '@material-ui/core';
import { forwardRef } from 'react';

const GenericInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default GenericInput;
