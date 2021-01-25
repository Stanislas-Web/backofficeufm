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
      nom:"",
      type :"",
      journaliste:"",
      imageEmission:"",
      imageJournaliste:"",
      description:"",
      errorNom:"",
      errorType:"",
      errorJournaliste:"",
      errorImageEmission:"",
      errorImageJournaliste:"",
      errorDescription:"",
      visibility: false,
      emissions: []
    
    }

    componentDidMount(){

        console.log(this.props.match.params.id);
        const dat = this.props.match.params.id;

        this.setState({
            id:dat
        })

        API.get('emissions/'+dat).then((res)=>{
      
            console.log(res.data);
            this.setState({emissions : res.data});
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
          <h1>Modifier une Emission</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>



<Row>
  <Col>
  <Form.Label>Nom Emission</Form.Label>
    <Form.Control placeholder="Ex : U Matinale" type="text"onChange={this.changementNom} value={this.state.emissions.nom} />
    <span>{this.state.errorNom}</span>
  </Col>
  <Col>
  <Form.Label>Type Emission</Form.Label>
    <Form.Control placeholder="Ex : Culture" type="text"onChange={this.changementNom} value={this.state.emissions.type}/>
    <span>{this.state.errorNom}</span>
  </Col>

</Row>

<br/>
<Row>
  <Col>
  <Form.Label>Présenté par </Form.Label>
    <Form.Control placeholder="Ex : Carine MUTAHAlI" type="text"onChange={this.changementNom} value={this.state.emissions.journaliste} />
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
          <Form.Control as="textarea" onChange={this.changementDescription} value={this.state.emissions.nom} >
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





































