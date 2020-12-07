import { get, post } from "../utils/axios.util";
import {WorkReportTypes} from "../typings"

export const addNewWorkReport = (siteParam: WorkReportTypes) => {
    return post({ url: 'constructionSite/addWorkDetails', body: siteParam })
};

export const editWorkReport = (siteParam: WorkReportTypes) => {
    return post({ url: 'constructionSite/editWorkDetails', body: siteParam })
};

export const getAllWorkReport = () => {
    return get({ url: 'constructionSite/getWorkDetail'})
};
