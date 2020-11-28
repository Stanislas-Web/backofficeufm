import React, { Component } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import SearchCasSoumis from "../../containers/searchCassoumis";
import ModalDetailCasSoumis from "../../containers/ModalDetailCasSoumis"
import API from "../../services/api"
  
class CasSoumisActeur extends Component {
    state = { casSoumis: [],filtre:[] };
    componentDidMount() {
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

      API.get(`casSoumisbyActeur/${tab[0].acteurStructures}`)
      .then((res) => {
        console.log(res)
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
        this.setState({ filtre: datas});
    })
      .catch((error)=>{console.log(error)})
    }
  }
     recherche = (e) => (
       console.log(e.target.value)
      //   this.state.casSoumis.filter((resultat)=>{
      //   //  const castfiltre=resultat.toLowerCase();
      //   return resultat.provinces.toLowerCase().includes(e.target.value.toLowerCase());
      //  })
      //  this.setState({ filtre: filtrecas})
    // console.log(e.target.value)
    );

   columns = [
        {
          name: 'prenom',
          selector: 'prenom',
          sortable: true,
          width : "150px"
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
          width : "150px"
        },
        {
          name: 'sexe',
          selector: 'sexe',
          sortable: true,
          width : "150px"
        },
        {
          name: 'provinces',
          selector:'provinces',
          sortable: true,
          width : "150px"
        },
        {
          sortable: true,
          cell: (row) =><ModalDetailCasSoumis dataTarget={row._id}/>,
          width : "100px"
        },
        {
          sortable: false,
          cell: row => 
            <button type="button" class="btn btn-warning"><Link to={ '/structure/vbg/AjoutVBG/'+row._id} style={{textDecoration:"none" , color:"white"}} >confirmer</Link></button>,
          
          width : "200px"
        }
      ];
  render() {
    return (
      <div className="table1">
        <SearchCasSoumis recherche={this.recherche} placehold="recherche par prenom..."/>
        <DataTable
        title="Liste des CasSoumis"
        columns={this.columns}
        data={this.state.casSoumis}
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

export default CasSoumisActeur