import React, { useState, useEffect } from "react";
import {
  CCardGroup,
  CCardFooter,
  CCol,
  CLink,
  CRow,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
  CWidgetSimple,
  CProgress,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import API from "../../services/api";

const WidgetsIconAdmin = () => {
  const [dataStat, setdataStat] = useState([]);
  useEffect(() => {
    API.get("getGlobalStat").then((res) => {
      setdataStat(res.data);
    });
  }, []);
  return (
    <>
      {/* <CRow>
        <CCol lg="12">
          <CWidgetIcon
            text="Total Suivis"
            header={dataStat.nbrSuivisTotal}
            color="primary"
            iconPadding={false}
            footerSlot={
              <CCardFooter className="card-footer px-3 py-2">
                <CLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="#"
                >
                  Voir en detail
                  <CIcon
                    name="cil-arrow-right"
                    className="float-right"
                    width="16"
                  />
                </CLink>
              </CCardFooter>
            }
          >
            <CIcon width={24} name="cil-folder-open" />
          </CWidgetIcon>
        </CCol>
        <CCol lg="12">
          <CWidgetIcon
            text="Dossiers traités"
            header={dataStat.nbrSuivisTerminer}
            color="success"
            iconPadding={false}
            footerSlot={
              <CCardFooter className="card-footer px-3 py-2">
                <CLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="#"
                >
                  Voir en detail
                  <CIcon
                    name="cil-arrow-right"
                    className="float-right"
                    width="16"
                  />
                </CLink>
              </CCardFooter>
            }
          >
            <CIcon width={24} name="cil-calendar-check" />
          </CWidgetIcon>
        </CCol>
        <CCol lg="12">
          <CWidgetIcon
            text="Dossiers en cours"
            header={dataStat.nbrSuivisEncours}
            color="info"
            iconPadding={false}
            footerSlot={
              <CCardFooter className="card-footer px-3 py-2">
                <CLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="#"
                >
                  Voir en detail
                  <CIcon
                    name="cil-arrow-right"
                    className="float-right"
                    width="16"
                  />
                </CLink>
              </CCardFooter>
            }
          >
            <CIcon width={24} name="cil-reload" />
          </CWidgetIcon>
        </CCol>
        
        <CCol lg="12">
          <CWidgetIcon
            text="Dossiers en pause"
            header={dataStat.nbrSuivisEnPause}
            color="warning"
            iconPadding={false}
            footerSlot={
              <CCardFooter className="card-footer px-3 py-2">
                <CLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="#"
                >
                  Voir en detail
                  <CIcon
                    name="cil-arrow-right"
                    className="float-right"
                    width="16"
                  />
                </CLink>
              </CCardFooter>
            }
          >
            <CIcon width={24} name="cil-media-pause" />
          </CWidgetIcon>
        </CCol>
      </CRow> */}
    </>
  );
};

export default WidgetsIconAdmin;
