import React,{Component} from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import API from "../../../services/api";
 
import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss"
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class AjouterActeurStructure extends Component{
  
  state ={
    type :"",
    startDate:"",
    trancheAge:"",
    sexe:"",
    auteur:"",
    provinces:[],
    province:"",
    provinceUnique:"",
    prov:[],
    errorMessage: '',
    typeAuteur:[],
    typeTrancheAge:[],
    typeViolence:[],
    errorDate:"",
    errorTypeViolence:"",
    errorTrancheAge:"",
    errorSexe:"",
    errorProvince:"",
    errorAuteur:"",

    startDate: new Date()

}
    componentDidMount(){
      const dat = this.props.match.params.id;
      console.log(dat);
      
      if(!(dat.length<7)){
        API.get('casSoumis/'+dat).then((res)=>{
          console.log(res.data.provinces[0]._id)
          this.setState({
              type:res.data.type_viol,
              province: res.data.provinces[0]._id,
              sexe: res.data.sexe,
          })
      })
      }
      
    API.get("provinces")
    .then(res=>{
        this.setState({provinces : res.data});
        this.setState({provinceUnique: res.data.map(p=>{
          if(p._id==this.state.province){
            this.setState({prov:p})
          }
        })})
        
    })

      API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data})
      })

      API.get("globalvbg")
      .then(res=>{
          this.setState({typeAuteur: res.data.auteur_viol}) 
          this.setState({typeTrancheAge: res.data.tranche_age_victime}) 
          this.setState({typeViolence: res.data.type_violences})
      })


    }


changementType = e => {
  this.setState({type:e.target.value})
  this.setState({errorTypeViolence:""})
}

changementDate = e =>{
  this.setState({dateViol:e.target.value})
  this.setState({errorDate:""})
}

changementProvince = e =>{
  this.setState({province:e.target.value})
  this.setState({errorDate:""})
}

changementTrancheAge = e =>{
  this.setState({trancheAge:e.target.value})
  this.setState({errorTrancheAge:""})
}

changementSexe = e =>{
  this.setState({sexe:e.target.value})
  this.setState({errorSexe:""})
}

changementAuteur = e =>{
  this.setState({auteur:e.target.value})
  this.setState({errorAuteur:""})
}

handleChange = date => {
  this.setState({
    startDate: date
  });
};

handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.type);
    
    if(this.state.type == "" || this.state.type == undefined){
      this.setState({errorTypeViolence:"veuillez selectionner"})
    }

    if(this.state.sexe == "" || this.state.sexe == undefined){
      this.setState({errorSexe:"veuillez selectionner"})
    }

    if(this.state.trancheAge == "" || this.state.trancheAge == undefined){
      this.setState({errorTrancheAge:"veuillez selectionner"})
    }

    if(this.state.auteur == "" || this.state.auteur == undefined){
      this.setState({errorAuteur:"veuillez selectionner"})
    }

    if(this.state.dateViol == "" || this.state.dateViol == undefined){
      this.setState({errorDate:"veuillez selectionner"})
    }

    if(this.state.province == "" || this.state.province == undefined){
      this.setState({errorProvince:"veuillez selectionner"})
    }

    const identifiant=this.props.match.params.id;
    const newVbg ={
      province: 
      {
      _id: this.state.province
      },
      type_violence: this.state.type,
      sexe_victime: this.state.sexe,
      auteur_viol: this.state.auteur,
      date:{
        dateViol: this.state.startDate
      },
      tranche_age_victime: this.state.trancheAge

      }

      

      console.log(newVbg);
      

      API.post("vbg/", newVbg )
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("VBG Enregistré avec succé")
        toast.success("enregistrement effectuer avec succes", toast.POSITION.TOP_RIGHT)
        API.delete(`casSoumisresolved/${identifiant}`)
          .then((res)=>{
            console.log(res);
            
          }).catch((erreur)=>{
            console.log(erreur);
          })
        this.props.history.push('/admin/acteurStructure/ListerVbg');
      }).catch((erreur)=> {
      console.log(erreur.response.data);
   
      this.setState({errorMessage: erreur.message});
      console.log(this.state.errorMessage); 
  });
  
}



  render(){
    return(
        <>
        
          <h1>Formulaire d'insertions des VBG</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>
  <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Type de violence</Form.Label>
            <Form.Control as="select" onChange={this.changementType}>
            <option value={this.state.type}>{this.state.type}</option>
            { this.state.typeViolence.map(viol => <option key={viol} value={viol}>{viol}</option>)}
            </Form.Control>
            <span>{this.state.errorTypeViolence}</span>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1" onChange={this.changementSexe}>
            <Form.Label>Sexe</Form.Label>
            <Form.Control as="select">
              <option value={this.state.sexe}>{this.state.sexe}</option>
              <option  value="Feminin">Feminin</option>
              <option value="Masculin">Masculin</option>
            </Form.Control>
            <span> {this.state.errorSexe} </span>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Tranche d'age du victime</Form.Label>
            <Form.Control as="select" onChange={this.changementTrancheAge}>
            { this.state.typeTrancheAge.map(tranche => <option key={tranche} value={tranche}>{tranche}</option>)}
            </Form.Control>
            <span> {this.state.errorTrancheAge} </span>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Auteur</Form.Label>
        <Form.Control as="select" onChange={this.changementAuteur}>
        { this.state.typeAuteur.map(auteur => <option key={auteur} value={auteur}>{auteur}</option>)}
        </Form.Control>
        <span> {this.state.errorAuteur} </span>
      </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Label>Date du viole</Form.Label> <br/>
    
    <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat="yyyy-MM-dd"
        className="date"
      />
      <span> {this.state.errorDate} </span>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Province</Form.Label>
            <Form.Control as="select" onChange={this.changementProvince}>
            <option value={this.state.prov._id} key={this.state.prov._id} selected disabled hidden> {this.state.prov.nom} </option>
    { this.state.provinces.map(province => <option key={province._id} value={province._id}>{province.nom}</option>)}
            </Form.Control>
            <span> {this.state.errorProvince} </span>
          </Form.Group>
    </Col>
    </Row>
    <Button type="submit" variant="primary" className="bouton_form" >Enregistrer</Button>
</Form>
        
        </div>
        </>
    ) 
   }
}
export default withRouter(AjouterActeurStructure);