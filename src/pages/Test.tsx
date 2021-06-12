import React from 'react';
import { Tabulation } from '../components/Tabulation';
import { Paper } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

const Test: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TEST</title>
      </Helmet>

      <Paper elevation={0} tw={'py-20 px-4 bg-gray-100'}>
        <Tabulation pageSize={10} flow_status={0} />
      </Paper>
    </>
  );
};

export { Test };
