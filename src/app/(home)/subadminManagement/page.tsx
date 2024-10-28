/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import DataTable from '@/components/atoms/DataTable/DataTable';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddSubAdminForm from '@/components/templates/AddSubAdminForm/AddSubAdminForm';
import {
  addNewSubAdminData,
  ApiKeys,
} from '@/components/templates/AddSubAdminForm/AddSubAdminForm.types';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import { Icons, Images } from '../../../../public/exporter';
import { useGetSubAdminsQuery } from '@/api/fetures/SubAdmin/SubAdminApi';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import Image from 'next/image';
import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import { ISubAdmin } from '@/api/fetures/SubAdmin/SubAdminApi.types';
import { IFieldTypes } from '@/constant/enums';
import { useSubAdminContext } from '@/contexts/SubAdminContext/SubAdminContext';

const SubAdminManagement = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [subAdmins, updateSubAdmins] = useState<ISubAdmin[]>([]);
  const [form, setFormData] = useState<IDynamicFormField[]>(addNewSubAdminData);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<ISubAdmin | null>(
    null
  );
  const {
    error,
    isLoading,
    data: subAdminApiResult,
  } = useGetSubAdminsQuery(null);
  const { setSubAdmins, data } = useSubAdminContext();

  useEffect(() => {
    if (subAdminApiResult?.data) {
      setSubAdmins(subAdminApiResult?.data);
    }
  }, [subAdminApiResult]);

  useEffect(() => {
    updateSubAdmins(data);
  }, [data]);

  const onPressPrimaryButton = () => {
    setFormData(addNewSubAdminData);
    setSelectedSubAdmin(null);
    setTimeout(() => {
      setShowFormModal(true);
    }, 100);
  };

  const subAdminDataColumn: GridColDef[] = [
    {
      field: 'UserNameFL',
      headerName: 'Name',
      width: 280,
      renderCell: (params: GridRenderCellParams) => (
        <UserNameWithImage
          image={null}
          name={params?.row?.UserNameFL}
          type={'green'}
        />
      ),
    },

    {
      field: 'email',
      headerName: 'E-Mail',
      width: 287,
    },
    {
      field: 'phoneNumber',
      headerName: 'Contact Number',
      width: 270,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const color =
          params.row.UserStatus === true ? 'text-green' : 'text-red';
        return (
          <div className="h-full w-full flex flex-col justify-center items-start">
            <p className={color + '  text-sm'}>
              {params.row.UserStatus ? STRINGS.active : STRINGS.inActive}
            </p>
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <div className="h-full w-full flex flex-col justify-center items-start">
          <Image
            className="cursor-pointer"
            onClick={() => onPressEdit(params.row)}
            src={Icons.pencil}
            alt={'pencil'}
          />
        </div>
      ),
    },
  ];

  const onPressEdit = (user: ISubAdmin) => {
    setSelectedSubAdmin(user);
    const data: IDynamicFormField[] = [
      {
        id: 1,
        displayName: STRINGS.name,
        apiKey: ApiKeys.NAME,
        value: user.UserNameFL,
        type: IFieldTypes.SIMPLE,
      },
      {
        id: 3,
        displayName: STRINGS.contactNumber,
        apiKey: ApiKeys.phoneNumber,
        type: IFieldTypes.MOBILE,
        value: user.phoneNumber,
      },
      {
        id: 5,
        displayName: STRINGS.status,
        apiKey: 'status',
        type: IFieldTypes.STATUS,
        value: user.UserStatus === true ? 'true' : 'false',
      },
    ];
    setFormData(data);
    setTimeout(() => {
      setShowFormModal(true);
    }, 100);
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
      withPrimaryButton
        primaryButtonTitle={STRINGS.addSubAdmin}
        title={STRINGS.subAdminManagement}
        withPrimaryButton
        onPressButton={onPressPrimaryButton}
      />
      <DataTable
        isLoading={isLoading}
        columns={subAdminDataColumn}
        rows={subAdmins}
        emptyViewTitle={STRINGS.noSubAdmin}
        emptyViewSubTitle={STRINGS.noSubAdminDec}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={true}
      />
      <AddSubAdminForm
        setGlobalModalState={(state) => setShowFormModal(state)}
        data={form}
        show={showFormModal}
        subAdmin={selectedSubAdmin}
      />
    </div>
  );
};

export default SubAdminManagement;
