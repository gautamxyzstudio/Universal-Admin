'use client';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import ContactCard from '@/components/organism/ContactDetailCard/ContactDetailCard';
import CustomTab from '@/components/atoms/CustomTab/CustomTab';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import {
  useLazyGetEmployeeByIdQuery,
  useUpdateDocumentStatusMutation,
} from '@/api/fetures/Employee/EmployeeApi';
import {
  IEmployeeAdvance,
  IEmployeeDocument,
} from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import DocumentDetailsView from './RightViews/DocumentDetailsView';
import BankDetailsView from './RightViews/BankDetailsView';
import ProfileHistoryView from './RightViews/ProfileHistoryView';
import DocumentList from './LeftTabViewss/DocumentList';
import { SxProps, Theme } from '@mui/material';
import TabButton from '@/components/molecules/ButtonTypes/TabButton/TabButton';
import { withAsyncErrorHandlingPost } from '@/utility/utils';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import { useSnackBarContext } from '@/providers/SnackbarProvider';

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  const [getEmployeeById, { isFetching }] = useLazyGetEmployeeByIdQuery();
  const [employee, setEmployee] = useState<IEmployeeAdvance | null>(null);
  const [selectedTabIndex, setSelectedTabItemIndex] = useState(0);
  const [updateDocStatus, { isLoading }] = useUpdateDocumentStatusMutation();
  const { displaySnackbar } = useSnackBarContext();
  const [employeeDocs, setEmployeeDocs] = useState<IEmployeeDocument[] | []>(
    []
  );
  const [employeeTabs, setEmployeeTabs] = useState<{
    primaryDocuments: IEmployeeDocument[] | null;
    otherDocuments: IEmployeeDocument[] | null;
  }>({
    primaryDocuments: null,
    otherDocuments: null,
  });

  const { changeLoaderState } = useShowLoaderContext();

  useEffect(() => {
    changeLoaderState(isLoading);
  }, [isLoading]);

  const updateDocStatusHandler = withAsyncErrorHandlingPost(
    async (
      status: IDocumentStatus,
      key: IEmployeeApiKeyStatus,
      isCheque?: boolean
    ) => {
      const response = await updateDocStatus({
        docId: parseInt(params.employeeDetails),
        key: key,
        docStatus: status,
      }).unwrap();
      if (response) {
        if (isCheque) {
          setEmployee((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              bankingDetails: {
                ...prev.bankingDetails,
                chique: {
                  ...prev.bankingDetails.chique,
                  docStatus: status,
                },
              },
            };
          });
        } else {
          setEmployee((prev) => {
            if (!prev) return null;
            let prevEmpDetails = { ...prev };
            const prevEmpDocs = [...prev.documents];
            const index = prevEmpDocs.findIndex(
              (doc) => doc.docStatusKey === key
            );
            prevEmpDocs[index] = {
              ...prevEmpDocs[index],
              docStatus: status,
            };
            prevEmpDetails = { ...prevEmpDetails, documents: prevEmpDocs };
            return prevEmpDetails;
          });
        }
        displaySnackbar('success', 'Document status updated successfully');
      }
    },
    displaySnackbar
  );

  useEffect(() => {
    if (params.employeeDetails) {
      getEmployeeHandler(params.employeeDetails);
    }
  }, [params.employeeDetails]);

  const getEmployeeHandler = async (empId: string) => {
    try {
      const response = await getEmployeeById({ id: parseInt(empId) }).unwrap();
      if (response) {
        setEmployee(response);
      } else {
        console.log('Employee data not available');
      }
    } catch (err) {
      console.log('Error in fetching employee details', err);
    }
  };

  useEffect(() => {
    if (employee)
      if (employee.documents.length > 0) setEmployeeDocs(employee.documents);
    setEmployeeTabs({
      primaryDocuments: employee?.documents ?? [],
      otherDocuments: employee?.otherDocuments ?? [],
    });
  }, [employee]);

  const tabsData = [
    {
      label: 'Document',
      onClickAction: () => {
        setSelectedTabItemIndex(0);
        setEmployeeDocs(employee?.documents ?? []);
      },
    },
    {
      label: 'Bank',
      onClickAction: () => setSelectedTabItemIndex(1),
    },
    {
      label: 'Profile',
      onClickAction: () => setSelectedTabItemIndex(2),
    },
    {
      label: 'Work history',
      onClickAction: () => setSelectedTabItemIndex(3),
    },
  ];

  const onChangeDocTabHandler = (doc: IEmployeeDocument) => {
    if (employee?.documents) {
      const employeeDocs = [...employee?.documents];
      const item = employeeDocs.find(
        (document) => document.docId === doc.docId
      );
      if (item) {
        setEmployeeDocs([item]);
      } else {
        setEmployeeDocs(employee.documents);
      }
    }
  };

  return (
    <div className="w-full h-[90%]">
      {employee?.name && (
        <PageSubHeader
          pageTitle={STRINGS.employeeManagement}
          name={employee?.name}
        />
      )}
      <div className="flex gap-x-10 w-full h-full mt-2">
        {/* Left Side */}
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          <UserNameWithImage
            isLoading={isFetching}
            name={employee?.name ?? ''}
            image={employee?.selfie?.url ?? ''}
            imageStyle="!w-14 !h-14"
            joinDate="30 may, 2024"
          />
          <div className="flex justify-around border border-borderGrey rounded-lg p-3 text-[16px] leading-[20px] mt-6 w-full">
            <TextGroup
              isLoading={isFetching}
              textgroupStyle="flex flex-col gap-y-1"
              title="Date of Birth"
              text="04/08/2000"
            />
            <TextGroup
              isLoading={isFetching}
              textgroupStyle="flex flex-col gap-y-1"
              title="Gender"
              text={employee?.gender ?? ''}
            />
          </div>
          <ContactCard
            isLoading={isFetching}
            email={employee?.email ?? ''}
            phoneNumber={employee?.phone ?? ''}
            address={employee?.address ?? ''}
          />
          <CustomTab
            tabs={tabsData}
            TabIndicatorProps={{
              style: {
                height: '3px',
                borderTopRightRadius: '3px',
                borderTopLeftRadius: '3px',
              },
            }}
            sx={styles}
          />
          <div className="bg-white border pt-4 border-borderGrey rounded-b-lg h-full w-full">
            {selectedTabIndex === 0 && (
              <DocumentList
                data={employeeTabs}
                isLoading={isFetching}
                onPressItem={onChangeDocTabHandler}
              />
            )}
            {selectedTabIndex === 1 && (
              <TabButton isSelected={true} title={STRINGS.bankDetails} />
            )}
            {selectedTabIndex === 2 && (
              <TabButton isSelected={true} title={STRINGS.profileHistory} />
            )}
          </div>
        </div>
        {/* Right Side */}
        {employee && (
          <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
            {selectedTabIndex === 0 && (
              <DocumentDetailsView
                onPressButton={(status, id) =>
                  updateDocStatusHandler(status, id, false)
                }
                data={employeeDocs}
              />
            )}

            {selectedTabIndex === 1 && (
              <BankDetailsView
                employee={employee}
                onPressButton={(status, id) =>
                  updateDocStatusHandler(status, id, true)
                }
              />
            )}
            {selectedTabIndex === 2 && <ProfileHistoryView />}
            {selectedTabIndex === 3 && <ProfileHistoryView />}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;

const styles: SxProps<Theme> = {
  '&': {
    paddingX: '12px',
    paddingTop: '4px',
  },
  '.MuiButtonBase-root': {
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'none',
  },
  '.MuiTabs-flexContainer': {
    gap: '10px',
  },
  '.Mui-selected': {
    fontWeight: 'bold',
  },
};
