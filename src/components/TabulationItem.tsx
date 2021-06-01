import ListItem from '@material-ui/core/ListItem';
import React, { useState } from 'react';
import { Flow } from '../models/holidayForm-model';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { HiOutlineFire } from 'react-icons/hi';
import ListItemText from '@material-ui/core/ListItemText';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import tw, { styled } from 'twin.macro';
import { FlowStatus } from '../enum/FlowStatus';

//列表项样式
const TabulationItemBasic = styled(ListItem)(() => [
  tw`
    mb-1
    bg-white
    px-5 h-20
    rounded-lg
    border-gray-300
    divide-y-reverse 
    hover:border-pink-500 
  `,
]);

interface TabulationItemProps {
  props: { status: FlowStatus | boolean };
  data: Flow;
}

//列表项
const TabulationItem: React.FC<TabulationItemProps> = ({ props, data }) => {
  //TODO: 处理点击事件
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  if (props.status === true || data.holiday.status === props.status) {
    return (
      <>
        <TabulationItemBasic onClick={handleClick} button={true} divider={true}>
          <ListItemIcon tw={'min-w-min w-8'}>
            <HiOutlineFire />
          </ListItemIcon>
          <ListItemText
            tw={'truncate'}
            primary={data.holiday?.userName}
            secondary={data.holiday?.reason ? data.holiday?.reason : null}
          />
        </TabulationItemBasic>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          tw={'py-60 px-10 overflow-hidden'}
          open={open}
          onClose={handleClick}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open} disableStrictModeCompat={true}>
            <div
              tw={
                'rounded-md p-4 h-60 border-white bg-gray-50 ring-0 hover:border-0 hover:outline-none'
              }
            >
              <h2 id="transition-modal-title">{data.holiday?.userName}</h2>

              <p id="transition-modal-description">{data.holiday?.reason}</p>
            </div>
          </Fade>
        </Modal>
      </>
    );
  }
  return <></>;
};

export { TabulationItem };
