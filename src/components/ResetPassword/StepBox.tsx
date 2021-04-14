import React from 'react';
import { observable } from 'mobx';
import { ActionType } from '../../utils/action-type';
import { FormTextField } from '../FormTextField';
import { Form } from 'react-final-form';
import { Typography } from '@material-ui/core';
import { OnChange } from 'react-final-form-listeners';

interface InfoData {
  account: string;
  email: string;
}

// 重置密码
export interface InfoStore {
  // observable
  data: InfoData;
  // action
  setAccount: ActionType<string>;
  setEmail: ActionType<string>;
}

const infoStore = observable<InfoStore>({
  data: {
    account: '',
    email: '',
  },
  setAccount(fn) {
    this.data.account = fn(this.data.account);
  },
  setEmail(fn) {
    this.data.email = fn(this.data.email);
  },
});

const StepAccount: React.FC = () => {
  const onSubmit = (data: Omit<InfoData, 'email'>) =>
    infoStore.setAccount(() => data.account);
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values }) => (
        <form tw={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
          <Typography variant={'h6'}> </Typography>
          <FormTextField
            label={'学号'}
            required={true}
            name={'account'}
            autoComplete={'username'}
          />
          <OnChange name={'account'}>{(values) => infoStore.setAccount(values)}</OnChange>
        </form>
      )}
    </Form>
  );
};

const StepBox = [StepAccount];

export { StepBox };
