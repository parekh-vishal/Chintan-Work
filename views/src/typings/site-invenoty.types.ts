export interface ISiteInventoryTypes {
    metId?: string;
    siteId?: string;
    siteName?: string;
    supervisorName: string;
    materialType: string;
    materialUnit: string;
    materialTotalQuantity: number;
    pricePerUnit?: number;
    invoicePrice: number;
    invoiceNo?: string;
    remarks?: String;
    supplier?: String;
    date?: Date;
    _id?: string;
}