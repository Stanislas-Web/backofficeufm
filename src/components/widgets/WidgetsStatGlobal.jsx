import React, { useState, useEffect } from "react";
import {
  CRow,
  CCard,
  CCardBody,
  CCol,
  CCallout,
  CCardHeader,
} from "@coreui/react";

import API from "../../services/api";

const WidgetsStatGlobal = () => {
  const [dataStat, setdataStat] = useState([]);
  useEffect(() => {
    API.get("getGlobalStat").then((res) => {
      setdataStat(res.data);
    });
  }, []);

  // render
  return (
    <CCard>
      <CCardHeader>Vue globale en RDC</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <CCallout color="danger">
              <small className="text-muted">VBG</small>
              <br />
              <strong className="h4">{dataStat.nbrTotalVbg}</strong>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="warning">
              <small className="text-muted">Cas soumis</small>
              <br />
              <strong className="h4">{dataStat.nbrTotalCasSoumis}</strong>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="success">
              <small className="text-muted">Suivis</small>
              <br />
              <strong className="h4">{dataStat.nbrSuivisTotal}</strong>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="primary">
              <small className="text-muted">Suivis encours</small>
              <br />
              <strong className="h4">{dataStat.nbrSuivisEncours}</strong>
            </CCallout>
          </CCol>
          <CCol>
            <CCallout color="infos">
              <small className="text-muted">Structures</small>
              <br />
              <strong className="h4">{dataStat.nbrTotalStructure}</strong>
            </CCallout>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default WidgetsStatGlobal;
