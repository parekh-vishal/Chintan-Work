import { IDropdownObject } from ".";

export interface WorkDetailTypes {
  workType : string;
  totalworker : {
      mason : number;
      labour : number;
  };
  workDescription : string;
  workTypeObject?: IDropdownObject;
  workId: string;
}


export interface WorkReportTypes {
  siteId : string;
  siteObject? : IDropdownObject;
  siteName : string;
  supervisorId : string;
  supervisorName : string;
  Works : Array<WorkDetailTypes>;
  cementAmount : number;
  date : Date;
  _id?: string;
}
