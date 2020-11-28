import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "../../../scss/FormulaireAjouterActeur.scss"
 
import "react-datepicker/dist/react-datepicker.css";
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class ModifierVbg extends Component{

    state ={
        type :"",
        trancheAge:"",
        sexe:"",
        auteur:"",
        province:"",
        provinces:[],
        typeAuteur:[],
        typeTrancheAge:[],
        typeViolence:[],
        provinceUnique:"",
        errorMessage: '',
        errorType: "",
        prov:"",
        dateViol: new Date("2014/02/08"),
        dateSoumition:"",
        errorDate:"",
        errorTypeViolence:"",
        errorTrancheAge:"",
        errorSexe:"",
        errorProvince:"",
        errorAuteur:"",
    
    }

    componentDidMount(){

        console.log(this.props.match.params.id);
        const dat = this.props.match.params.id;

        this.setState({
            id:dat
        })

        API.get('vbg/'+dat).then((res)=>{
            this.setState({
                type:res.data.type_violence,
                province: res.data.province[0]._id,
                trancheAge: res.data.tranche_age_victime,
                sexe: res.data.sexe_victime,
                auteur:res.data.auteur_viol,
                dateViol: new Date(res.data.date.dateViol),
                dateSoumition: res.data.date.dateSoumition
            })
            console.log(this.state.province);
        })
        
       API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data});
          this.setState({provinceUnique: res.data.map(p=>{
            if(p._id==this.state.province){
              this.setState({prov:p})
            }
          })})
          console.log(this.state.prov);
          
      })

      API.get("globalvbg")
      .then(res=>{
          this.setState({typeAuteur: res.data.auteur_viol}) 
          this.setState({typeTrancheAge: res.data.tranche_age_victime}) 
          this.setState({typeViolence: res.data.type_violences}) 
          console.log(this.state.typeTrancheAge);
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
        dateViol: date
      });
    };

handleSubmit = e => {
    e.preventDefault();
    
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
    
    const elem = this.props.match.params.id;

    const newVbg ={
        province: 
        {
        _id: this.state.province
        },
        type_violence: this.state.type,
        sexe_victime: this.state.sexe,
        auteur_viol: this.state.auteur,
        tranche_age_victime	: this.state.trancheAge,
        date:{
          dateViol: this.state.dateViol,
          dateSoumition: this.state.dateSoumition
        }
  
        }

      console.log(newVbg);
      

    API.put("vbg/"+elem, newVbg)
    .then(res => {
      console.log(res);
      console.log(res.data);
      toast.success("Modification effectuer avec succes", toast.POSITION.TOP_RIGHT)
      this.props.history.push('/structure/vbg/ActeurListerVBG');
      
    }).catch((erreur)=> {
      console.log(erreur);
      
      this.setState({errorMessage: erreur.message});
      this.setState({errorType:erreur.message})
  });
}

  render(){
    return(
        <>
          <h1>Formulaire de modification VGB</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>
  <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Type de violence</Form.Label>
            <Form.Control as="select" onChange={this.changementType}>
            <option value={this.state.type} selected disabled >{this.state.type}</option>
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
              <option value="" selected disabled > {this.state.sexe} </option>
              <option  value="Feminin">Feminin</option>
              <option value="Masculin">Masculin</option>
            </Form.Control>
            <span>{this.state.errorSexe}</span>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Tranche d'age du victime</Form.Label>
            <Form.Control as="select" onChange={this.changementTrancheAge}>
              <option value="" selected disabled> {this.state.trancheAge} </option>
              { this.state.typeTrancheAge.map(tranche => <option key={tranche} value={tranche}>{tranche}</option>)}
            </Form.Control>
            <span>{this.state.errorTrancheAge}</span>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Auteur</Form.Label>
        <Form.Control as="select" onChange={this.changementTrancheAge}>
          <option value="" selected disabled> {this.state.auteur} </option>
          { this.state.typeAuteur.map(auteur => <option key={auteur} value={auteur}>{auteur}</option>)}
        </Form.Control>
        <span>{this.state.errorAuteur}</span>
      </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Label>Date</Form.Label> <br/>
    <DatePicker
        selected={this.state.dateViol}
        onChange={this.handleChange}
        dateFormat="yyyy-MM-dd"
        className = "date"
      />
    <span>{this.state.errorDate}</span>
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
            <span>{this.state.errorProvince}</span>
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


export default ModifierVbg;