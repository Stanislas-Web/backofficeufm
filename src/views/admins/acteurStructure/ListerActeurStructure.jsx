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
  
    const [ActeurStructure, setActeurStructure] = useState([]);

  useEffect(() => {
    API.get('acteurStructure').then((res) => {
      setActeurStructure(res.data.map((item)=>{
        return  {
            id: item._id,
            nom : item.nom,
            type : item.type,
            description: item.description,
            itineraire: item.adresse.itineraire,
            numerosTelephone: item.contact.numerosTelephone,
            numerosWhatsapp: item.contact.numerosWhatsapp,
            email: item.contact.email
        }
      }));
    }).catch((erreur)=> {
      console.log(erreur);
  });
  }, []);

    function handleClick(e) {     API.get("acteurStructure/"+e).then((res) => {

      element = res.data.nom;
      console.log(element);
      
      if(window.confirm("voulez-vous vraiment supprimer l'acteur ou structure d'encompagnement " + element)) {
        console.log(element);
        API.delete("acteurStructure/"+e).then((res)=>{
          toast.success("suppresion effectuer avec succes", toast.POSITION.TOP_RIGHT)
          API.get('acteurStructure').then((res) => {
            setActeurStructure(res.data.map((item)=>{
              return  {
                  id: item._id,
                  nom : item.nom,
                  type : item.type,
                  description: item.description,
                  itineraire: item.adresse.itineraire,
                  numerosTelephone: item.contact.numerosTelephone,
                  numerosWhatsapp: item.contact.numerosWhatsapp,
                  email: item.contact.email
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
        name: 'Nom',
        selector: 'nom',
        sortable: true,
        width : "200px"
      }, 
      {
        name: 'Type',
        selector: 'type',
        sortable: true,
        width : "120px"
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
        width : "120px"
      },
      {
        name: 'Telephone',
        selector: 'numerosTelephone',
        sortable: true,
        width : "120px"
      },
      {
        name: 'Itineraire',
        selector: 'itineraire',
        sortable: true,
        width : "145px"
      },
      {
      cell: row => <div>
                    <button type="button" class="btn btn-info"><Link to={ '/admin/acteurStructure/Detail/'+ row.id} style={{textDecoration:"none" , color:"white"}}>Detail</Link></button>{' '}
                    <button type="button" class="btn btn-warning"><Link to={ '/admin/acteurStructure/modifierActeurStructure/'+ row.id} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}
                    <button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id)}>Supprimer</button>
                  </div>,
        width : "350px"
      },
    ];
    return (
      <div className>
        <DataTable
        title="Liste des Acteurs et Structures d'accompagnement"
        columns={columns}
        data={ActeurStructure}
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