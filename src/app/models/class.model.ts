import { TimeSlot } from './timeslot.model';
export class Class {
  _id: number;
  level: number;
  number: number;
  name: string;
  schedule?: TimeSlot[];
}

export interface ClassQuery  {
  allClasses: Class[];
  classByName: Class;
  classById: Class;
}
