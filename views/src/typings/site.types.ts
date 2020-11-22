export interface SiteAddressType {
  AddressLine1: string;
  City: string;
  State: string;
  pincode: number;
}

export interface SupervisorType {
  siteSupervisorId : string;
  siteSupervisorName : string;
  siteSupervisorNo : number;
}


export interface SiteType {
  siteName: string;
  siteId?: string;
  ownerName: string;
  ownerContactNo: string;
  siteAddress: SiteAddressType;
  siteInaugurationDate: Date;
  siteEstimate: string,
  tentativeDeadline: Date;
  supervisors: Array<SupervisorType>;
}
