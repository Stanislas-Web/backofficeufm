import React, { Component } from "react";
import DataTable from 'react-data-table-component';
import SearchCasSoumis from "../../containers/searchCassoumis";
import ModalDetailCasSoumis from "../../containers/ModalDetailCasSoumis";
import API from "../../services/api";
import { Link } from 'react-router-dom';
  
class CasSoumisAdmin extends Component {
    state = { casSoumis: [],filtres:[] };
    componentDidMount() {
      API.get("casSoumis")
          .then((res) => {
            const datas=[]
          for (const element  of res.data) {

                  datas.push({
                      _id:element._id,
                      prenom : element.prenom,
                      nom : element.nom,
                      age : element.age,
                      sexe:element.sexe,
                      acteurStructures:element.acteurStructures.map((resultat)=>{
                        return resultat.nom
                      }),
                      provinces:element.provinces.map((resultat)=>{
                        return resultat.nom
                      })
                  });
          }
            this.setState({ casSoumis: datas});
            this.setState({ filtres: datas});
        })
          .catch((error)=>{console.log(error)})
      }
     recherche =((e)=>{
    
      const filtre= this.state.casSoumis.filter((res)=>{
        const prenom=res.prenom.toLowerCase();
       const value=(e.target.value).toLowerCase()
       return prenom.includes(value);
      })
      this.setState({ filtres: filtre});
     })

   columns = [
        {
          name: 'prenom',
          selector: 'prenom',
          sortable: true,
          width : "120px"
        }, 
        {
          name: 'nom',
          selector: 'nom',
          sortable: true,
          width : "150px"
        },
        {
          name: 'age',
          selector: 'age',
          sortable: true,
          width : "90px"
        },
        {
          name: 'sexe',
          selector: 'sexe',
          sortable: true,
          width : "120px"
        },
        {
          name: 'provinces',
          selector:'provinces',
          sortable: true,
          width : "150px"
        },
        {
          name: 'acteurStructures',
          selector: 'acteurStructures',
          sortable: true,
          width : "150px"
        },
        {
          sortable: false,
          cell: row => 
          <ModalDetailCasSoumis dataTarget={row._id}/>,
          
          width : "80px"
          
        }
        ,
        {
          sortable: false,
          cell: row => 
            <button type="button" class="btn btn-warning"><Link to={ '/admin/acteurStructure/AjouterVBG/'+row._id} style={{textDecoration:"none" , color:"white"}} >confirmer</Link></button>,
          
          width : "200px"
        }
      ];
  render() {
    return (
      <div className="table1">
        <SearchCasSoumis recherche={this.recherche} placehold="recherche par prenom..."/>
        <DataTable
        title="CasSoumisAdmin"
        columns={this.columns}
        data={this.recherche?this.state.filtres:this.state.casSoumis}
        pagination={true}
        defaultSortField="label"
        theme="boostrap"
        defaultSortField="type"
        button={true}
        subHeaderAlign="right"
      />
      </div>
      
    )
  }
};

export default CasSoumisAdmin