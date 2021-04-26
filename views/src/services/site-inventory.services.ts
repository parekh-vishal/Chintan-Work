import { get, post, getQueryBasedOnParam } from "../utils/axios.util";
import {ISiteInventoryTypes} from "../typings"

export const addNewSiteInventory = (siteParam: ISiteInventoryTypes) => {
    return post({ url: 'constructionSite/addMaterialToInventory', body: siteParam })
};

export const editSiteInventory = (siteParam: ISiteInventoryTypes) => {
    return post({ url: 'constructionSite/editSiteInventory', body: siteParam })
};

export const getAllSiteInventory = ({siteId,page}:{siteId:String,page:number}) => {
    let query = '?'+getQueryBasedOnParam({ siteId,page });
    query = (query=='?')?' ':query;
    return get({ url: `constructionSite/getSiteInventory${query}`});
};