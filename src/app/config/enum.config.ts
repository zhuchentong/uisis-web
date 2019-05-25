export enum CommonState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

export enum Role {
  SYS_ADMIN = 'SYS_ADMIN',
  SECURITY_OFFICER = 'SECURITY_OFFICER',
  LAB_ADMIN = 'LAB_ADMIN',
  MANAGER = 'MANAGER',
  LEADER = 'LEADER'
}

export enum MessageType {
  TO_DO = 'TO_DO',
  NOTICE = 'NOTICE',
  REMIND = 'REMIND'
}
export enum CheckTypes {}

export enum DictType {
  CertificateType = 'CertificateType',
  CheckItemType = 'CheckItemType',
  CheckRecordState = 'CheckRecordState',
  CheckType = 'CheckType',
  CommonState = 'CommonState',
  DocumentType = 'DocumentType',
  Gender = 'Gender',
  MessageType = 'MessageType',
  Role = 'Role'
}
