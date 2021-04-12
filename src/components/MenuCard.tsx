import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { BasicCard } from './BasicCard';
import CardContent from '@material-ui/core/CardContent';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import tw, { css, theme } from 'twin.macro';

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
  // 是否禁用
  disabled?: boolean | (() => boolean) | Promise<any>;
}

/**
 * 建议 to 和 onClick 只设置一个，否则将出现无法预计的结果
 * @param props
 * @constructor
 */
const MenuCard: React.FC<MenuCardProps> = (props) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const dis = props.disabled === undefined ? disabled : props.disabled;

    if (typeof dis === 'boolean') {
      setDisabled(dis);
    } else if (typeof dis === 'function') {
      // 这里最外面是 IIFE
      // async 是处理异步
      // 除了括号多一点，解释一下应该挺好理解了……
      (async () => setDisabled(await dis()))();
    }
  }, [props.disabled, disabled]);

  return (
    <CardActionArea
      onClick={props.onClick}
      tw={'bg-transparent rounded-2xl mb-5'}
      css={css`
        // focus 样式
        .MuiCardActionArea-focusHighlight {
          ${tw`opacity-0!`}
        }
      `}
      disabled={disabled}
    >
      <Link to={props.to ?? ((location: Location) => location.pathname)}>
        <BasicCard
          css={css`
            ${tw`items-center px-6 py-0 font-light`};

            z-index: -1;
            min-height: 12vh;

            ${disabled &&
            css`
              --color-1: ${theme`colors.gray.200`};
              --color-2: ${theme`colors.white`};

              background: repeating-linear-gradient(
                45deg,
                var(--color-1),
                var(--color-1) 10px,
                var(--color-2) 10px,
                var(--color-2) 20px
              );

              &::after {
                ${tw`content block absolute w-full h-4/5 left-0 rounded-xl bg-gray-50`};
              }
            `}
          `}
        >
          {/* Icon */}
          <CardMedia css={[tw`mr-4 z-10`, disabled && tw`opacity-50`]}>
            <props.icon
              size={props.iconSize ?? '2rem'}
              color={props.iconColor ?? '#675675'}
            />
          </CardMedia>
          <CardContent
            css={[tw`py-0! border-l-2 border-gray-200 border-solid pl-4 z-10`]}
          >
            {/* Menu Name */}
            <Typography
              variant={'h6'}
              css={[tw`text-gray-500 -m-px`, disabled && tw`text-gray-300`]}
            >
              {props.name}
            </Typography>
            {/* Menu Comment */}
            {props.comment && (
              <Typography
                css={[tw`text-gray-400 font-extralight`, disabled && tw`text-gray-200`]}
              >
                {props.comment}
              </Typography>
            )}
          </CardContent>
        </BasicCard>
      </Link>
    </CardActionArea>
  );
};

export { MenuCard };
