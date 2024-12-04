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
import EmployeeJobsList from './LeftTabViewss/EmployeeJobsList';
import JobDetails from '@/components/organism/JobDetails/JobDetails';
import { ITextGroupTypes } from '@/components/organism/TextGroup/TextGroup.types';

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

  // to persist state when render occurs on the page
  const [tabChangeAttributes, setTabChangeAttributes] = useState<{
    doc: null | IEmployeeDocument;
    type: 'primary' | 'secondary' | null;
  }>({ doc: null, type: null });

  // to save the current selected job post employee
  const [selectedJobPost, setSelectedJobPost] = useState<IJobPost | null>(null);

  // to save all the job post of the employee
  const [jobEmployees, setJobEmployees] = useState<IJobPost[]>([]);

  // to save the all kinds of docs to show on the left side tabs
  const [employeeDocsTabList, setEmployeeDocsTabList] = useState<{
    primaryDocuments: IEmployeeDocument[] | null;
    otherDocuments: IEmployeeDocument[] | null;
    docRequests: IEmployeeDocument[] | null;
  }>({
    primaryDocuments: null,
    docRequests: null,
    otherDocuments: null,
  });

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
    if (employee) {
      if (!tabChangeAttributes.type) {
        const pendingRequest = getCurrentPendingRequests(employee);
        setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
      } else {
        const allEmployeeDocs = getAllDocumentEmployee(employee);
        const requests = allEmployeeDocs.filter(
          (doc) => doc.docName === tabChangeAttributes?.doc?.docName
        );
        requests.sort((a, b) =>
          a.isUpdate === b.isUpdate ? 0 : a.isUpdate ? -1 : 1
        );
        setEmployeeDocs({ heading: requests[0].docName, docs: requests });
      }
      setEmployeeDocsTabList({
        primaryDocuments: employee?.documents ?? [],
        otherDocuments: employee?.otherDocuments ?? [],
        docRequests: employee.documentRequests ?? [],
      });
    }
  }, [employee]);

  //--------------- Side Effects End --------------------------------------

  //------------------------------------ Api Functions Start ---------------------------

  // call when to make change in any document
  const updateDocStatusHandler = (
    item: IEmployeeDocument,
    status: IDocumentStatus,
    key: IEmployeeApiKeyStatus,
    isCheque?: boolean,
    docId?: number,
    isUpdate?: boolean,
    licenseNumber?: string
  ) => {
    if (key === IEmployeeApiKeyStatus.NULL) {
      if (isUpdate) {
        mutateUpdateDocumentStatusHandler(
          docId,
          status,
          licenseNumber,
          item.docName
        );
      } else {
        updateOtherDocStatus(docId, status);
      }
    } else {
      updateMandatoryDocumentsStatus(
        item,
        status,
        key,
        licenseNumber,
        isCheque
      );
    }
  };
  // to update the status of mandatory document
  const updateMandatoryDocumentsStatus = withAsyncErrorHandlingPost(
    async (
      item: IEmployeeDocument,
      status: IDocumentStatus,
      key: IEmployeeApiKeyStatus,
      licenseNumber: string,
      isCheque?: boolean
    ) => {
      let body: { [key: string]: string } = {};
      body = {
        [key]: status,
      };
      if (item.docName === STRINGS.license_advance && licenseNumber) {
        body = {
          ...body,
          securityAdvNo: licenseNumber,
        };
      }
      if (item.docName === STRINGS.license_basic && licenseNumber) {
        body = {
          ...body,
          securityBasicNo: licenseNumber,
        };
      }
      const response = await updateDocStatus({
        docId: parseInt(params.employeeDetails),
        body: body,
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
              licenseNo: licenseNumber,
            };
            prevEmpDetails = { ...prevEmpDetails, documents: prevEmpDocs };
            return prevEmpDetails;
          });
        }
        displaySnackbar('success', 'Document  updated successfully');
      }
    },
    displaySnackbar
  );

  // to update the status of update document requests
  const mutateUpdateDocumentStatusHandler = withAsyncErrorHandlingPost(
    async (
      docId: number,
      status: IDocumentStatus,
      licenseNumber?: string,
      docName?: string
    ) => {
      let body: { [key: string]: string } = {};
      if (docName === STRINGS.license_advance && licenseNumber) {
        body = {
          securityAdvNo: licenseNumber,
        };
      }
      if (docName === STRINGS.license_basic && licenseNumber) {
        body = {
          securityBasicNo: licenseNumber,
        };
      }
      if (Object.keys(body).length > 0) {
        const response = await updateDocStatus({
          docId: parseInt(params.employeeDetails),
          body: body,
        }).unwrap();
        if (response) {
          setEmployee((prev) => {
            if (!prev) return null;
            let prevEmployee = { ...prev };
            const employeeDocs = [...prevEmployee.documentRequests];
            const index = employeeDocs.findIndex(
              (doc) => doc.docName === docName
            );
            if (index !== -1) {
              employeeDocs[index] = {
                ...employeeDocs[index],
                licenseNo: licenseNumber,
              };
            }
            prevEmployee = { ...prevEmployee, documentRequests: employeeDocs };
            return prevEmployee;
          });
        }
      }
      const response = await mutateUpdateRequest({
        id: docId,
        status: status,
      }).unwrap();
      if (response) {
        setEmployee((prev) => {
          if (!prev) return null;
          let prevEmpDetails = { ...prev };
          const prevDocsRequest = [...prev.documentRequests];
          const index = prevDocsRequest.findIndex((doc) => doc.docId === docId);
          prevDocsRequest[index] = {
            ...prevDocsRequest[index],
            docStatus: status,
          };
          prevEmpDetails = {
            ...prevEmpDetails,
            documentRequests: prevDocsRequest,
          };
          return prevEmpDetails;
        });
        displaySnackbar('success', 'Document updated successfully');
      }
    },
    displaySnackbar
  );

  // to update the status of other documents document
  const updateOtherDocStatus = withAsyncErrorHandlingPost(
    async (docId: number, status: IDocumentStatus) => {
      const response = await updateOtherDocsStatus({
        docId: docId,
        DocStatus: status,
      }).unwrap();
      if (response) {
        setEmployee((prev) => {
          if (!prev) return null;
          let prevEmpDetails = { ...prev };
          const prevOtherDocs = [...prev.otherDocuments];
          const index = prevOtherDocs.findIndex((doc) => doc.docId === docId);
          prevOtherDocs[index] = {
            ...prevOtherDocs[index],
            docStatus: status,
          };
          prevEmpDetails = { ...prevEmpDetails, otherDocuments: prevOtherDocs };
          return prevEmpDetails;
        });
      }
      displaySnackbar('success', 'Document status updated successfully');
    },
    displaySnackbar
  );

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
        setEmployeeDocsTabList({
          primaryDocuments: employee?.documents ?? [],
          otherDocuments: employee?.otherDocuments ?? [],
          docRequests: employee?.documentRequests ?? [],
        });
        const pendingRequest = getCurrentPendingRequests(employee);
        setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
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

  console.log(
    '_==-=-=-=-=-=-=-=-=-=-=-=-=-EMPLOYEE DOCS=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
  );
  console.log(employee);
  console.log(
    '_==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
  );

  // executes when there is a change in current selected document type
  const onChangeDocTabHandler = (
    type: 'primary' | 'secondary' | null,
    doc: IEmployeeDocument
  ) => {
    setTabChangeAttributes({ doc: doc.docId === null ? null : doc, type });
    if (employee?.documents) {
      const employeeDocs = [...employee?.documents];
      const otherDocs = [...employee?.otherDocuments];
      const requestedDocs = [...employee.documentRequests];
      if (type === null) {
        const pendingRequest = getCurrentPendingRequests(employee);
        setEmployeeDocs({ heading: 'New Requests', docs: pendingRequest });
      }
      if (type === 'primary') {
        const docs: IEmployeeDocument[] = [];
        const otherItem =
          requestedDocs.find((document) => document.docName === doc.docName) ??
          null;
        if (otherItem) {
          docs.push(otherItem);
        }
        const item =
          employeeDocs.find((document) => document.docId === doc.docId) ?? null;
        if (item) {
          docs.push(item);
        }
        if (item)
          setEmployeeDocs({
            heading: docs[0].docName,
            docs: docs,
          });
      }
      if (type === 'secondary') {
        const item = otherDocs.find((document) => document.docId === doc.docId);
        if (item)
          setEmployeeDocs({
            heading: item.docName,
            docs: [item],
          });
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
                onPressButton={(
                  item,
                  status,
                  key,
                  id,
                  isUpdate,
                  licenseNumber
                ) =>
                  updateDocStatusHandler(
                    item,
                    status,
                    key,
                    false,
                    id,
                    isUpdate,
                    licenseNumber
                  )
                }
                data={employeeDocs}
              />
            )}

            {selectedTabIndex === 1 && (
              <BankDetailsView
                employee={employee}
                onPressButton={(item, status, id) =>
                  updateDocStatusHandler(item, status, id, true)
                }
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
    ...emp.otherDocuments,
    ...emp.documentRequests,
  ]
    .map((doc) => (doc.docStatus === IDocumentStatus.PENDING ? doc : null))
    .filter((doc) => doc !== null);
  return localDocs;
};

const getAllDocumentEmployee = (
  emp: IEmployeeAdvance | null
): IEmployeeDocument[] | [] => {
  if (!emp) return [];
  const localDocs: IEmployeeDocument[] | [] = [
    ...emp.documents,
    ...emp.otherDocuments,
    ...emp.documentRequests,
  ].map((doc) => doc);

  return localDocs;
};
