import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import API from "../../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
toast.configure();

const donne =[1]
let element =0;

function ListerUtilisateurs() {
  
    const [Listertlisateur, setListertlisateur] = useState([]);

  useEffect(() => {
    API.get('user').then((res) => {
        console.log(res.data[0]._id);
        
      setListertlisateur(res.data.map((item)=>{
          
        return  {
            id: item._id,
            username : item.username,
            email : item.email,
            telephone: item.telephone,
            role: item.role_user,
            nomStructure: item.acteurStructures[0].nom
        }
      }));
    }).catch((erreur)=> {
      console.log(erreur);
  });
  }, []);


    function handleClick(e) {     API.get("user/"+e).then((res) => {

      element = res.data.username;
      console.log(element);
      
      if(window.confirm("voulez-vous vraiment supprimer l'utilisateur  " + element)) {
        console.log(element);
        API.delete("user/"+e).then((res)=>{
          toast.success("suppression effectuer avec succes", toast.POSITION.TOP_RIGHT)
          API.get('user').then((res) => {
            console.log(res.data[0]._id);
            
          setListertlisateur(res.data.map((item)=>{
              
            return  {
                id: item._id,
                username : item.username,
                email : item.email,
                telephone: item.telephone,
                role: item.role_user,
                nomStructure: item.acteurStructures[0].nom
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
        name: 'Username',
        selector: 'username',
        sortable: true,
        width : "100px"
      }, 
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
        width : "180px"
      },
      {
        name: 'Telephone',
        selector: 'telephone',
        sortable: true,
        width : "150px"
      },
      {
        name: 'Role',
        selector: 'role',
        sortable: true,
        width : "150px"
      },
      {
        name: 'Structure',
        selector: 'nomStructure',
        sortable: true,
        width : "200px"
      },
      {
      cell: row => <div>
                    <button type="button" class="btn btn-warning"><Link to={ '/admin/acteurStructure/ModifierUtilisateur/'+ row.id} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}
                    <button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id)}>Supprimer</button>
                  </div>,
        width : "210px"
      },
    ];
    return (
      <div className>
        <DataTable
        title="Liste des utilistateurs"
        columns={columns}
        data={Listertlisateur}
        pagination={true}
        defaultSortField="label"
        theme="boostrap"
        defaultSortField="type"
        button={true}
      />
      
      </div>
      
    )
  };

export default ListerUtilisateurs