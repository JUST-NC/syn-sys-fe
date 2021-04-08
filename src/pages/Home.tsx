import Box from '@material-ui/core/Box';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { InfoCard } from '../components/InfoCard';
import 'twin.macro';
import { BasicCard } from '../components/BasicCard';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia, Typography } from '@material-ui/core';
import { GiSunglasses } from 'react-icons/all';

const Home: React.FC = () => {
  return (
    <Box component={Div100vh} tw={'px-4 py-8 bg-gray-50'}>
      <Box tw={'mb-5'}>
        <InfoCard />
      </Box>
      <Box>
        <BasicCard
          tw={'items-center px-6 py-0 bg-gradient-to-r font-light'}
          css={'min-height: 12vh; --tw-gradient-stops: #aba0eb, #fbc7d4'}
        >
          <CardMedia>
            <GiSunglasses size={'3rem'} color={'#fff'} />
          </CardMedia>
          <CardContent tw={'py-0!'}>
            <Typography tw={'text-white'}>请假</Typography>
            <Typography tw={'text-gray-200 font-extralight'}>信息</Typography>
          </CardContent>
        </BasicCard>
      </Box>
    </Box>
  );
};
export { Home };
