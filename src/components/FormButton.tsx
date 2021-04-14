import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

const FormButton: React.FC<ButtonProps> = (props) => (
  <Button
    tw={'py-5 px-20 text-lg text-white rounded-full i-bg'}
    disableElevation={true}
    variant={'contained'}
    {...props}
  />
);

export { FormButton };
