export interface MasterAlertCustomMessageTbl {
  status: string,
  data: data[],
  message: string
}

export interface BackDisplayTbl {
  BackDisplayID: number;
  UserDisplayName: string;
  PetName: string;
  MicroChipID: string;
  Is_Arrived: boolean;
  Is_Inspected: boolean;
  Is_Released: boolean;
  Colour: string;
}

export interface data {
  AlertCustomMessageID: number,
  Message: string
}
