import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { userStore } from '../stores/user-store';
import { RiSettings4Fill } from 'react-icons/all';
import tw from 'twin.macro';
import { useHistory } from 'react-router-dom';
import { ABOUT_PAGE } from '../routes';
import { BasicCard } from './BasicCard';

const StyledIconBtn = tw(
  IconButton,
)`p-2 shadow-none border border-solid border-gray-100 text-white`;

/**
 * 信息卡片
 *
 * 设计目的：基础信息、消息中心、个人设置和某些功能的入口
 */
const InfoCard: React.FC = () => {
  const h = useHistory();
  // TODO: 转为去到个人设置页
  const onClick = () => h.push(ABOUT_PAGE.path);
  //备选：#B2FEFA
  return (
    <BasicCard
      tw={'flex-col min-h-1/4-screen bg-gradient-to-br'}
      css={'--tw-gradient-stops: #dbfffd, #acb6e5; color: #675675'}
    >
      <CardContent tw={'flex-grow'}>
        <Typography
          variant={'h5'}
          tw={'font-sans font-black'}
          css={`
            &::after {
              content: '';
              display: block;
              position: absolute;
              width: 20%;
              height: 3px;
              background-color: currentColor;
            }
          `}
        >
          Hi, {userStore.basic?.username ?? 'Unknown'}
        </Typography>
      </CardContent>
      <CardActions tw={'self-end'}>
        <StyledIconBtn onClick={onClick}>
          <RiSettings4Fill />
        </StyledIconBtn>
      </CardActions>
    </BasicCard>
  );
};

export { InfoCard };
