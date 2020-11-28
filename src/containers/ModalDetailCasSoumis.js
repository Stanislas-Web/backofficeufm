import React, { useState,useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import API from "../services/api"

const ModalDetailCasSoumis = (props) => {

  const [info, setInfo] = useState(false)
  const [casSoumisdetail, setcasSoumisdetail] = useState([]);

  const voirDetailCasSoumis=((e)=> {  
      e.preventDefault();
      console.log(props.dataTarget);
      const identifiant=e.target.dataset.target;

     API.get(`casSoumis/${identifiant}`)
     .then((result)=>{  
      const datas={
        prenom:result.data.prenom,
        nom :result.data.prenom,
        age :result.data.age,
        sexe:result.data.sexe,
        acteurStructures:result.data.acteurStructures.map((resultat)=>{
          return resultat.nom
        }),
        provinces:result.data.provinces.map((resultat)=>{
          return resultat.nom
        }),
        numerosTelephone:result.data.numerosTelephone,
        email:result.data.email
      };

      setcasSoumisdetail(datas);  
    
      }).catch(erreur => console.log(erreur));  
    })
  return (
    <CRow>
          <CButton color="info" data-target={props.dataTarget}  onClick={(e) => {setInfo(!info);voirDetailCasSoumis(e)}} className="mr-1">Detail</CButton>
            <CModal 
              show={info} 
              onClose={() => setInfo(!info)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Details d'un casSoumis</CModalTitle>
              </CModalHeader>
              <CModalBody>
               <div>
                  Prenom:<strong>{casSoumisdetail.prenom}</strong><br/>
                  Nom:<strong>{casSoumisdetail.nom}</strong><br/>
                  Age:<strong>{casSoumisdetail.age}</strong><br/>
                  Sexe:<strong>{casSoumisdetail.sexe}</strong><br/>
                  ActeurStructures:<strong>{casSoumisdetail.acteurStructures}</strong><br/>
                  Provinces:<strong>{casSoumisdetail.provinces}</strong><br/>
                  NumerosTelephone:<strong>{casSoumisdetail.numerosTelephone}</strong><br/>
                  Email:<strong>{casSoumisdetail.email}</strong><br/>
               </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="info" onClick={() => setInfo(!info)}>ok</CButton>{' '}
              </CModalFooter>
            </CModal>
    </CRow>
  )
}
  
export default ModalDetailCasSoumis;
  