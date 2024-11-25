'use client';
import React, { createContext, useState } from 'react';

import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentExpandViewContext } from './DocumentExpandedViewContext.types';
import DocumentExpandView from '@/components/organism/DocumentExpandView/DocumentExpandView';
const DocumentExpandViewContext =
  createContext<IDocumentExpandViewContext | null>(null);

const DocumentExpandedViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [document, setDocument] = useState<IEmployeeDocument | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showDocModal = (doc: IEmployeeDocument) => {
    setDocument(doc);
    setIsVisible(true);
  };

  const documentExpandViewContext: IDocumentExpandViewContext = {
    showDocModal,
  };

  const onPressCrossHandler = (
    event?: object,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason && reason === 'backdropClick') {
      return;
    } else {
      setDocument(null);
      setIsVisible(false);
    }
  };

  return (
    <DocumentExpandViewContext.Provider value={documentExpandViewContext}>
      {children}
      <DocumentExpandView
        isVisible={isVisible}
        document={document}
        onPressClose={onPressCrossHandler}
      />
    </DocumentExpandViewContext.Provider>
  );
};

export const useDocumentExpandViewContext = () => {
  const context = React.useContext(DocumentExpandViewContext);
  if (!context) {
    throw new Error(
      'DocumentExpandViewContext must be used within a DocumentExpandViewContextProvider'
    );
  }
  return context;
};

export default DocumentExpandedViewContextProvider;
