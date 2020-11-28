import { get, post } from "../utils/axios.util";
import {SiteType} from "../typings"

export const addNewSite = (siteParam: SiteType) => {
    return post({ url: 'constructionSite/addNewSite', body: siteParam })
};

export const getAllSites = () => {
    return get({ url: 'constructionSite/getAllSite'})
};

export const getSiteSettings = ({userId, siteId}:{userId: string, siteId: string}) => {
    return get({ url: `constructionSite/getSiteSettings?siteId:"${siteId}"&adminUsers.adminUserId:"${userId}"`})
};
