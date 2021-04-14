import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import tw, { theme } from 'twin.macro';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import MobileStepper from '@material-ui/core/MobileStepper';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { css } from '@emotion/react';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons/lib';
import { ActionType } from '../utils/action-type';
import { StepBox } from '../components/ResetPassword/StepBox';
import { Paper } from '@material-ui/core';
import Div100vh from 'react-div-100vh';

// 步骤数据存储
export interface StepStore {
  // observable
  step: number;
  // action
  setStep: ActionType<number>;
  // computed
  backDisable: boolean;
  nextDisable: boolean;
}

// 步骤按钮属性
interface StepIconBtnProps extends IconButtonProps {
  Icon: IconType;
  iconProps?: IconBaseProps;
}

// 总步数
const STEPS = 3;
// 倒数第二步（从右数第二步)
const STEP_R_2 = STEPS - 1;

const stepStore = observable<StepStore>(
  {
    step: 0,
    setStep(setFn: (prevStep: number) => number) {
      this.step = setFn(this.step);
    },
    get backDisable() {
      return this.step === 0;
    },
    get nextDisable() {
      return this.step === STEP_R_2;
    },
  },
  {
    step: observable,
    setStep: action,
    backDisable: computed,
    nextDisable: computed,
  },
);

// 步骤条的按钮
const StepIconBtn = observer<StepIconBtnProps>(
  ({ Icon, iconProps, disabled, ...props }) => {
    return (
      <IconButton
        disabled={disabled}
        tw={
          'bg-white p-2 top-1/4 shadow-lg hocus:(bg-white) disabled:(bg-gray-50 shadow-none)'
        }
        {...props}
      >
        <Icon
          size={'2rem'}
          color={disabled ? theme('colors.gray.200') : theme('mainColor')}
          {...iconProps}
        />
      </IconButton>
    );
  },
);

const ResetPassword = observer(() => {
  // 上一步
  const handleBack = () => stepStore.setStep((prev) => prev - 1);
  // 下一步
  const handleNext = () => stepStore.setStep((prev) => prev + 1);

  const Step = StepBox[stepStore.step];

  return (
    <Paper elevation={0} component={Div100vh} tw={'py-20 px-10'}>
      <Step />
      <MobileStepper
        steps={STEPS}
        activeStep={stepStore.step}
        tw={'p-8'}
        css={css`
          .MuiMobileStepper-dotActive {
            ${tw`i-bg`}
          }
        `}
        backButton={
          <StepIconBtn
            onClick={handleBack}
            disabled={stepStore.backDisable}
            Icon={MdNavigateBefore}
          />
        }
        nextButton={
          <StepIconBtn
            onClick={handleNext}
            disabled={stepStore.nextDisable}
            Icon={MdNavigateNext}
          />
        }
      />
    </Paper>
  );
});

export { ResetPassword };
