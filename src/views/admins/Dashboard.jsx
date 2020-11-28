import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from '../../components/charts/MainChartExample.js'
import AmchartMainChart from '../../components/amCharts/AmchartMainChart'

const WidgetsDropdownAdmin = lazy(() =>
  import("../../components/widgets/WidgetsDropdownAdmin")
);
const WidgetsBrand = lazy(() =>
  import("../../components/widgets/WidgetsBrand.js")
);
const WidgetsIconAdmin = lazy(() =>
  import("../../components/widgets/WidgetsIconAdmin")
);


const AdminDashboard = () => {
  return (
    <>
      <WidgetsDropdownAdmin />

      <CRow>
        <CCol sm="9">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Vue globale
                  </h4>
                  <div className="small text-muted">{new Date().getFullYear()}</div>
                </CCol>
                {/* <CCol sm="7" className="d-none d-md-block">
                  <CButton color="primary" className="float-right">
                    <CIcon name="cil-cloud-download" />
                  </CButton>
                  <CButtonGroup className="float-right mr-3">
                    {["Day", "Month", "Year"].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === "Month"}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol> */}
              </CRow>
              <MainChartExample style={{height: '400px', marginTop: '40px'}}/>
              {/* <AmchartMainChart tagName="mainAmchart"  style={{height: '300px', marginTop: '40px'}}/> */}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="3">
          <WidgetsIconAdmin />
        </CCol>
      </CRow>
    </>
  );
};

export default AdminDashboard;
