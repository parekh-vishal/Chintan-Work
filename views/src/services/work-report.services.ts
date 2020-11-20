import { get, post } from "../utils/axios.util";
import {SiteType} from "../typings"

export const addNewWorkReport = (siteParam: SiteType) => {
    return post({ url: 'constructionSite/addWorkDetails', body: siteParam })
};

export const getAllWorkReport = () => {
    return get({ url: 'constructionSite/getWorkDetail'})
};
