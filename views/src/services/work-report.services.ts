import { get, post } from "../utils/axios.util";
import {IWorkReportTypes} from "../typings"

export const addNewWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/addWorkDetails', body: siteParam })
};

export const editWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/editWorkDetails', body: siteParam })
};

export const getAllWorkReport = () => {
    return get({ url: `constructionSite/getWorkDetail`});
};
