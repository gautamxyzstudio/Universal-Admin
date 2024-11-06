import React from 'react';
import Image from 'next/image';
import { Icons } from '../../../../../public/exporter';
import CustomInput from '../../../atoms/CustomInput/CustomInput';
import { IconButton, InputAdornment } from '@mui/material';
import { ISearchInputProps } from './SearchInput.types';

const SearchField: React.FC<ISearchInputProps> = ({
  value,
  onChangeText,
  searchStyle,
  onPressCross,
  isLoading,
}) => {
  return (
    <div className={searchStyle + ' flex items-center justify-center'}>
      <CustomInput
        className="w-full "
        value={value}
        onChange={onChangeText}
        placeholder="Search"
        size="small"
        sx={{
          '& .MuiInputBase-input': {
            width: '100%',
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton className="z-10" edge="start">
                  <Image src={Icons.search} alt="search" className="w-8 h-8" />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isLoading && (
                  <Image
                    src={Icons.animatedSpinner}
                    alt="search"
                    className="w-12 h-12"
                  />
                )}
                {!isLoading && value && (
                  <IconButton
                    onClick={onPressCross}
                    className="z-10"
                    edge="start"
                  >
                    <Image
                      src={Icons.crossForm}
                      alt="search"
                      className="w-6 h-6"
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default SearchField;
