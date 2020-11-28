import React , { Component } from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import API from "../services/api"

const TheHeaderDropdownNotif = (props) => {

  const itemsCount = props.totalcasSoumis.totalNotif
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        {props.usercasSoumis.map((resultat)=>{
          return <CDropdownItem data-target={resultat._id} onClick={props.supprimer}><CIcon name="cil-user-follow" className="mr-2 text-success" />prenom:{resultat.prenom}|| nom:{resultat.nom}|| province:{resultat.provinces}</CDropdownItem>
        })}
      </CDropdownMenu>
    </CDropdown>
  )
}
class CasSoumisAdminNotif extends Component {
  state = { NombreTotal: [],usercasSoumis: [] };
  componentDidMount() {
    API.get(`notificationAdmin`)
    .then((resultats)=>{
      const datas=[]
      for (const element  of resultats.data.casSoumis) {

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
      this.setState({ NombreTotal: resultats.data,usercasSoumis: datas});
    })
  }
  supressionNotification=(e)=> {  
    e.preventDefault();
    console.log(e.target.dataset.target);
    const identifiant=e.target.dataset.target;
    API.delete(`notificationAdmin/${identifiant}`)
   .then((result)=>{  
    console.log(result.data)
    this.componentDidMount();   
    }).catch(erreur => console.log(erreur));  
  }
  render(){
    return(
      <TheHeaderDropdownNotif totalcasSoumis={this.state.NombreTotal} usercasSoumis={this.state.usercasSoumis} supprimer={this.supressionNotification} />
    )
  }
}
export default CasSoumisAdminNotif;