import React, { useEffect, useLayoutEffect, useState } from 'react';
import { action, observable } from 'mobx';
import { ActionType } from '../../utils/action-type';
import { FormTextField } from '../FormTextField';
import { Form } from 'react-final-form';
import { CircularProgress, Typography } from '@material-ui/core';
import { OnChange } from 'react-final-form-listeners';
import { FormButton } from '../FormButton';
import 'twin.macro';
import { observer } from 'mobx-react-lite';
import Box from '@material-ui/core/Box';
import { IconType } from 'react-icons';
import { MdClose, MdDone } from 'react-icons/all';
import { theme } from 'twin.macro';
import * as Yup from 'yup';
import { makeValidate } from 'mui-rff';

// 重置需要的信息
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

type Step = { handleBack: () => void; handleNext: () => void };

const infoStore = observable<InfoStore>(
  {
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
  },
  {
    data: observable.deep,
    setAccount: action,
    setEmail: action,
  },
);

// 常量，方便写
const ACCOUNT = 'account';
const EMAIL = 'email';

// 提示组件
// emmm，暂时先这么写
const Note: React.FC = ({ children }) => (
  <Typography variant={'h6'} tw={'i-color mb-12'}>
    {children}
  </Typography>
);

const NextBtn: React.FC = () => (
  <FormButton type={'submit'} size={'small'} tw={'self-center'}>
    下一步
  </FormButton>
);

// 结果组件
// TODO: 需要重新提取、优化
const Result: React.FC<{ Status: typeof CircularProgress | IconType }> = ({
  Status,
  children,
}) => {
  return (
    <Box tw={'flex flex-col items-center'}>
      <Status tw={'mt-8 mb-12'} />
      {children}
    </Box>
  );
};

// 载入状态
const LoadingStatus: typeof CircularProgress = (props) => (
  <CircularProgress tw={'color[#acb6e5]'} {...props} />
);

// 成功状态
const DoneStatus: IconType = (props) => (
  <MdDone size={'2rem'} color={theme('colors.green.400')} {...props} />
);

// 失败状态
const FailStatus: IconType = (props) => (
  <MdClose size={'2rem'} color={theme('colors.red.400')} {...props} />
);

// 账号验证器
const accountSchema = {
  [ACCOUNT]: Yup.string().required('你怎么可以不填账号呢？！'),
};

const accountValidate = makeValidate(Yup.object().shape(accountSchema));

// 输入账号步骤
const StepAccount = observer<Step>(({ handleNext }) => {
  return (
    <Form
      onSubmit={() => handleNext()}
      initialValues={infoStore.data}
      validate={accountValidate}
    >
      {({ handleSubmit }) => (
        <form tw={'flex flex-col'} onSubmit={handleSubmit}>
          <Note>
            在重置密码前，
            <br />
            让我们确认您的身份。
          </Note>
          <Typography variant={'h6'} tw={'text-gray-400'}>
            请先输入您的帐号：
          </Typography>

          <FormTextField
            label={'学号'}
            required={true}
            name={ACCOUNT}
            autoComplete={'username'}
            tw={'mb-12'}
          />

          <NextBtn />
          {/* 目前只能这样监听 account 的修改 */}
          <OnChange name={ACCOUNT}>
            {(values) => infoStore.setAccount(() => values)}
          </OnChange>
        </form>
      )}
    </Form>
  );
});

// 邮箱验证器
const emailSchema = {
  [EMAIL]: Yup.string().required('你怎么可以不填邮箱呢？！'),
};

const emailValidate = makeValidate(Yup.object().shape(emailSchema));

// 输入邮箱步骤
const StepEmail = observer<Step>(({ handleBack, handleNext }) => {
  // FIXME: 未填写账号时禁止填写密码，返回上一个步骤
  // 感觉实现的有问题……不应该在这里实现这个的
  // 不过没办法，暂时就这样吧
  useLayoutEffect(() => {
    if (infoStore.data.account === '') {
      handleBack();
    }
  }, [handleBack]);

  return (
    <Form
      onSubmit={() => handleNext()}
      initialValues={infoStore.data}
      validate={emailValidate}
    >
      {({ handleSubmit }) => (
        <form tw={'flex flex-col'} onSubmit={handleSubmit}>
          <Note>
            我们将向您预留的
            <br />
            邮箱发送重置后的密码
          </Note>
          <Typography variant={'h6'} tw={'text-gray-400'}>
            请继续输入您的邮箱：
          </Typography>

          <FormTextField
            label={'邮箱'}
            required={true}
            name={EMAIL}
            autoComplete={EMAIL}
            type={EMAIL}
            tw={'mb-12'}
          />

          <NextBtn />
          {/* 目前只能这样监听 email 的修改 */}
          <OnChange name={EMAIL}>{(values) => infoStore.setEmail(() => values)}</OnChange>
        </form>
      )}
    </Form>
  );
});

const StepResult = observer<Step>(({ handleBack }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  // FIXME: 同上，在这里实现总觉得不太好
  useLayoutEffect(() => {
    if (infoStore.data.email === '') {
      handleBack();
    }
  }, [handleBack]);

  // TODO: 实现状态接口
  /*
    请求成功：setValid(true)
    请求失败：setValid(false)，并设置错误信息
    同时设置 loading 为 false
   */
  useEffect(() => {
    console.log('done');
  }, []);

  return (
    <>
      {loading ? (
        <Result Status={LoadingStatus}>
          <Typography variant={'h6'} tw={'text-gray-400 text-center'}>
            <Box>请耐心等候</Box>
            <Box>正在核验您的身份</Box>
          </Typography>
        </Result>
      ) : valid ? (
        <Result Status={DoneStatus}>
          <Typography variant={'h6'} tw={'text-gray-400 text-center'}>
            <Box>已将邮件发送至您的邮箱</Box>
            <Box>请注意查收</Box>
          </Typography>
        </Result>
      ) : (
        <Result Status={FailStatus}>
          <Typography variant={'h6'} tw={'text-gray-400 text-center'}>
            <Box>身份验证失败</Box>
            <Box>请检查信息是否填写正确</Box>
          </Typography>
        </Result>
      )}
    </>
  );
});

const StepBox = [StepAccount, StepEmail, StepResult];

export { StepBox };
