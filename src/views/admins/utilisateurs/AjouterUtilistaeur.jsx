import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "../../../scss/FormulaireAjouterActeur.scss"
import API from "../../../services/api";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class AjouterUtilisateur extends Component{

    state ={
        username:"",
        email:"",
        telephone:"",
        motDePasse:"",
        confirmerMotDePasse:"",
        role:"",
        id_ActeurStructure:"",
        provinces:[],
        structures:[],
        errorUsername: '',
        errorEmail:'',
        errorTelephone:'',
        errorMotDePasse:'',
        errorConfirmerMotDePasse:"",
        errorRole: '',
        errorActeurStructure:'',
        
    }
    componentDidMount(){
      
      API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data})
      })

      API.get("acteurStructure")
      .then(res=>{
          this.setState({structures : res.data})
      }) 
        
    }
   



changementUsername = e =>{
  this.setState({username:e.target.value})
  this.setState({errorUsername: ""})
}

changementEmail = e =>{
  this.setState({email:e.target.value})
  this.setState({errorEmail:""})
}

changementTelephone = e =>{
  this.setState({telephone:e.target.value})
  this.setState({errorTelephone:""})
}

changementMotDePasse = e =>{
  this.setState({motDePasse:e.target.value})
  this.setState({errorMotDePasse:""})
}

changementConfirmerMotDePasse = e =>{
  this.setState({confirmerMotDePasse:e.target.value})
  this.setState({errorConfirmerMotDePasse:""})
}

changementRole = e =>{
  this.setState({role:e.target.value})
}

changementStrtucture = e =>{
  this.setState({id_ActeurStructure:e.target.value})
}

handleSubmit = e => {
    e.preventDefault();

    let verificateur=true;;

    if(this.state.username==""){
      this.setState({errorUsername:"le username ne doit pas etre vide"})
      verificateur=false;
    }
    else if(this.state.username.length<3){
       this.setState({errorUsername:"le username doit avoir plus de 3 caractere"})
       verificateur=false;
    }

    if(this.state.email==""){
      this.setState({errorEmail:"l'email ne peut pas etre vide"})
      verificateur=false;
    }else if(!(this.state.email.lastIndexOf("@"))){
      this.setState({errorEmail:"Format email incorect"})
      verificateur=false;
    }
  

    if(this.state.telephone==""){
      this.setState({errorTelephone:"le téléphone ne peut pas etre vide"})
      verificateur=false;
    } else if(this.state.telephone.substr(0, 4) != "+243"){
      this.setState({errorTelephone:"le télephone doit commencer par +243"})
      verificateur=false
    } else if(this.state.telephone.length>13 || this.state.telephone.length<13){
      this.setState({errorTelephone:"Ce numero n'est pas valide"})
      verificateur=false
    }
  
    if(this.state.motDePasse==""){
      this.setState({errorMotDePasse:"le mot de passe ne peut pas etre vide"})
      verificateur=false;
    }  else if(this.state.motDePasse.length<5){
      this.setState({errorMotDePasse:"le mot de passe est trop court"})
      verificateur=false;
    }

    if(this.state.motDePasse !== this.state.confirmerMotDePasse){
      this.setState({errorConfirmerMotDePasse:"veuiller confirmer le meme mot de passe"})
      verificateur=false;
    }

    if(verificateur){
      const NewUtilistauer= {
        username: this.state.username,
        email: this.state.email,
        telephone: this.state.telephone, 
        password: this.state.motDePasse, 
        role_user: this.state.role,
        acteurStructures: this.state.id_ActeurStructure,
        
      }
        console.log(NewUtilistauer);
  
        API.post("user", NewUtilistauer)
      .then(res => {
        console.log(res);
        console.log(res.data);
        toast.success("enregistrement effectuer avec succes", toast.POSITION.TOP_RIGHT)
        this.props.history.push('/admin/acteurStructure/ListerUtilisateurs');
      })
        .catch((error)=> {
          toast.error(error.response.data.erreur, toast.POSITION.TOP_RIGHT);
          // alert(error.response.data.erreur)
        })
    }
}

  render(){
    return(
        <>
        
          <h1>Formulaire d'insertion d'utilistaeur</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col>
          <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Gilva" type="text"onChange={this.changementUsername} />
            <span>{this.state.errorUsername}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Label>Email</Form.Label>
            <Form.Control placeholder="jonkal38@gmail.com" type="text"onChange={this.changementEmail} />
            <span>{this.state.errorEmail}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Label>Telephone</Form.Label>
            <Form.Control placeholder="+243999999999" type="text"onChange={this.changementTelephone} />
            <span>{this.state.errorTelephone}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Label>Mot de passe</Form.Label>
            <Form.Control placeholder="Gilva@1234" type="text"onChange={this.changementMotDePasse} />
            <span>{this.state.errorMotDePasse}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Label>Confirmer mot de passe</Form.Label>
            <Form.Control placeholder="Gilva@1234" type="text"onChange={this.changementConfirmerMotDePasse} />
            <span>{this.state.errorConfirmerMotDePasse}</span>
          </Col>
        </Row>
        <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" onChange={this.changementRole} >
              <option value="User_Structure">User_Structure</option>
              <option value="Admin_Structure">Admin_Structure</option>
            </Form.Control>
          </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
        <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Structure d'Accompagnement et Acteur</Form.Label>
          <Form.Control as="select" onChange={this.changementStrtucture} >
          { this.state.structures.map(structure => <option key={structure._id} value={structure._id}>{structure.nom}</option>)}
          </Form.Control>
        </Form.Group>
    </Col>
  </Row>

<br />
    <Button type="submit" variant="primary" className="bouton_form" >Enregistrer</Button>
</Form>
        </div>
        </>
    ) 
   }
}


export default AjouterUtilisateur;