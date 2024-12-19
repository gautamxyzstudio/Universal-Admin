/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
  useLazyGetEmployeeJobsHistoryQuery,
  useUpdateDocumentStatusMutation,
  useUpdateOrRejectedDocumentUpdateRequestMutation,
  useUpdateOtherDocumentStatusMutation,
} from '@/api/fetures/Employee/EmployeeApi';
import {
  IEmployeeAdvance,
  IEmployeeDocument,
  IJobPost,
} from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus } from '@/constant/enums';
import DocumentDetailsView from './RightViews/DocumentDetailsView';
import BankDetailsView from './RightViews/BankDetailsView';
import ProfileHistoryView from './RightViews/ProfileHistoryView';
import DocumentList from './LeftTabViewss/DocumentList';
import { SxProps, Theme } from '@mui/material';
import TabButton from '@/components/molecules/ButtonTypes/TabButton/TabButton';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import EmployeeJobsList from './LeftTabViewss/EmployeeJobsList';
import JobDetails from '@/components/organism/JobDetails/JobDetails';
import { ITextGroupTypes } from '@/components/organism/TextGroup/TextGroup.types';
import { withAsyncErrorHandlingPost } from '@/utility/utils';

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  //=------------------------------apis start ------------------------------

  // to getCurrent user details
  const [getEmployeeById, { isFetching }] = useLazyGetEmployeeByIdQuery();

  // to update mandatory document status
  const [updateDocStatus, { isLoading }] = useUpdateDocumentStatusMutation();

  // to update other document status
  const [updateOtherDocsStatus, { isLoading: showLoading }] =
    useUpdateOtherDocumentStatusMutation();

  // to update the status of document  update request
  const [mutateUpdateRequest, { isLoading: updateDocLoading }] =
    useUpdateOrRejectedDocumentUpdateRequestMutation();

  // to get employee completed jobs
  const [getJobHistory, { isFetching: getJobHistoryLoading }] =
    useLazyGetEmployeeJobsHistoryQuery();

  //=------------------------------apis end ------------------------------

  //-----------------------------State start ----------------------------------

  // to save current employee details
  const [employee, setEmployee] = useState<IEmployeeAdvance | null>(null);

  // to save the tab index for the custom tab component
  const [selectedTabIndex, setSelectedTabItemIndex] = useState(0);

  const [cheque, setCheque] = useState<null | IEmployeeDocument>(null);

  // to persist state when render occurs on the page
  const [tabChangeAttributes, setTabChangeAttributes] =
    useState<null | IEmployeeDocument>(null);

  // to save the current selected job post employee
  const [selectedJobPost, setSelectedJobPost] = useState<IJobPost | null>(null);

  // to save all the job post of the employee
  const [jobEmployees, setJobEmployees] = useState<IJobPost[]>([]);

  // to save the all kinds of docs to show on the left side tabs
  const [employeeDocsTabList, setEmployeeDocsTabList] = useState<
    IEmployeeDocument[]
  >([]);

  //to save the all kinds of docs to show on the right side tabs
  const [employeeDocs, setEmployeeDocs] = useState<{
    heading: string;
    docs: IEmployeeDocument[];
  }>({
    heading: 'New Requests',
    docs: [],
  });

  //-----------------------------State end ----------------------------------

  //--------------------------Contexts Starts---------------------------------
  const { displaySnackbar } = useSnackBarContext();

  const { changeLoaderState } = useShowLoaderContext();
  //--------------------------Contexts End---------------------------------

  //--------------- Side Effects Start --------------------------------------

  // to display loader when api mutation takes place
  useEffect(() => {
    changeLoaderState(isLoading);
  }, [isLoading]);

  useEffect(() => {
    changeLoaderState(showLoading);
  }, [showLoading]);
  useEffect(() => {
    changeLoaderState(updateDocLoading);
  }, [updateDocLoading]);

  // to call api when we get current employee id via params
  useEffect(() => {
    if (params.employeeDetails) {
      getEmployeeHandler(params.employeeDetails);
    }
  }, [params.employeeDetails]);

  // to call the api when user click on the third tab which is employee job posts
  useEffect(() => {
    if (params.employeeDetails && selectedTabIndex === 3)
      getEmployeeJobHistory(params.employeeDetails);
  }, [selectedTabIndex === 3]);

  // executes when there is a change in any employee document states to
  useEffect(() => {
    if (employee?.documents) {
      employee.documents.forEach((doc) => {
        if (doc.docName === STRINGS.cheque) {
          setCheque(doc);
        }
      });
      if (tabChangeAttributes) {
        const requests = employee.documents.filter(
          (doc) => doc.docName === tabChangeAttributes?.docName
        );
        const updateRequest = employee.update_requests.filter(
          (doc) => doc.docName === tabChangeAttributes.docName
        );
        setEmployeeDocs({
          heading: requests[0].docName,
          docs: [...updateRequest, ...requests],
        });
      } else {
        const pendingRequest = getCurrentPendingRequests(employee);
        setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
      }
      setEmployeeDocsTabList(employee.documents);
    }
  }, [employee]);

  //--------------- Side Effects End --------------------------------------

  //------------------------------------ Api Functions Start ---------------------------

  // call when to make change in any document
  const updateDocStatusHandler = (
    item: IEmployeeDocument | null,
    status: IDocumentStatus,
    isUpdate?: boolean,
    licenseNumber?: string
  ) => {
    if (isUpdate) {
      mutateUpdateDocumentStatusHandler(
        item?.docId,
        status,
        licenseNumber,
        item?.docName
      );
    } else {
      if (item) {
        updateOtherDocStatus(item.docName, item.docId, status, licenseNumber);
      }
    }
  };

  // to update the status of update document requests
  const mutateUpdateDocumentStatusHandler = withAsyncErrorHandlingPost(
    async (
      docId: number,
      status: IDocumentStatus,
      licenseNumber?: string,
      docName?: string
    ) => {
      const licenseNum =
        status === IDocumentStatus.DENIED && licenseNumber ? '' : licenseNumber;
      if (licenseNumber) {
        const licenseUpdateSuccess = await updateLicenseNumber(
          docName ?? '',
          licenseNum as any
        );
        if (!licenseUpdateSuccess) {
          displaySnackbar('error', 'Failed to update license');
          return;
        }
      }
      const updateRequestResult = await mutateUpdateRequest({
        id: docId,
        status: status,
      }).unwrap();
      if (updateRequestResult) {
        setEmployee((prev) => {
          if (!prev) return null;
          let prevEmpDetails = { ...prev };
          const prevOtherDocs = [...prev.update_requests];
          const index = prevOtherDocs.findIndex((doc) => doc.docId === docId);
          prevOtherDocs[index] = {
            ...prevOtherDocs[index],
            docStatus: status,
            licenseNo: licenseNumber,
          };
          prevEmpDetails = {
            ...prevEmpDetails,
            update_requests: prevOtherDocs,
          };
          return prevEmpDetails;
        });
        displaySnackbar('success', 'Document status updated successfully');
      }
    },
    displaySnackbar
  );

  // to update the status of other documents document
  const updateOtherDocStatus = withAsyncErrorHandlingPost(
    async (
      docName: string,
      docId: number,
      status: IDocumentStatus,
      licenseNumber: string | null
    ) => {
      const licenseNum =
        status === IDocumentStatus.DENIED && licenseNumber ? '' : licenseNumber;
      if (licenseNumber) {
        const licenseUpdateSuccess = await updateLicenseNumber(
          docName,
          licenseNum as any
        );
        if (!licenseUpdateSuccess) {
          displaySnackbar('error', 'Failed to update license');
          return;
        }
      }
      const response = await updateOtherDocsStatus({
        docId: docId,
        DocStatus: status,
      }).unwrap();
      if (response) {
        setEmployee((prev) => {
          if (!prev) return null;
          let prevEmpDetails = { ...prev };
          const prevOtherDocs = [...prev.documents];
          const index = prevOtherDocs.findIndex((doc) => doc.docId === docId);
          prevOtherDocs[index] = {
            ...prevOtherDocs[index],
            docStatus: status,
            licenseNo: licenseNumber,
          };
          prevEmpDetails = { ...prevEmpDetails, documents: prevOtherDocs };
          return prevEmpDetails;
        });
        displaySnackbar('success', 'Document status updated successfully');
      }
    },
    displaySnackbar
  );

  const updateLicenseNumber = async (
    docName: string,
    licenseNumber: string
  ) => {
    try {
      let body: { [key: string]: string } = {};
      if (docName === STRINGS.license_advance && licenseNumber) {
        body = {
          ...body,
          securityAdvNo: licenseNumber,
        };
      }
      if (docName === STRINGS.license_basic && licenseNumber) {
        body = {
          ...body,
          securityBasicNo: licenseNumber,
        };
      }
      const licenseResponse = await updateDocStatus({
        docId: parseInt(params.employeeDetails),
        body: body,
      }).unwrap();
      if (licenseResponse) {
        return licenseNumber;
      }
    } catch {
      return null;
    }
  };

  //  to get current employee details
  const getEmployeeHandler = async (empId: string) => {
    try {
      const response = await getEmployeeById({ id: parseInt(empId) }).unwrap();
      if (response) {
        setEmployee(response);
      }
    } catch (err) {
      console.log('Error in fetching employee details', err);
    }
  };

  // to get current employee job History
  const getEmployeeJobHistory = async (id: string) => {
    try {
      const response = await getJobHistory({
        id: parseInt(id),
        pageNumber: 1,
      }).unwrap();
      if (response) {
        setJobEmployees(response.data);
        setSelectedJobPost(response.data[0]);
      }
    } catch (err) {
      console.log('Error in fetching job history', err);
    }
  };

  //------------------------------------ Api Functions Start ---------------------------

  // let side tabs data
  const tabsData = [
    {
      label: 'Document',
      onClickAction: () => {
        setSelectedTabItemIndex(0);
        if (employee?.documents) {
          setEmployeeDocsTabList(employee.documents);
          const pendingRequest = getCurrentPendingRequests(employee);
          setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
        }
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

  // executes when there is a change in current selected document type
  const onChangeDocTabHandler = (doc: IEmployeeDocument | null) => {
    setTabChangeAttributes(doc);
    if (employee?.documents) {
      const documents = [...employee?.documents];
      const requestedDocs = [...employee.update_requests];
      if (doc) {
        const docs: IEmployeeDocument[] = [];
        const requests =
          documents.find((document) => document.docId === doc.docId) ?? null;
        const updateRequest = requestedDocs.find(
          (request) => request.docName === doc.docName
        );
        if (updateRequest) {
          docs.push(updateRequest);
        }
        if (requests) {
          docs.push(requests);
        }
        setEmployeeDocs({ heading: docs[0].docName, docs: docs });
      } else {
        const pendingRequest = getCurrentPendingRequests(employee);
        setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
      }
    }
  };

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        pageTitle={STRINGS.employeeManagement}
        isLoading={isLoading}
        name={employee?.name ?? ''}
      />
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
              type={ITextGroupTypes.detailPage}
              title="Date of Birth"
              text="04/08/2000"
            />
            <TextGroup
              isLoading={isFetching}
              title="Gender"
              type={ITextGroupTypes.detailPage}
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
                data={employeeDocsTabList}
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
            {selectedTabIndex === 3 && (
              <EmployeeJobsList
                data={jobEmployees}
                isLoading={getJobHistoryLoading}
                selectedPostId={selectedJobPost?.id ?? null}
                onPressButton={(post) => setSelectedJobPost(post)}
              />
            )}
          </div>
        </div>
        {/* Right Side */}
        {employee && (
          <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
            {selectedTabIndex === 0 && (
              <DocumentDetailsView
                onPressButton={updateDocStatusHandler}
                data={employeeDocs}
              />
            )}

            {selectedTabIndex === 1 && (
              <BankDetailsView
                employee={employee}
                onPressButton={updateDocStatusHandler}
                cheque={cheque}
              />
            )}
            {selectedTabIndex === 2 && <ProfileHistoryView />}

            {selectedTabIndex === 3 && (
              <div className="w-full mb-5 h-full">
                {selectedJobPost && (
                  <JobDetails data={selectedJobPost} isEmployee={true} />
                )}
              </div>
            )}
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

const getCurrentPendingRequests = (
  emp: IEmployeeAdvance | null
): IEmployeeDocument[] | [] => {
  if (!emp) return [];
  const localDocs: IEmployeeDocument[] | [] = [
    ...emp.documents,
    ...emp.update_requests,
  ]
    .map((doc) => (doc.docStatus === IDocumentStatus.PENDING ? doc : null))
    .filter((doc) => doc !== null);
  return localDocs;
};
