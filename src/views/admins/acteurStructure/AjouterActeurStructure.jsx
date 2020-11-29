import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "../../../scss/FormulaireAjouterActeur.scss"
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class ModifierActeurStructure extends Component{

    state ={
        nom:"",
        type:"",
        telephone:"",
        whatsapp:"",
        email:"",
        province:"",
        description:"",
        itineraire:"",
        image:"",
        url: "",
        longitude:"",
        latitude:"",
        provinces:[],
        prov:"",
        errorMessage: '',
        errorNom: '',
        errorType:'',
        errorTelephone:'',
        errorWhatsapp:'',
        errorEmail: '',
        errorDescription:'',
        errorItineraire:'',
        errorImage:'',
        errorLatitude:'',
        errorLongitude:''
    }
    componentDidMount(){
      
      API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data})
      })
      console.log(this.state.provinces);
      
        
    }
   
uploadImage = ()=>{


  const data = new FormData()
  data.append("file",this.state.image)
  data.append("upload_preset","Cartographie")
  data.append("cloud_name","dwgoa0xwn")

 fetch("https://api.cloudinary.com/v1_1/dwgoa0xwn/image/upload",{
    method: "post",
    body:data
  }).then(res=> res.json())
  .then(data=>{
    this.setState({url: data.url})
    const NewActeur= {
      nom: this.state.nom,
      description: this.state.description,
      province: this.state.province, 
      img: this.state.url,
      adresse:
        {
          itineraire: this.state.itineraire,
          longitude: this.state.longitude,
          latitude: this.state.latitude
        },
        contact:{
          numerosTelephone: this.state.telephone,
          numerosWhatsapp: this.state.whatsapp,
          email: this.state.email
        },
        type: this.state.type,
    }

    

      console.log(this.state.image);
      
      console.log(NewActeur);

    API.post("acteurStructure/", NewActeur)
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Enregistrement reussi")
      toast.success("enregistrement effectuer avec succes", toast.POSITION.TOP_RIGHT)
      this.props.history.push('/admin/acteurStructure/ListerActeurStructure');
      
    }).catch((erreur)=> {
      console.log(erreur);
      
      this.setState({errorMessage: erreur.message});
  });

    
  }).catch(error=> {
    console.log(error);
  }
  )
}



changementNom = e =>{
  this.setState({nom:e.target.value})
  this.setState({errorNom: ""})
}

changementType = e =>(this.setState({type:e.target.value}))

changementTelephone = e =>{
  this.setState({telephone:e.target.value})
  this.setState({errorTelephone:""})
}

changementWhatsapp = e =>{
  this.setState({whatsapp:e.target.value})
  this.setState({errorWhatsapp:""})
}

changementEmail = e =>{
  this.setState({email:e.target.value})
  this.setState({errorEmail:""})
}

changementProvince = e =>(this.setState({province:e.target.value}))

changementDescription = e =>{
  this.setState({description:e.target.value})
  this.setState({errorDescription:""})
}

changementImage = e =>(this.setState({image:e.target.files[0]}))

changementItineraire= e =>{
  this.setState({itineraire:e.target.value})
  this.setState({errorItineraire:""})
}

changementLatitude = e =>{
  this.setState({latitude:e.target.value})
  this.setState({errorLatitude:""})
}

changementLongitude = e =>{
  this.setState({longitude:e.target.value})
  this.setState({errorLongitude:""})
}

handleSubmit = e => {
    e.preventDefault();

    let verificateur=true;
    
    if(this.state.nom==""){
      this.setState({errorNom:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }else if(this.state.nom.length<3){
       this.setState({errorNom:"le nom doit avoir plus de 3 caractere"})
       verificateur=false
    }
  
    
    if(this.state.telephone==""){
      this.setState({errorTelephone:"Ce champ ne peut pas etre vide"})
      verificateur=false
    } else if(this.state.telephone.substr(0, 4) != "+243"){
      this.setState({errorTelephone:"le numero doit commencer par +243"})
      verificateur=false
    } else if(this.state.telephone.length>13 || this.state.telephone.length<13){
      this.setState({errorTelephone:"Ce numero n'est pas valide"})
      verificateur=false
    }
  
    if(this.state.whatsapp==""){
      this.setState({errorWhatsapp:"Ce champ ne peut pas etre vide"})
      verificateur=false
    } else if(this.state.whatsapp.substr(0, 4) != "+243"){
      this.setState({errorWhatsapp:"le numero doit commencer par +243"})
      verificateur=false
    } else if(this.state.whatsapp.length>13 || this.state.telephone.length<13){
      this.setState({errorWhatsapp:"Ce numero n'est pas valide"})
      verificateur=false
    }
  
    if(this.state.whatsapp==""){
      this.setState({errorWhatsapp:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }
    if(this.state.email==""){
      this.setState({errorEmail:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }else if(!(this.state.email.lastIndexOf("@"))){
      this.setState({errorEmail:"Format email incorect"})
      verificateur=false
    }
  
    
    if(this.state.description==""){
      this.setState({errorDescription:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }
  
    if(this.state.itineraire==""){
      this.setState({errorItineraire:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }
  
    if(this.state.latitude==""){
      this.setState({errorLatitude:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }
  
    if(this.state.longitude==""){
      this.setState({errorLongitude:"Ce champ ne peut pas etre vide"})
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
                  <Form.Control as="select" onChange={this.changementType} >
                    <option>U matinale</option>
                    <option>Hopital</option>
                  </Form.Control>
                  <span>{this.state.errorType}</span>
                </Form.Group>
          </Col>
          <Col>
          <Form.Label>Durée (minutes)</Form.Label>
            <Form.Control placeholder="Ex: 30" type="number"onChange={this.changementNom} />
            <span>{this.state.errorNom}</span>
          </Col>

        </Row>

        <br/>

        <Row>
        <Col>
          <Form.Label for="fileAudio" className="labelFile" >Choisir un fichier Audio Mp3</Form.Label>
            <Form.Control id="fileAudio" className="file" placeholder="First name" type="file" onChange={this.changementImage} />
            < span>{this.state.errorImage}</span>
    </Col>
    <Col>
    <Form.Label className="labelFile" for="filePhotoPodcast">Choisir la photo du podcast</Form.Label>
      <Form.Control placeholder="First name"  id="filePhotoPodcast" className="file"  type="file" onChange={this.changementImage} />
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
  

 
<br/>
    <Button type="submit" variant="primary" className="bouton_form" >Enregistrer</Button>
</Form>
        </div>
        </>
    ) 
   }
}


export default ModifierActeurStructure;