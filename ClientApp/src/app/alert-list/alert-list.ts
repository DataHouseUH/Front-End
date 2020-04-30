import { Time } from "@angular/common";

export interface MasterAlertCustomMessageTbl {
  status: string,
  data: data[],
  message: string
}

export interface data {
  AlertCustomMessageID: number,
  Message: string
}

/* Back Display */
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
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

export interface AlertTbl {
  AlertID: number;
  BackDisplayID: number;
  Message: string;
  TimeCreated: Time;
}
