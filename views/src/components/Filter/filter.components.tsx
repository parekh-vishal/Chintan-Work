import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const FilterComponents = ()=>{
    return(
        <>
        <FontAwesomeIcon icon={ faFilter } style={{color:`#007bff`}}/> 
        </>   
    );
};