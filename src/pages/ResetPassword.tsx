import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import tw, { theme } from 'twin.macro';

export interface ResetPasswordInfo {
  // 学号
  account: string;
  // 邮箱
  email: string;
}

// 总步数
const STEPS = 3;
// 倒数第二步（从右数第二步)
const STEP_R_2 = STEPS - 1;

const StepBtn = tw(IconButton)`fixed p-1 top-1/4 shadow-lg`;

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(0);

  // 上一步
  const handleBack = () => setStep((prev) => prev - 1);
  // 下一步
  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <MobileStepper
      steps={STEPS}
      activeStep={step}
      tw={'justify-center p-8'}
      backButton={
        <StepBtn tw={'left-1'} onClick={handleBack} disabled={step === 0}>
          <MdNavigateBefore size={'3rem'} color={theme('mainColor')} />
        </StepBtn>
      }
      nextButton={
        <StepBtn tw={'right-1'} onClick={handleNext} disabled={step === STEP_R_2}>
          <MdNavigateNext size={'3rem'} color={theme('mainColor')} />
        </StepBtn>
      }
    />
  );
};

export { ResetPassword };
