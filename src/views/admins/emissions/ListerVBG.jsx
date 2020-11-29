import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from "../../../services/api";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchVBG from "../../../containers/searchCassoumis";
 

toast.configure();
const donne =[1]
let element =0;

function ListerActeurStructure() {
  
    const [VBG, setVBG] = useState([]);
    const [FiltreVBG, setFiltreVBG] = useState([]);
    const donnees=[];
   
    

    useEffect(() => {
      console.log('USE EFFECT');
      API.get('vbg').then((res) => {
        res.data.map((item)=>{
          donnees.push(
            {
              id: item._id,
              province : item.province[0].nom,
              dateViol : item.date.dateViol,
              dateSoumition: item.date.dateSoumition,
              type : item.type_violence,
              auteurViol : item.auteur_viol,
              trancheAgeVictime: item.tranche_age_victime,
              sexeVictime : item.sexe_victime
          }
          )  
        });
        setVBG(donnees);
        setFiltreVBG(donnees)
      }).catch((erreur)=> {
        console.log(erreur);
    });
      
    }, []);

    // const handleClearRows = () => {
    //   setToggledClearRows(!this.state.toggledClearRows)
    // }

    function recherche (e){
    
      const filtre= VBG.filter((res)=>{
        const type=res.type.toLowerCase();
       const value=(e.target.value).toLowerCase()
       return type.includes(value);
      })
      setFiltreVBG(filtre);
     }

    function handleClick(e) {
      
      API.get("vbg/"+e).then((res) => {

      element = res.data.type_violence;
      console.log(e);
      
      if(window.confirm("voulez-vous vraiment supprimer le vbg " + element)) {
        console.log(element);
        API.delete("vbg/"+e).then((res)=>{
          API.get('vbg').then((res) => {
            res.data.map((item)=>{
              donnees.push(
                {
                  id: item._id,
                  province : item.province[0].nom,
                  dateViol : item.date.dateViol,
                  dateSoumition: item.date.dateSoumition,
                  type : item.type_violence,
                  auteurViol : item.auteur_viol,
                  trancheAgeVictime: item.tranche_age_victime,
                  sexeVictime : item.sexe_victime
              }
              )  
            });
            setVBG(donnees);
            setFiltreVBG(donnees)
          }).catch((erreur)=> {
            console.log(erreur);
        });
          toast.success("Suppresion effectuer avec succes", toast.POSITION.TOP_RIGHT)
       }).catch((erreur)=> {
        console.log(erreur);
        });
       }

    });;
    };



    const columns = [
        {
          name: 'type',
          selector: 'type',
          sortable: true,
          width : "100px"
        },
        {
          name: 'tranche d\'age',
          selector: 'trancheAgeVictime',
          sortable: true,
          width : "90px"
        },
        {
          name: 'sexe',
          selector: 'sexeVictime',
          sortable: true,
          width : "90px"
        },
        {
          name: 'province',
          selector: 'province',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Type d\'Auteur',
          selector: 'auteurViol',
          sortable: true,
          width : "120px"
        },
        {
          name: 'date Soumition',
          selector: 'dateSoumition',
          sortable: true,
          width : "130px"
        },
        {
          name: 'date du viol',
          selector: 'dateViol',
          sortable: true,
          width : "120px"
        },
        {
          sortable: false,
          cell: row => 
          <div>
            <div><button type="button" class="btn btn-info"><Link to={ '/admin/acteurStructure/modifierVbg/'+ row.id} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}
            <button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id)}>Supprimer</button></div>
          </div>,
          width : "auto"
        }
      ];
    return (
        <div className="table1">
        <SearchVBG recherche={recherche} placehold="recherche par type..."/>
        <DataTable
        title="Liste des VBG"
        columns={columns}
        data={recherche?FiltreVBG:VBG}
        pagination={true}
        defaultSortField="label"
        theme="boostrap"
        defaultSortField="type"
        button={true}
      />
      </div>
    )
  };

export default ListerActeurStructure