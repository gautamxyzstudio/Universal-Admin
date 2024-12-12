export enum IFieldTypes {
  SIMPLE = 'O0',
  EMAIL = 'o1',
  PASSWORD = 'o2',
  MOBILE = 'o3',
  STATUS = 'o4',
}

//enums
export enum IDocumentStatus {
  PENDING = 's0',
  APPROVED = 's1',
  DENIED = 's2',
  UPDATE = 's3',
  HIDDEN = 's4',
  VERIFIED = 's5',
  NULL = 'null',
}

export enum IClientStatus {
  PENDING = 's0',
  ACTIVE = 's1',
  INACTIVE = 's2',
}

export enum IJobPostStatus {
  OPEN = 's0',
  CLOSED = 's1',
  APPLIED = 's2',
  DECLINED = 's3',
  CONFIRMED = 's4',
  NO_SHOW = 's5',
  COMPLETED = 's6',
  CANCELED = 's7',
}

export enum IJobTypesEnum {
  EVENT = 'event',
  STATIC = 'static',
}

export enum IWorkStatus {
  PART_TIME = 's0',
  FULL_TIME = 's1',
}

export enum IEmployeeDocsApiKeys {
  SIN_DOCUMENT = 'sinDocument',
  LICENSE_ADVANCE = 'securityDocumentAdv',
  LICENSE_BASIC = 'securityDocumentBasic',
  SUPPORTING_DOCUMENT = 'supportingDocument',
  GOVT_ID = 'govtid',
  CHEQUE = 'directDepositVoidCheque',
  RESUME = 'resume',
}

export enum IEmployeeApiKeyStatus {
  SIN_DOCUMENT = 'sinDocumentStatus',
  LICENSE_ADVANCE = 'securityDocumentAdvStatus',
  LICENSE_BASIC = 'securityDocBasicStatus',
  SUPPORTING_DOCUMENT = 'supportingDocumentStatus',
  GOVT_ID = 'govtidStatus',
  CHEQUE = 'directDepositVoidChequeStatus',
  NULL = 'null',
}

export enum IUserTypesEnum {
  EMPLOYEE = 'emp',
  CLIENT = 'client',
  SUPERADMIN = 'supAdmin',
}


export enum IIssueRaisedStatusEnum {
  OPEN = 's0',
  CLOSED = 's1',
  NO_ISSUE = 's2',
}