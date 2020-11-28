import React from 'react';
import {
    CInput,
    CFormGroup,
} from '@coreui/react'

const SearchCassoumis=(props)=>{
   const { recherche, placehold } = props;
  return (
    <CFormGroup>
    <CInput id="recherche" onChange={recherche} placeholder={placehold}  />
    </CFormGroup>
  );
}

export default SearchCassoumis;
