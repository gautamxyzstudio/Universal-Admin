import React from "react";

type ICustomButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  buttonStyles?: string;
  buttonType?: "outlined" | "orange";
  type?: "button" | "submit" | "reset";
};
const CustomButton: React.FC<ICustomButtonProps> = ({
  onClick,
  title,
  buttonType = "orange",
  buttonStyles,
  type = "button",
}) => {
  const buttonOutlineStyles = getButtonStylesFromType(buttonType);

  return (
    <button
      className={`${buttonStyles} w-[auto] h-11 text-[16px] leading-5 px-3 py-[10px] rounded-lg  ${buttonOutlineStyles}`}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default CustomButton;

const getButtonStylesFromType = (buttonType: "outlined" | "orange") => {
  switch (buttonType) {
    case "outlined":
      return "bg-[transparent] border border-primary text-primary";
    case "orange":
      return "bg-primary text-white";
    default:
      return "bg-[transparent] border border-primary text-primary";
  }
};
