import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "../../../scss/FormulaireAjouterActeur.scss"
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

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
    }

    componentDidMount(){
      
      API.get("emissions")
      .then(res=>{
          this.setState({emissions : res.data})
      })
      console.log(this.state.emissions);
      
        
    }
   
uploadImage = ()=>{


  const data = new FormData()
  data.append("file",this.state.photo)
  // data.append("upload_preset","ufm")
  // data.append("cloud_name","deb9kfhnx")
  data.append("upload_preset","Cartographie")
  data.append("cloud_name","dwgoa0xwn")
  
  // axios.post("https://api.cloudinary.com/v1_1/deb9kfhnx/image/upload",{data})


 fetch("https://api.cloudinary.com/v1_1/deb9kfhnx/image/upload",{
    method: "post",
    body:data
  }).then(res=> res.json())
  .then(data=>{
    this.setState({photo: data.url})

    // const NewActeur= {
    //   nom: this.state.nom,
    //   description: this.state.description,
    //   province: this.state.province, 
    //   img: this.state.url,
    //   adresse:
    //     {
    //       itineraire: this.state.itineraire,
    //       longitude: this.state.longitude,
    //       latitude: this.state.latitude
    //     },
    //     contact:{
    //       numerosTelephone: this.state.telephone,
    //       numerosWhatsapp: this.state.whatsapp,
    //       email: this.state.email
    //     },
    //     type: this.state.type,
    // }

    

      console.log(this.state.photo);
      
      // console.log(NewActeur);

  //   API.post("acteurStructure/", NewActeur)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     alert("Enregistrement reussi")
  //     toast.success("enregistrement effectuer avec succes", toast.POSITION.TOP_RIGHT)
  //     this.props.history.push('/admin/acteurStructure/ListerActeurStructure');
      
  //   }).catch((erreur)=> {
  //     console.log(erreur);
      
  //     this.setState({errorMessage: erreur.message});
  // });

    
  }).catch(error=> {
    console.log(error);
  }
  )
}



changementNomEmission = e =>{
  this.setState({nomEmission:e.target.value})
  this.setState({errorNomEmission: ""})
}

changementStreamUrl = e =>{
  this.setState({streamUrl:e.target.value})
  this.setState({errorStreamUrl: ""})
}
changementPhoto = e =>{
  this.setState({photo:e.target.value})
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
    console.log("bonjour");

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
        </div>
        </>
    ) 
   }
}


export default ModifierActeurStructure;