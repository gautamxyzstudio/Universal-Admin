"use client";
import CustomInput from "@/components/atoms/CustomInput/CustomInput";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";

const LoginForm = () => {
  const [inputDetails, setInputDetails] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    alert('eh')
    setShowPassword(!showPassword);
  };
  
  console.log(showPassword);

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
        onChange={(e) =>
          setInputDetails((prev) => ({ ...prev, email: e.target.value }))
        }
        type="email"
      />
      <div className="h-9" />
      <CustomInput
        label={STRINGS.password}
        value={inputDetails.password}
        onChange={(e) =>{
          setInputDetails((prev) => ({ ...prev, password: e.target.value }))
          }
        }
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className="z-10"
                onClick={handleClickShowPassword}
                edge='start'
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
        onClick={() => console.log("Hello Admin")}
        fullWidth
      />
    </div>
  );
};

export default LoginForm;
