import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from "../../../services/api";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchVBG from "../../../containers/searchCassoumis";
import {Card, ListGroup, ListGroupItem, img, Body} from 'react-bootstrap';
 

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
      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/34581718_178191849493975_6454192594313281536_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeH6HESkirCzh3TcMH9bc_wMh1znLTuDX5WHXOctO4Nflcbx42eI2GyhHo4t8VNRYKTJE3HlwZsnWa2vtq42P6Wk&_nc_ohc=pBFClWZ60FoAX_5wsT-&_nc_ht=scontent-lhr8-1.xx&oh=c2d2b8a4b3516a1f0ba28be71f1e0efc&oe=5FE9105F" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>

  <Card.Body>
    <Card.Link href="#">Modifier</Card.Link>
    <Card.Link href="#">Supprimer</Card.Link>
  </Card.Body>
</Card>
      //   <div className="table1">
      //   <SearchVBG recherche={recherche} placehold="recherche par type..."/>
      //   <DataTable
      //   title="Liste des VBG"
      //   columns={columns}
      //   data={recherche?FiltreVBG:VBG}
      //   pagination={true}
      //   defaultSortField="label"
      //   theme="boostrap"
      //   defaultSortField="type"
      //   button={true}
      // />
      // </div>
    )
  };

export default ListerActeurStructure