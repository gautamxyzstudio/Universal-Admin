'use client';
import { useLoginMutation } from '@/api/fetures/Auth/AuthApis';
import CustomInput from '@/components/atoms/CustomInput/CustomInput';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { withAsyncErrorHandlingPost } from '@/utility/utils';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';

const LoginForm = () => {
  const [inputDetails, setInputDetails] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { displaySnackbar } = useSnackBarContext();
  const [login, { isLoading }] = useLoginMutation();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeField = (value: string, key: 'email' | 'password') => {
    setInputDetails((prev) => ({ ...prev, [key]: value }));
  };

  const loginHandler = withAsyncErrorHandlingPost(async () => {
    const response = await login({
      identifier: inputDetails.email,
      password: inputDetails.password,
    }).unwrap();
    if (response) {
      console.log(response);
      displaySnackbar('success', 'Login successful');
    }
  }, displaySnackbar);

  return (
    <div className="w-[532px]">
      <h1 className="text-heading-40 text-white">{STRINGS.login}</h1>
      <div className="h-9" />
      <h1 className="text-subHeading-24 text-white">
        {STRINGS.pleaseEnterYour}
      </h1>
      <div className="h-9" />
      <CustomInput
        label={STRINGS.email}
        value={inputDetails.email}
        onChange={(e) => onChangeField(e.target.value, 'email')}
        type="email"
      />
      <div className="h-9" />
      <CustomInput
        label={STRINGS.password}
        value={inputDetails.password}
        onChange={(e) => onChangeField(e.target.value, 'password')}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className="z-10"
                onClick={handleClickShowPassword}
                edge="start"
              >
                {showPassword ? (
                  <VisibilityOutlined color="secondary" />
                ) : (
                  <VisibilityOffOutlined color="secondary" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="h-14" />
      <CustomButton
        title={STRINGS.login}
        isLoading={isLoading}
        variant="contained"
        onClick={loginHandler}
        fullWidth
        buttonType={'primary'}
      />
    </div>
  );
};

export default LoginForm;
