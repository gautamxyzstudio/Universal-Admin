import React from "react";

export type ITextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  title?: string | undefined;
  containerStylesClasses?: string | undefined;
  titleStylesClasses?: string | undefined;
  inputStylesClasses?: string | undefined;
  error?: string | undefined;
};

const Input: React.FC<ITextInputProps> = ({
  title,
  placeholder,
  value,
  containerStylesClasses,
  titleStylesClasses,
  inputStylesClasses,
  onChange,
  error,
  ...textInputProps
}) => {
  return (
    <div className={containerStylesClasses  }>
      {title && <p className={titleStylesClasses + `text-disabled text-[12px] leading-4`}>{title}</p>}
      <input
        value={value}
        className={` outline-none w-full text-disable bg-transparent ${inputStylesClasses}`}
        placeholder={placeholder}
        onChange={onChange}
        title="name"
        type="text"
        {...textInputProps}
      />
      {error && <p className="text-[#c11919] text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
