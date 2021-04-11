import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import tw from 'twin.macro';
import { BasicCard } from './BasicCard';
import CardContent from '@material-ui/core/CardContent';
import React, { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { Location } from 'history';

export interface MenuCardProps {
  // 菜单名
  name: string;
  // 菜单解释
  comment?: string;
  // 菜单图标
  icon: IconType;
  // 图标大小
  iconSize?: string;
  // 菜单颜色
  iconColor?: string;
  // 菜单去向（Link）
  to?: string | Location;
  // 菜单点击动作（Button）
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 建议 to 和 onClick 只设置一个，否则将出现可能无法预计的结果
 * @param props
 * @constructor
 */
const MenuCard: React.FC<MenuCardProps> = (props) => {
  return (
    <Link to={props.to ?? ((location: Location) => location.pathname)}>
      <CardActionArea
        onClick={props.onClick}
        tw={'bg-transparent rounded-3xl'}
        css={`
          .MuiCardActionArea-focusHighlight {
            ${tw`opacity-0`}
          }
        `}
      >
        <BasicCard
          tw={'items-center px-6 py-0 font-light'}
          css={`
            min-height: 12vh;
          `}
        >
          {/* Icon */}
          <CardMedia tw={'mr-4'}>
            <props.icon
              size={props.iconSize ?? '2rem'}
              color={props.iconColor ?? '#675675'}
            />
          </CardMedia>
          <CardContent tw={'py-0! border-l-2 border-gray-200 border-solid pl-4'}>
            {/* Menu Name */}
            <Typography variant={'h6'} tw={'text-gray-600 -m-px'}>
              {props.name}
            </Typography>
            {/* Menu Comment */}
            {props.comment && (
              <Typography tw={'text-gray-400 font-extralight'}>
                {props.comment}
              </Typography>
            )}
          </CardContent>
        </BasicCard>
      </CardActionArea>
    </Link>
  );
};

export { MenuCard };
