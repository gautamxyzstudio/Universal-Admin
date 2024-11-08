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
