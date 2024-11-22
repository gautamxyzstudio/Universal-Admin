'use client';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import { Icons, Images } from '../../../../../public/exporter';
import ContactCard from '@/components/organism/ContactDetailCard/ContactDetailCard';
import CustomTab from '@/components/atoms/CustomTab/CustomTab';
import CustomList from '@/components/atoms/CustomList/CustomList';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import WorkHistortyCard from '@/components/organism/WorkHistoryCard/WorkHistoryCard';
import WorkDetails from '@/components/organism/WorkDetails/WorkDetails';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import { useLazyGetEmployeeByIdQuery } from '@/api/fetures/Employee/EmployeeApi';
import {
  IEmployeeAdvance,
  IEmployeeDocument,
} from '@/api/fetures/Employee/EmployeeApi.types';
import { IListItemProps } from '@/components/atoms/CustomList/CustomList.types';
import { IDocumentStatus } from '@/constant/enums';
import DocumentDetailsView from './DocumentDetailsView';

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  const [getEmployeeById, { isFetching }] = useLazyGetEmployeeByIdQuery();
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(null);
  const [employee, setEmployee] = useState<IEmployeeAdvance | null>(null);
  const [employeeDocuments, setEmployeeDocuments] = useState<
    IListItemProps[] | []
  >([]);
  const [employeeDocs, setEmployeeDocs] = useState<IEmployeeDocument[] | []>(
    []
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
        if (response.documents.length > 0) {
          const documentsToDisplay: IListItemProps[] = [];
          setEmployeeDocs(response.documents);
          response.documents.forEach((doc) => {
            documentsToDisplay.push({
              label: doc.docName,
              docId: doc.docId ?? 0,
              icon: Icons.doc,
              status: doc.docStatus,
              onClick: () => {
                setSelectedItem(
                  <DocumentDetailsView
                    data={[doc]}
                    onPressApprove={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    onPressReject={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                );
              },
            });
          });
          documentsToDisplay.unshift({
            label: 'All requested Document',
            icon: Icons.doc,
            docId: null,
            status: IDocumentStatus.PENDING,
            onClick: () => {
              setSelectedItem(
                <DocumentDetailsView
                  data={response.documents ?? []}
                  onPressApprove={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  onPressReject={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              );
            },
          });
          setEmployeeDocuments(documentsToDisplay);
        }
      } else {
        console.log('Employee data not available');
      }
    } catch (err) {
      console.log('Error in fetching employee details', err);
    }
  };

  // Bank Content
  const bankData = [
    {
      label: 'Bank Details',
      onClick: () => {
        console.log('Bank Details');
      },
    },
  ];

  // Profile Content
  const profileData = [
    {
      label: 'History',
      onClick: () => {
        setSelectedItem('Profile History Content');
      },
    },
  ];

  // Work History Contents
  const workHistoryData = [
    {
      children: (
        <WorkHistortyCard
          companyName={'Cosmic Security'}
          profileName={'Security Guard'}
          image={Images.demoImg}
          textLabel={STRINGS.applied}
          textStyle={'text-darkBlue bg-white'}
          iconWithTexts={[
            {
              text: '20 /hr',
              icon: Icons.dollar,
              textStyle: '',
            },
            {
              text: '2-06-2024',
              subText: '7:00 PM - 2:00 AM ',
              icon: Icons.timeDate,
              textStyle: '',
            },
            {
              text: 'IPEX Oakville, 1425 North Service',
              icon: Icons.locationPin,
              textStyle: '',
            },
          ]}
          days={new Date(23 / 3 / 2001)}
        />
      ),
      onClick: () => {
        console.log('Clicked on Work card 1');
        setSelectedItem(<WorkDetails />);
      },
    },
    {
      children: (
        <WorkHistortyCard
          companyName={'Cosmic Security'}
          profileName={'Security Guard'}
          image={Images.demoImg}
          textLabel={STRINGS.completed}
          textStyle={'text-skyBlue bg-lightSkyBlue'}
          iconWithTexts={[
            {
              text: '20 /hr',
              icon: Icons.dollar,
              textStyle: '',
            },
            {
              text: '2-06-2024',
              subText: '7:00 PM - 2:00 AM ',
              icon: Icons.timeDate,
              textStyle: '',
            },
            {
              text: 'IPEX Oakville, 1425 North Service',
              icon: Icons.locationPin,
              textStyle: '',
            },
          ]}
          days={new Date(23 / 3 / 2001)}
        />
      ),
      onClick: () => {
        console.log('Clicked on Work card 2');
        setSelectedItem(<WorkDetails />);
      },
    },
    {
      children: (
        <WorkHistortyCard
          companyName={'Cosmic Security'}
          profileName={'Security Guard'}
          image={Images.demoImg}
          textLabel={STRINGS.completed}
          textStyle={'text-skyBlue bg-lightSkyBlue'}
          iconWithTexts={[
            {
              text: '20 /hr',
              icon: Icons.dollar,
              textStyle: '',
            },
            {
              text: '2-06-2024',
              subText: '7:00 PM - 2:00 AM ',
              icon: Icons.timeDate,
              textStyle: '',
            },
            {
              text: 'IPEX Oakville, 1425 North Service',
              icon: Icons.locationPin,
              textStyle: '',
            },
          ]}
          days={new Date(23 / 3 / 2001)}
        />
      ),
      onClick: () => {
        console.log('Clicked on Work card 3');
        setSelectedItem(<WorkDetails />);
      },
    },
  ];

  const BankDetails = () => {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={'Bank account number'}
          text={employee?.bankingDetails?.bankAccNo ?? ''}
        />
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={'Institution number'}
          text={employee?.bankingDetails?.institutionNumber ?? ''}
        />
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={'Transit Number'}
          text={employee?.bankingDetails?.transitNumber ?? ''}
        />
        <DocumentCard
          label="Direct deposit/void cheque"
          docImageSrc={employee?.bankingDetails.chique.doc?.url ?? ''}
          docImageName={employee?.bankingDetails.chique.doc?.name ?? ''}
          fileStyle="bg-lightPrimary"
        />
      </div>
    );
  };
  const ProfileDetails = () => {
    return (
      <div>
        <h2>Profile Details Content</h2>
      </div>
    );
  };

  const tabsData = [
    {
      label: 'Document',
      content: <CustomList items={employeeDocuments} />,
      onClickAction: () => {
        setSelectedItem(
          <DocumentDetailsView
            onPressApprove={function (): void {
              throw new Error('Function not implemented.');
            }}
            onPressReject={function (): void {
              throw new Error('Function not implemented.');
            }}
            data={employeeDocs}
          />
        );
      },
    },
    {
      label: 'Bank',
      content: <CustomList items={bankData} />,
      onClickAction: () => {
        setSelectedItem(<BankDetails />);
      },
    },
    {
      label: 'Profile',
      content: <CustomList items={profileData} />,
      onClickAction: () => {
        setSelectedItem(<ProfileDetails />);
      },
    },
    {
      label: 'Work history',
      content: <CustomList items={workHistoryData} />,
      onClickAction: () => {
        setSelectedItem(<WorkDetails />);
      },
    },
  ];

  return (
    <div className="w-full h-[90%]">
      {employee?.name && (
        <PageSubHeader
          pageTitle={STRINGS.employeeManagement}
          name={employee?.name}
        />
      )}
      <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
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
            sx={{
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
            }}
          />
        </div>
        {/* Right Side */}
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          {selectedItem ? (
            selectedItem
          ) : employeeDocs ? (
            <DocumentDetailsView
              onPressApprove={function (): void {
                throw new Error('Function not implemented.');
              }}
              onPressReject={function (): void {
                throw new Error('Function not implemented.');
              }}
              data={employeeDocs.length > 0 ? employeeDocs ?? [] : []}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
