import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { VscClose } from 'react-icons/vsc';
import { theme } from 'twin.macro';
import React from 'react';

export interface CrossProps {
  //点击后跳转的链接地址
  Link: string;
}

const CrossSign: React.FC<CrossProps> = (props) => {
  return (
    <RouterLink to={props.Link}>
      <IconButton tw={'fixed -top-4 -right-3 p-4 z-50 bg-gray-300 shadow-md'}>
        <VscClose size={theme('fontSize.5xl')} color={theme('colors.white')} />
      </IconButton>
    </RouterLink>
  );
};

export { CrossSign };
