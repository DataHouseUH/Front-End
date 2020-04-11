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
