import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import tw, { css } from 'twin.macro';

const FormButton: React.FC<ButtonProps> = ({ size, ...props }) => (
  <Button
    tw={'text-lg text-white rounded-full i-bg'}
    css={css`
      ${size === 'small' && tw`py-2 px-10`} ${size === 'medium' && tw`py-5 px-20`}
    `}
    disableElevation={true}
    variant={'contained'}
    {...props}
  />
);

export { FormButton };
