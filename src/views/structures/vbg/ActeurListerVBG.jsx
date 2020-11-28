import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from "../../../services/api";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
toast.configure();

const donne =[1]


function ListerActeurStructure() {
  
    const [VBG, setVBG] = useState([]);

    const tab =[];
      if (localStorage.getItem("users") === null) {
        window.location.href = "#/login";
    }else{
       const users = JSON.parse(localStorage.getItem("users") || "[]");
      tab.push({
            id:users.user._id,
            nom:users.user.username,
            role:users.user.role_user,
            acteurStructures:users.user.acteurStructures[0]._id,
        }) 
        
      }


    useEffect(() => {
      API.get('suivisvbgbyActeur/'+ tab[0].acteurStructures).then((res) => {
         console.log(res.data);

         setVBG(res.data.map((item)=>{
          return  {
              id_vbg: item.vbg[0]._id,
              id_global: item._id,
              province : item.vbg[0].province[0].nom,
              dateViol : item.vbg[0].date.dateViol,
              dateSoumition: item.vbg[0].date.dateSoumition,
              type : item.vbg[0].type_violence,
              auteurViol : item.vbg[0].auteur_viol,
              trancheAgeVictime: item.vbg[0].tranche_age_victime,
              sexeVictime : item.vbg[0].sexe_victime
          }
        }));
         
         
      }).catch((erreur)=> {
        console.log(erreur);
    });
      
    }, []);

    function handleClick(e) {
      
      API.get("vbg/"+e).then((res) => {

      // let element = res.data.type_violence;
      console.log(e);
      
      if(window.confirm("Le vbg est vraiment resolut?")) {
        // console.log(element);
        API.delete("resolvedsuivisvbg/"+e).then((res)=>{
          toast.success("le vbg est maintenant considerer resolut", toast.POSITION.TOP_RIGHT)
          API.get('suivisvbgbyActeur/'+ tab[0].acteurStructures).then((res) => {
            console.log(res.data);
   
            setVBG(res.data.map((item)=>{
             return  {
                 id_vbg: item.vbg[0]._id,
                 id_global: item._id,
                 province : item.vbg[0].province[0].nom,
                 dateViol : item.vbg[0].date.dateViol,
                 dateSoumition: item.vbg[0].date.dateSoumition,
                 type : item.vbg[0].type_violence,
                 auteurViol : item.vbg[0].auteur_viol,
                 trancheAgeVictime: item.vbg[0].tranche_age_victime,
                 sexeVictime : item.vbg[0].sexe_victime
             }
           }));
            
            
         }).catch((erreur)=> {
           console.log(erreur);
       });
       }).catch((erreur)=> {
        console.log(erreur);
        });
       }

    });;
    };



    const columns = [
        {
          name: 'Type',
          selector: 'type',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Tranche d\'age',
          selector: 'trancheAgeVictime',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Sexe',
          selector: 'sexeVictime',
          sortable: true,
          width : "90px"
        },

        {
          name: 'Province',
          selector: 'province',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Auteur',
          selector: 'auteurViol',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Date Soumition',
          selector: 'dateSoumition',
          sortable: true,
          width : "120px"
        },
        {
          name: 'Date du viol',
          selector: 'dateViol',
          sortable: true,
          width : "120px"
        },
        {
          sortable: false,
          cell: row => 
          <div>
            <div><button type="button" class="btn btn-info"><Link to={ '/structure/vbg/ActeurModifierVbg/'+ row.id_vbg} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}<button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id_global)}>Resolu</button></div>
          </div>,
          width : "auto"
        }
      ];
    return (
        <div className="table1">
        <DataTable
        title="Liste des VBG"
        columns={columns}
        data={VBG}
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
// jonkal10@Jkm,