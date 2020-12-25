import React, { useState, useEffect, lazy } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CSelect,
  CInput,
  CButton,
} from "@coreui/react";
import AmcharBar from "../../../components/amCharts/AmchartBar";
import AmchartPie from "../../../components/amCharts/AmchartPie";
import API from "../../../services/api";
import {
  groupeByAttribut,
  formatVbg,
  filtrerByPeriode
} from "../../../services/helpers/api.data.helper";

const WidgetsStatGlobal = lazy(() =>
  import("../../../components/widgets/WidgetsStatGlobal")
);
const Charts = () => {
  let [dataGraph, setDataGraph] = useState([]);

  const [dataVbg, setDataVbg] = useState([]);
  const [dataVbgFilter, setDataVbgFilter] = useState([]);
  const [periode1, setPeriode1] = useState("");
  const [periode2, setPeriode2] = useState("");
  const [errorPeriode1, setErrorPeriode1] = useState("");
  const [errorPeriode2, setErrorPeriode2] = useState("");

  useEffect(() => {
    (async function () {
      const res = await API.get("vbg").then((res) => res.data);
      setDataVbg(res);
      setDataVbgFilter(res);
    })();

  }, []);

  const filtrer = ()=>{
    let verificateur = true;

    // Recuperer periode1 & periode2 qui sont les dates que l'utilisateur doit entré dans les inputs du formulaire
    // console.log(periode1, periode2);
    if(periode1==""){
      setErrorPeriode1("Entré la bonne date")
      verificateur=false;
    }
    if(periode2==""){
      setErrorPeriode2("Entré la bonne date")
      verificateur=false;
    }
    if(verificateur){
      setDataVbgFilter(filtrerByPeriode(dataVbg,periode1,periode2))
    }
    
  }
  return (
    <>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardBody>
              {/* <FilterInputVbg /> */}
              <CContainer fluid>
                <CRow>
                  <CCol sm="12">
                    <CForm action="#">
                      <CRow>
                        <CCol sm="5">
                          <CInput
                            type="date"
                            id="perioode_1"
                            name="perioode_1 "
                            placeholder="date"
                            onChange={(e)=>{setPeriode1(e.target.value); setErrorPeriode1("")}}
                          />
                          <span style={{color:"red"}}>{errorPeriode1}</span>
                        </CCol>
                        <CCol sm="5">
                          <CInput
                            type="date"
                            id="perioode_2"
                            name="perioode_2 "
                            placeholder="date"
                            onChange={(e)=>{setPeriode2(e.target.value); setErrorPeriode2("")}}
                          />
                          <span style={{color:"red"}}>{errorPeriode2}</span>
                        </CCol>
                        <CCol sm="2">
                          <CButton
                            variant="primary"
                            // type="submit"
                            className="btn btn-primary btn-block"
                            onClick={filtrer}
                            
                          >
                            Valider
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <WidgetsStatGlobal /> */}
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Types des violences</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "type_violence"
                        )}
                        tagName="graph_type_violence_bar"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "type_violence"
                        )}
                        tagName="graph_type_violence_pie"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Tranche d'age</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "tranche_age_victime"
                        )}
                        tagName="graph_tranche_age_bar"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "tranche_age_victime"
                        )}
                        tagName="graph_tranche_age_pie"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Auteurs des viols</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "auteur_viol"
                        )}
                        tagName="graph_auteur_viol_bar"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={groupeByAttribut(
                          formatVbg(dataVbgFilter),
                          "auteur_viol"
                        )}
                        tagName="graph_auteur_viol_pie"
                        noLabel={true}
                        viewLegend={true}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Charts;
