export interface MasterAlertCustomMessageTbl {
  status: string,
  data: data[],
  message: string
}

export interface data {
  AlertCustomMessageID: number,
  Message: string
}
