import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import SVGComponent from '../SvgComponent/SVGComponent';
import { SVGS } from '@/constant/staticSvgs';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useUploadFileMutation } from '@/api/fetures/Auth/AuthApis';
import { IPhotoUploadProps } from './PhotoUpload.types';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { ICustomErrorResponse } from '@/api/types';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

const PhotoUpload: React.FC<IPhotoUploadProps> = ({ getUploadedImageId }) => {
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const { displaySnackbar } = useSnackBarContext();
  const [upload, { isLoading, error }] = useUploadFileMutation();
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    background: 'red',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const dImage = URL.createObjectURL(e.target.files[0]);
      setDisplayImage(dImage);
      const form = new FormData();
      form.append('files', e.target.files[0]);
      try {
        const uploadedImage = await upload(form).unwrap();
        getUploadedImageId(uploadedImage[0].id);
      } catch (e) {
        console.log(e, 'ERROR');
        let error = e as ICustomErrorResponse;
        displaySnackbar('error', error.message);
      }
    }
  };

  return (
    <>
      <Button
        role={undefined}
        variant="contained"
        component="label"
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}
        tabIndex={-1}
      >
        {!displayImage && !error && (
          <SVGComponent svg={SVGS.profilePictureSvg} />
        )}
        {isLoading && (
          <div className="w-14 h-14 absolute flex justify-center items-center border-[2px] object-contain border-disable rounded-full">
            <ActivityIndicator size={20} />
          </div>
        )}
        {displayImage && (
          <Image
            className="w-14 h-14  border-[2px] object-contain border-disable rounded-full"
            width={60}
            height={60}
            src={displayImage}
            alt="logo"
          />
        )}
        {error && (
          <div className="w-14 h-14 absolute bg-modal flex justify-center items-center border-[2px] object-contain border-red rounded-full">
            <h1 className="text-red font-bold text-[10px] ">error</h1>
          </div>
        )}
        {error && (
          <h1 className="absolute text-[10px] capitalize text-red  w-[500px] text-center -bottom-4">
            Image upload Failed. please try again
          </h1>
        )}

        <VisuallyHiddenInput
          type="file"
          onChange={onSelectFile}
          accept="image/*"
        />
      </Button>
    </>
  );
};

export default PhotoUpload;
