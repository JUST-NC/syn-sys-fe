import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { VscClose } from 'react-icons/vsc';
import { theme } from 'twin.macro';
import React from 'react';

export interface CrossProps {
  //点击后跳转的链接地址
  Link: string;
  //IconButton的tw样式
  iconButtonTw?: string;
  //VscClose的size
  vscCLoseSize: string;
  //vscCLose的color，
  vscCloseColor?: string;
}

const CrossSign: React.FC<CrossProps> = (props) => {
  return (
    <RouterLink to={props.Link}>
      <IconButton
        tw={props.iconButtonTw || 'fixed -top-4 -right-3 p-4 z-50 bg-gray-300 shadow-md'}
      >
        <VscClose
          size={theme(props.vscCLoseSize || 'fontSize.5xl')}
          color={theme(props.vscCloseColor || 'colors.white')}
        />
      </IconButton>
    </RouterLink>
  );
};

export { CrossSign };
