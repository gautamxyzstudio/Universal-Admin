import React from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Image from 'next/image';
import { IDocumentExpandView } from './DocumentExpandView.types';
import { base64Icon } from '../../../../public/exporter';

const DocumentExpandView: React.FC<IDocumentExpandView> = ({
  isVisible,
  onPressClose,
  document,
}) => {
  return (
    <Dialog
      sx={{
        width: '100%',
        height: '100%',
      }}
      onClose={onPressClose}
      open={isVisible}
    >
      <div className="flex bg-white  z-10 flex-row justify-between">
        <DialogTitle
          sx={{
            padding: '16px 12px',
          }}
        >
          {document?.docName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onPressClose}
          sx={(theme) => ({
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
      </div>
      <div className="w-[620px] h-[620px]">
        {document?.doc?.url && (
          <DialogContent sx={{ padding: '12px' }}>
            <Image
              fill
              placeholder="empty"
              blurDataURL={base64Icon.spinner}
              src={document?.doc?.url}
              className="w-full h-full object-contain rounded-lg cursor-zoom-in"
              alt={document?.docName}
            />
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
};

export default DocumentExpandView;
