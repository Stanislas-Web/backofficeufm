import React from "react";
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CSelect,
  CInput,
  CButton,
} from "@coreui/react";

export default function FilterInputVbg() {
  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
              <CRow>
                {/* <CCol sm="4">
                  <CSelect
                    custom
                    name="input_trie"
                    id="input_trie"
                    //   autoComplete="name"
                  >
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol> */}
                <CCol sm="5">
                  <CInput
                    type="date"
                    id="perioode_1"
                    name="perioode_1 "
                    placeholder="date"
                  />
                </CCol>
                <CCol sm="5">
                  <CInput
                    type="date"
                    id="perioode_2"
                    name="perioode_2 "
                    placeholder="date"
                  />
                </CCol>
                <CCol sm="2">
                  <CButton variant="primary" type="submit" className="btn btn-primary btn-block">
                    Valider
                  </CButton>
                </CCol>
              </CRow> 
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
