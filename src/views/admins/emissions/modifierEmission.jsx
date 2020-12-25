import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss"
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
        errorDate:"",
        errorTypeViolence:"",
        errorTrancheAge:"",
        errorSexe:"",
        errorProvince:"",
        errorAuteur:"",
        prov:"",
        dateViol: new Date("2014/02/08"),
        dateSoumition:""
    
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
   

    changementType = e =>(this.setState({type:e.target.value}))

    changementDate = e =>(this.setState({dateViol:e.target.value}))
    
    changementProvince = e =>(this.setState({province:e.target.value}))
    
    changementTrancheAge = e =>(this.setState({trancheAge:e.target.value}))
    
    changementSexe = e =>(this.setState({sexe:e.target.value}))
    
    changementAuteur = e =>(this.setState({auteur:e.target.value}))

    handleChange = date => {
      this.setState({
        dateViol: date
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
      this.props.history.push('/admin/acteurStructure/ListerVbg');
      
    }).catch((erreur)=> {
      console.log(erreur);
      
      this.setState({errorMessage: erreur.message});
      this.setState({errorType:erreur.message})
  });
}

  render(){
    return(
        <>
          <h1>Formulaire de modification de l'Emission</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>



<Row>
  <Col>
  <Form.Label>Nom Emission</Form.Label>
    <Form.Control placeholder="Ex : U Matinale" type="text"onChange={this.changementNom} />
    <span>{this.state.errorNom}</span>
  </Col>
  <Col>
  <Form.Label>Type Emission</Form.Label>
    <Form.Control placeholder="Ex : Culture" type="text"onChange={this.changementNom} />
    <span>{this.state.errorNom}</span>
  </Col>

</Row>

<br/>
<Row>
  <Col>
  <Form.Label>Présenté par </Form.Label>
    <Form.Control placeholder="Ex : Carine MUTAHAlI" type="text"onChange={this.changementNom} />
    <span>{this.state.errorNom}</span>
  </Col>

</Row>

<br/>

<Row>
  <Col>
  <Form.Label className="labelFile" for="filePhotoEmission">Choisir une photo pour l'emission</Form.Label>
    <Form.Control id="filePhotoEmission" placeholder="First name" className="file" type="file" onChange={this.changementImage} />
    <span>{this.state.errorImage}</span>
  </Col>
  <Col>
  <Form.Label className="labelFile" for="filePhotoJournaliste">Choisir la photo du journaliste</Form.Label>
    <Form.Control id="filePhotoJournaliste" placeholder="First name" className="file" type="file" onChange={this.changementImage} />
    <span>{this.state.errorImage}</span>
  </Col>
</Row>

<br/>
<Row>
<Col>
  <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" onChange={this.changementDescription} >
          </Form.Control>
        </Form.Group>
        <span>{this.state.errorDescription}</span>
  </Col>
</Row>













<Button type="submit" variant="primary" className="bouton_form" style={{backgroundColor:"#303C50",}} >Enregistrer</Button>
</Form>
        </div>
        </>
    ) 
   }
}


export default ModifierVbg;





































