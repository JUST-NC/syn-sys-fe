import { TextField, TextFieldProps } from 'mui-rff';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import React from 'react';

const FormTextField: React.FC<TextFieldProps> = (props) => (
  <TextField
    margin={'normal'}
    variant={'filled'}
    tw={'mb-7 h-16'}
    css={css`
      .MuiFilledInput-underline:before {
        ${tw`h-0.5 border-b-0 i-bg`}
      }
    `}
    {...props}
  />
);

export { FormTextField };
