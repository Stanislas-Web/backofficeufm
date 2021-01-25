import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import API from "../../../services/api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
toast.configure();

const donne =[1]
let element =0;

function ListerActeurStructure() {
  
    const [podcast, setPodcast] = useState([]);

    useEffect(() => {
    
      API.get('podcasts').then((res) => {
        setPodcast(res.data);
      }).catch((erreur)=> {
        console.log(erreur);
    });
      
    }, []);

    function handleClick(e) {     
      console.log(e);
      API.get("podcasts/"+e).then((res) => {

      element = res.data.nom;
      console.log(element);
      
      if(window.confirm("voulez-vous vraiment supprimer l'acteur ou structure d'encompagnement " + element)) {
        console.log(element);
        API.delete("podcasts/"+e).then((res)=>{
          toast.success("suppresion effectuer avec succes", toast.POSITION.TOP_RIGHT)
          API.get('podcasts').then((res) => {
            setPodcast(res.data);
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
        name: "Nom de l'emission",
        selector: 'nomEmission',
        sortable: true,
        width : "150px"
      },
      {
        name: 'Lien du Stream',
        selector: 'streamUrl',
        sortable: true,
        width : "200px"
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
        width : "200px"
      },
      {
        name: 'Durée (minutes)',
        selector: 'duree',
        sortable: true,
        width : "200px"
      },

      {
      cell: row => <div>
                   
                    <button type="button" class="btn btn-warning"><Link to={ '/admin/acteurStructure/modifierActeurStructure/'+ row.id} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}
                    <button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id)}>Supprimer</button>
                  </div>,
        width : "350px"
      },
    ];
    return (
      <div className>
        <DataTable
        columns={columns}
        data={podcast}
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