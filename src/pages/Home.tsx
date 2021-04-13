import Box from '@material-ui/core/Box';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { InfoCard } from '../components/InfoCard';
import 'twin.macro';
import { MenuCard } from '../components/MenuCard';
import { RiSuitcase2Fill } from 'react-icons/all';
import { ABOUT_PAGE } from '../routes';

// --tw-gradient-stops: #aba0eb, #fbc7d4
const Home: React.FC = () => {
  return (
    <Box component={Div100vh} tw={'px-4 py-8 bg-gray-50'}>
      <Box tw={'mb-8'}>
        <InfoCard />
      </Box>
      <Box>
        <MenuCard
          name={'请假申请'}
          comment={'信息'}
          icon={RiSuitcase2Fill}
          to={ABOUT_PAGE.path}
        />
      </Box>
    </Box>
  );
};
export { Home };
