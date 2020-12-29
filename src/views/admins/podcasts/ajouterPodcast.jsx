import React, { Component } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import "../../../scss/FormulaireAjouterActeur.scss"
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {storage} from '../../../config/firebase';

toast.configure();

class ModifierActeurStructure extends Component{

    state ={
        nomEmission:"",
        streamUrl:"",
        duree:"",
        photo:"",
        description:"",
        emissions: [],
        errorNomEmission: "",
        errorStreamUrl:"",
        errorDuree:"",
        errorPhoto:"",
        errorDescription:"",
        visibility: false
    }

    componentDidMount(){
      
      API.get("emissions")
      .then(res=>{
          this.setState({emissions : res.data})
      })
      console.log(this.state.emissions);
      
        
    }
   
uploadImage = ()=>{
  toast.info("Veuillez patienter", toast.POSITION.TOP_RIGHT)
  this.setState({visibility:true});
  const uploadTask = storage.ref(`images/${this.state.photo.name}`).put(this.state.photo);
  uploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    ()=>{
      storage
        .ref("images")
        .child(this.state.photo.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({photo:url})
        });
    }

  )

  const uploadPodcast = storage.ref(`audios/${this.state.streamUrl.name}`).put(this.state.streamUrl);
  uploadPodcast.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    ()=>{
      storage
        .ref("audios")
        .child(this.state.streamUrl.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({streamUrl:url})
          const newPodcast = {
            "nomEmission": this.state.nomEmission,
            "streamUrl": this.state.streamUrl,
            "photo": this.state.photo,
            "description": this.state.description,
            "duree": this.state.duree,
          }
        
            API.post('podcasts', newPodcast)
            .then(res => {
              console.log(res);
              console.log(res.data);
              this.props.history.push('/admin/listerpodcast');
              window.location.reload();
              
            }).catch((erreur)=> {
              console.log(erreur);
              
              this.setState({errorMessage: erreur.message});
          });
            
        });


    }

  )






}



changementNomEmission = e =>{
  this.setState({nomEmission:e.target.value})
  this.setState({errorNomEmission: ""})
}

changementStreamUrl = e =>{
  this.setState({streamUrl:e.target.files[0]})
  this.setState({errorStreamUrl: ""})
}
changementPhoto = e =>{
  this.setState({photo:e.target.files[0]})
  this.setState({errorPhoto: ""})
}

changementDuree = e =>{
  this.setState({duree:e.target.value})
  this.setState({errorDuree: ""})
}

changementDescription = e =>{
  this.setState({description:e.target.value})
  this.setState({errorDescription: ""})
}
 

handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.photo);

    let verificateur=true;
    
    if(this.state.nomEmission==""){
      this.setState({errorNomEmission:"Veuillez selectionner une option"})
      verificateur=false
    }
  
    
    if(this.state.duree==""){
      this.setState({errorDuree:"Ce champ ne peut pas etre vide"})
      verificateur=false
    } 
  
    if(this.state.streamUrl==""){
      this.setState({errorStreamUrl:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }  
  
    if(this.state.photo==""){
      this.setState({errorPhoto:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }

  
    
    if(this.state.description==""){
      this.setState({errorDescription:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }


    if(verificateur){
      this.uploadImage();
    }
}

  render(){
    return(
        <>
        
          <h1>Ajouter un Podcast</h1>
        <div className="container_form">
          {this.state.visibility == false?
                      <Form onSubmit={this.handleSubmit}>


                      <Row>
                      <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Nom Emission</Form.Label>
                                <Form.Control as="select" onChange={this.changementNomEmission} >
                                { this.state.emissions.map(emission => <option key={emission.id} value={emission.nom}>{emission.nom}</option>)}
                                </Form.Control>
                                <span>{this.state.errorNomEmission}</span>
                              </Form.Group>
                        </Col>
                        <Col>
                        <Form.Label>Durée (minutes)</Form.Label>
                          <Form.Control placeholder="Ex: 30" type="number"onChange={this.changementDuree} />
                          <span>{this.state.errorDuree}</span>
                        </Col>
              
                      </Row>
              
                      <br/>
              
                      <Row>
                      <Col>
                        <Form.Label for="fileAudio" className="labelFile" >Choisir un fichier Audio Mp3</Form.Label>
                          <Form.Control id="fileAudio" className="file" placeholder="First name" type="file" onChange={this.changementStreamUrl} />
                          < span>{this.state.errorStreamUrl}</span>
                  </Col>
                  <Col>
                  <Form.Label className="labelFile" for="filePhotoPodcast">Choisir la photo du podcast</Form.Label>
                    <Form.Control placeholder="First name"  id="filePhotoPodcast" className="file"  type="file" onChange={this.changementPhoto} />
                    <span>{this.state.errorPhoto}</span>
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
                
              
               
              <br/>
                  <Button type="submit" variant="primary" className="bouton_form" style={{backgroundColor:"#303C50",}}>Enregistrer</Button>
              </Form>
          :
              <div style={{padding:"50px 0"}} className="text-center"><Spinner animation="border" variant="primary" /></div>
          }

        </div>
        </>
    ) 
   }
}


export default ModifierActeurStructure;