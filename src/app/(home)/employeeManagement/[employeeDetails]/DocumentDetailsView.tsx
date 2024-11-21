import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import CustomList from '@/components/atoms/CustomList/CustomList';
import VirtualList from '@/components/molecules/VirtualList/VirtualList';
import UploadedFile from '@/components/organism/UploadedFile/UploadedFile';
import React, { useCallback } from 'react';
import { Virtual } from 'swiper/modules';

export type IDocumentDetailsViewType = {
  onPressApprove: () => void;
  onPressReject: () => void;
  data: IEmployeeDocument[];
};

const DocumentDetailsView: React.FC<IDocumentDetailsViewType> = ({
  onPressApprove,
  onPressReject,
  data,
}) => {
  const renderItem = useCallback(
    (_, item) => (
      <UploadedFile fileName={item.docName} fileSrc={item.doc?.url ?? ''} />
    ),
    []
  );
  return <VirtualList data={data} renderItem={renderItem} isLoading={false} />;
};

export default DocumentDetailsView;
