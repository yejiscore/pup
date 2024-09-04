// src/components/SignUp/SignupForm.tsx
import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BaseBox from '../../styles/common/BaseBox';
import uncheckedBox from '../../assets/login/uncheckbox.png';
import checkedBox from '../../assets/login/checkedbox.png';
import errorBox from '../../assets/login/errcheckbox.png';
import rightIcon from '../../assets/Right.png';
import Terms from './Terms/Terms';
import useMutate from '../../hooks/useMutate';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const FormItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const InputFormWrapper = styled.div`
  text-align: center;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-left: 20px;
  font-size: 14px;
  color: #283330;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: calc(100% - 60px);
  height: 40px;
  border-radius: 100px;
  background-color: white;
  padding-left: 20px;
  border: 2px solid;
  outline: none;
  border-color: ${(props) => (props.hasError ? 'red' : 'white')};
  margin: 10px auto;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? 'red' : '#283330')};
  }
`;

const ErrorMessage = styled.span<{ visible: boolean }>`
  color: #ff603e;
  font-size: 12px;
  margin-left: 34px;
  height: 16px;
  display: block;
  margin-top: 5px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

const CheckboxContainer = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 18px;
  padding: 10px;
`;

const WhiteBox = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CheckboxBox = styled.div<{ checked: boolean; hasError: boolean }>`
  width: 25px;
  height: 25px;
  background-size: cover;
  margin-right: 10px;
  background-image: ${(props) =>
    props.checked
      ? `url(${checkedBox})`
      : props.hasError
        ? `url(${errorBox})`
        : `url(${uncheckedBox})`};
  cursor: pointer;
`;

const CheckboxText = styled.span`
  flex: 1;
  font-size: 14px;
  color: #283330;
`;

const RightIcon = styled.img`
  width: 11.88px;
  height: 11.88px;
  cursor: pointer;
`;

const NextButton = styled.button`
  width: 336px;
  height: 63px;
  border-radius: 100px;
  background-color: #00ae80;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
`;

const SignupForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [termsType, setTermsType] = useState<
    'service' | 'personalinfor' | 'locationinfor'
  >('service');
  const [checked, setChecked] = useState({
    all: false,
    service: false,
    personalinfor: false,
    locationinfor: false,
  });
  const [errorState, setErrorState] = useState({
    service: false,
    personalinfor: false,
    locationinfor: false,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();

  const { mutate: joinUser } = useMutate('joinUser', '/auth', 'post');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      if (checked.service && checked.personalinfor && checked.locationinfor) {
        joinUser(
          { email: data.email, password: data.password },
          {
            onSuccess: () => {
              navigate('/login');
            },
            onError: (error) => {
              alert('회원가입에 실패했습니다.');
              // console.log('error', error);
            },
          }
        );
        // navigate('/signup_member');
      } else {
        setErrorState({
          service: !checked.service,
          personalinfor: !checked.personalinfor,
          locationinfor: !checked.locationinfor,
        });
      }
    }
  };

  const handleCheckboxChange = (name: keyof typeof checked) => {
    setChecked((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      newState.all =
        newState.service && newState.personalinfor && newState.locationinfor;
      return newState;
    });
  };

  const handleAllCheckboxChange = () => {
    setChecked((prev) => {
      const newState = !prev.all;
      return {
        all: newState,
        service: newState,
        personalinfor: newState,
        locationinfor: newState,
      };
    });
  };

  const handleOpenTerms = (
    type: 'service' | 'personalinfor' | 'locationinfor'
  ) => {
    setTermsType(type);
    setIsOpen(true);
  };

  const handleCloseTerms = (agree: boolean) => {
    setChecked((prev) => {
      const newChecked = { ...prev };
      if (agree) {
        newChecked[termsType] = true;
      } else {
        newChecked[termsType] = false;
      }
      newChecked.all =
        newChecked.service &&
        newChecked.personalinfor &&
        newChecked.locationinfor;
      return newChecked;
    });
    setIsOpen(false);
  };

  return (
    <BaseBox>
      {isOpen && <Terms onClose={handleCloseTerms} type={termsType} />}
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormItemWrapper>
            <Label htmlFor="email">이메일</Label>
            <InputFormWrapper>
              <Input
                id="email"
                type="email"
                placeholder="example@pup.com"
                hasError={!!errors.email}
                {...register('email', { required: true })}
              />
            </InputFormWrapper>
            <ErrorMessage visible={!!errors.email}>
              이메일을 다시 확인해주세요.
            </ErrorMessage>
          </FormItemWrapper>

          <FormItemWrapper>
            <Label htmlFor="password">비밀번호</Label>
            <InputFormWrapper>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                hasError={!!errors.password}
                {...register('password', { required: true })}
              />
            </InputFormWrapper>
            <ErrorMessage visible={!!errors.password}>
              비밀번호를 다시 확인해주세요.
            </ErrorMessage>
          </FormItemWrapper>

          <FormItemWrapper>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <InputFormWrapper>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                hasError={!!errors.confirmPassword}
                {...register('confirmPassword', { required: true })}
              />
            </InputFormWrapper>
            <ErrorMessage visible={!!errors.confirmPassword}>
              비밀번호가 일치하지 않습니다.
            </ErrorMessage>
          </FormItemWrapper>

          <CheckboxContainer>
            <CheckboxWrapper>
              <HiddenCheckbox
                type="checkbox"
                id="all"
                checked={checked.all}
                onChange={handleAllCheckboxChange}
              />
              <CheckboxLabel htmlFor="all" hasError={false}>
                <CheckboxBox
                  checked={checked.all}
                  hasError={false}
                  onClick={() => handleCheckboxChange('all')}
                />
                <CheckboxText>약관 전체 동의</CheckboxText>
              </CheckboxLabel>
            </CheckboxWrapper>
            <WhiteBox>
              <CheckboxWrapper>
                <CheckboxLabel htmlFor="service" hasError={errorState.service}>
                  <CheckboxBox
                    checked={checked.service}
                    hasError={errorState.service}
                    onClick={() => handleCheckboxChange('service')}
                  />
                  <CheckboxText>서비스 이용 약관 동의(필수)</CheckboxText>
                  <RightIcon
                    src={rightIcon}
                    onClick={() => handleOpenTerms('service')}
                  />
                </CheckboxLabel>
              </CheckboxWrapper>

              <CheckboxWrapper>
                <CheckboxLabel
                  htmlFor="personalinfor"
                  hasError={errorState.personalinfor}
                >
                  <CheckboxBox
                    checked={checked.personalinfor}
                    hasError={errorState.personalinfor}
                    onClick={() => handleCheckboxChange('personalinfor')}
                  />
                  <CheckboxText>개인 정보 수집 및 이용 동의(필수)</CheckboxText>
                  <RightIcon
                    src={rightIcon}
                    onClick={() => handleOpenTerms('personalinfor')}
                  />
                </CheckboxLabel>
              </CheckboxWrapper>

              <CheckboxWrapper>
                <CheckboxLabel
                  htmlFor="locationinfor"
                  hasError={errorState.locationinfor}
                >
                  <CheckboxBox
                    checked={checked.locationinfor}
                    hasError={errorState.locationinfor}
                    onClick={() => handleCheckboxChange('locationinfor')}
                  />
                  <CheckboxText>위치 정보 수집 및 이용 동의(필수)</CheckboxText>
                  <RightIcon
                    src={rightIcon}
                    onClick={() => handleOpenTerms('locationinfor')}
                  />
                </CheckboxLabel>
              </CheckboxWrapper>
            </WhiteBox>
          </CheckboxContainer>

          <NextButton type="submit">등록완료</NextButton>
        </Form>
      </Container>
    </BaseBox>
  );
};

export default SignupForm;
