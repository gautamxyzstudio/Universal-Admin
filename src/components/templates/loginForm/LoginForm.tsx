/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useLoginMutation } from '@/api/fetures/Auth/AuthApis';
import CustomInput from '@/components/atoms/CustomInput/CustomInput';
import CustomButton from '@/components/atoms/CustomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { IUserCookies, saveUserDetailsInCookies } from '@/utility/cookies';
import { withAsyncErrorHandlingPost } from '@/utility/utils';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import PasswordInput from '@/components/molecules/InputTypes/PasswordInput/PasswordInput';
const LoginForm = () => {
    const [inputDetails, setInputDetails] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { displaySnackbar } = useSnackBarContext();
    const [login, { isLoading }] = useLoginMutation();
    const { changeLoaderState } = useShowLoaderContext();
    const router = useRouter();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        changeLoaderState(isLoading);
    }, [isLoading]);

    const onChangeField = (value: string, key: 'email' | 'password') => {
        setInputDetails((prev) => ({ ...prev, [key]: value }));
    };

    const loginHandler = withAsyncErrorHandlingPost(async () => {
        const response = await login({
            identifier: inputDetails.email,
            password: inputDetails.password
        }).unwrap();
        if (response) {
            const user: IUserCookies = {
                token: response.jwt,
                userDetails: { ...response.user }
            };
            saveUserDetailsInCookies(user);
            router.push(routeNames.Dashboard);
            displaySnackbar('success', 'Login successful');
        }
    }, displaySnackbar);

    return (
        <div className="w-[604px] bg-loginBgcolor p-9 shadow-loginForm">
            <h1 className="text-heading-40 text-white">{STRINGS.login}</h1>
            <div className="h-9" />
            <h1 className="text-subHeading-24 text-white">{STRINGS.pleaseEnterYour}</h1>
            <div className="h-9" />
            <CustomInput
                label={STRINGS.email}
                value={inputDetails.email}
                onChange={(e) => onChangeField(e.target.value, 'email')}
                type="email"
                fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'white'
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                        color: 'white'
                    }
                }}
                slotProps={undefined}
            />
            <div className="h-9" />
            <PasswordInput
                value={inputDetails.password}
                onChange={(e) => onChangeField(e.target.value, 'password')}
                fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'white'
                    },
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                        color: 'white'
                    }
                }}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
            />
            <div className="h-14" />
            <CustomButton
                title={STRINGS.login}
                variant="contained"
                onClick={loginHandler}
                fullWidth
                buttonType={'primary'}
            />
        </div>
    );
};

export default LoginForm;
