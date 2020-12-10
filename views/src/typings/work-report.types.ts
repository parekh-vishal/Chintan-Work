import { IDropdownObject } from ".";

export interface IWorkDetailTypes {
  workType : string;
  totalworker : {
      mason : number;
      labour : number;
  };
  workDescription : string;
  workTypeObject?: IDropdownObject;
  workId: string;
}


export interface IWorkReportTypes {
  siteId : string;
  siteObject? : IDropdownObject;
  siteName : string;
  supervisorId : string;
  supervisorName : string;
  Works : Array<IWorkDetailTypes>;
  cementAmount : number;
  date : Date;
  _id?: string;
}
