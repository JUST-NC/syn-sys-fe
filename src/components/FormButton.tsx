import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import tw, { css } from 'twin.macro';

const FormButton: React.FC<ButtonProps> = (props) => {
  const { size = 'small', ...otherProps } = props;
  return (
    <Button
      tw={'text-white rounded-full i-bg'}
      css={css`
        ${size === 'small' && tw`py-2 px-10 text-lg`} ${size === 'medium' &&
        tw`py-5 px-20 text-xl`}
      `}
      disableElevation={true}
      variant={'contained'}
      {...otherProps}
    />
  );
};

export { FormButton };
