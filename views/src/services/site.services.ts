import { get, post, getQueryBasedOnParam } from "../utils/axios.util";
import {SiteType} from "../typings"

export const addNewSite = (siteParam: SiteType) => {
    return post({ url: 'constructionSite/addNewSite', body: siteParam })
};

export const editSite = (siteParam: SiteType) => {
    return post({ url: 'constructionSite/editSiteInfo', body: siteParam })
};

export const getAllSites = ({page,siteName}:{page?:number,siteName?:String}) => {
    let query = '?'+getQueryBasedOnParam({ page, siteName });
    query = (query=='?')?' ':query;
    return get({ url: `constructionSite/getAllSite${query}`})
};

export const getSiteSettings = ({userId, siteId}:{userId: string, siteId: string}) => {
    return get({ url: `constructionSite/getSiteSettings?siteId=${siteId}`})//&adminUsers.adminUserId=${userId}
};

export const updateSiteSettings = ({siteId, body}:{body: any, siteId: string}) => {
    return post({ url: `constructionSite/editSiteSettings?siteId=${siteId}`, body})
};

export const addWorkCategory = (body: any) => {
    return post({ url: `constructionSite/addWorkCategory`, body})
};

export const getAllWorkCategory = () => {
    return get({ url: `constructionSite/getAllCategories`})
};

export const editWorkCategory = ({workId, body}:{workId: string, body: any}) => {
    return post({ url: `constructionSite/editWorkCategory?workId=${workId}`, body})
};

