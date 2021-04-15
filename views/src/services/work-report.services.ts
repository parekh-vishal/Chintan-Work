import { get, post, getQueryBasedOnParam } from "../utils/axios.util";
import {IWorkReportTypes} from "../typings"

export const addNewWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/addWorkDetails', body: siteParam })
};

export const editWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/editWorkDetails', body: siteParam })
};

export const getAllWorkReport = ({siteId,page}:{siteId:String,page:number}) => {
    let query = '?'+getQueryBasedOnParam({ siteId,page });
    query = (query=='?')?' ':query;
    return get({ url: `constructionSite/getWorkDetail${query}`});
};
