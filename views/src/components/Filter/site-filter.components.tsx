import { Date } from "mongoose";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/async";
import {FilterComponents} from "../Filter/filter.components";
import { getAllSites} from "../../services";
interface ISiteFilterProp {
    siteName?: string;
    ownerName?: string;
    siteInaugurationDateFrom?: Date;
    siteInaugurationDateTo?: Date;
    tentativeDeadlineFrom?: Date;
    tentativeDeadlineTo?: Date;
}

export const Site_Filter = (props:ISiteFilterProp)=>{ 
    const [allSite, setAllSite] = useState([] as Array<{}>);
    const [allOwnerName, setAllOwnerName] = useState([] as Array<{}>);
    const [allInagurationDateFrom, setInagurationDateFrom] = useState([] as Array<{}>);
    const [allInagurationDateTo, setInagurationDateTo] = useState([] as Array<{}>);
    return(
         <>
       <FilterComponents/>
       { /* <AsyncSelect value={} onInputChange={} loadOptions={}></AsyncSelect>
        <AsyncSelect></AsyncSelect>
        <AsyncSelect></AsyncSelect>*/}
       </>
    );
};