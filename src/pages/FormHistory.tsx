import React, { useState } from 'react';
import { Tabulation } from '../components/Tabulation';
import { CrossSign } from '../components/CrossSign';
import { HOME_PAGE } from '../routes';

const FormHistory: React.FC = () => {
  const [status, setStatus] = useState(true);
  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <CrossSign Link={HOME_PAGE.path} />
      {/*<form>*/}
      {/*  <Form*/}
      {/*</form>*/}
      <Tabulation flow_status={true} pageSize={10}></Tabulation>
    </>
  );
};

export { FormHistory };
