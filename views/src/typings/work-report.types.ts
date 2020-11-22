export interface WorkDetailTypes {
  workType : string;
  totalworker : {
      mason : number;
      labour : number;
  };
  workDescription : string;
}


export interface WorkReportTypes {
  siteId : string;
  siteName : string;
  supervisorId : string;
  supervisorName : string;
  Works : Array<WorkDetailTypes>;
  cementAmount : number;
  date : Date;
}
