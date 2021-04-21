import { TextField, TextFieldProps } from 'mui-rff';
import React from 'react';
import { css } from '@emotion/react';
import tw from 'twin.macro';

const FormInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      css={css`
        ${tw`mb-8 border-b-2 border-gray-100 border-solid`}
        .MuiInputLabel-shrink {
          transform: translate(0, 1.5px);
        }

        label {
          ${tw`text-gray-500`}
        }

        label + .MuiInput-formControl {
          ${tw`mt-6 before:(border-none!) after:(border-none!)`}
        }

        .MuiInput-input {
          ${tw`pt-6 (i-color bg-white)!`}
        }

        .MuiFormHelperText-root.Mui-error {
          position: absolute;
          bottom: -1.4rem;
        }
      `}
      InputLabelProps={{ disableAnimation: true, shrink: true }}
      {...props}
    />
  );
};

export { FormInput };
