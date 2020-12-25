import React,{Component} from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import API from "../../../services/api";
 
import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss"
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {storage} from '../../../config/firebase';

toast.configure();

class AjouterActeurStructure extends Component{
  
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
    
}


changementNom = e => {
      this.setState({nom:e.target.value})
      this.setState({errorNom:""})
}

changementType = e => {
  this.setState({type:e.target.value})
  this.setState({errorType:""})
}

changementJounaliste = e =>{
  this.setState({journaliste:e.target.value})
  this.setState({errorJournaliste:""})
}

changementImageEmission = e =>{
  this.setState({imageEmission:e.target.files[0]})
  this.setState({errorImageEmission:""})
}

changementImageJournaliste = e =>{
  this.setState({imageJournaliste:e.target.files[0]})
  this.setState({errorImageJournaliste:""})
}

changementDescription = e =>{
  this.setState({description:e.target.value})
  this.setState({errorDescription:""})
}


handleChange = date => {
  this.setState({
    startDate: date
  });
};



uploadImage = ()=>{
  const uploadTask = storage.ref(`images/${this.state.imageEmission.name}`).put(this.state.imageEmission);
  uploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    ()=>{
      storage
        .ref("images")
        .child(this.state.imageEmission.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({imageEmission:url})
        });
    }

  )

  const imageJournaliste = storage.ref(`images/${this.state.imageJournaliste.name}`).put(this.state.imageJournaliste);
  imageJournaliste.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    ()=>{
      storage
        .ref("images")
        .child(this.state.imageJournaliste.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({imageJournaliste:url})
          const newEmission ={
            nom: this.state.nom,
            type:this.state.type,
            journaliste: this.state.journaliste,
            photo:this.state.imageEmission,
            photoJournaliste:this.state.imageJournaliste,
            description: this.state.description,
          }
        
            API.post('emissions', newEmission)
            .then(res => {
              console.log(res);
              console.log(res.data);
              this.props.history.push('/admin/listeremission');
              toast.info("Enregistrement effectuer ", toast.POSITION.TOP_RIGHT)
              window.location.reload();
              
            }).catch((erreur)=> {
              console.log(erreur);
              
              this.setState({errorMessage: erreur.message});
          });
            
        });


    }

  )






}



handleSubmit = e => {
  e.preventDefault();
  console.log(this.state.imageEmission);
  console.log(this.state.imageJournaliste);

  let verificateur=true;
  
     if(this.state.nom == "" || this.state.nom == undefined){
      this.setState({errorNom:"veuillez saisir le nom de l'émission"});
      verificateur = false;
    }

    if(this.state.type == "" || this.state.type== undefined){
      this.setState({errorType:"veuillez saisir le type de l'emission"});
      verificateur = false;
    }

    if(this.state.journaliste == "" || this.state.journaliste == undefined){
      this.setState({errorJournaliste:"veuillez saisir le nom du journaliste "});
      verificateur = false;
    }

    if(this.state.imageEmission == "" || this.state.imageEmission == undefined){
      this.setState({errorImageEmission:"veuillez selectionner l'image descriptive de l'emission"});
      verificateur = false;
    }

    if(this.state.imageJournaliste == "" || this.state.imageJournaliste == undefined){
      this.setState({errorImageJournaliste:"veuillez choisir l'image du journaliste"});
      verificateur = false;
    }

    if(this.state.description == "" || this.state.description == undefined){
      this.setState({errorDescription:"veuillez saisir la description de l'emission"});
      verificateur = false;
    }


  if(verificateur){
    this.uploadImage();
  }
}



// uploadImage = ()=>{
//   toast.info("Veuillez patientez pendant que l'audio se télécharge", toast.POSITION.TOP_RIGHT)
//   const uploadTask = storage.ref(`images/${this.state.imageEmission.name}`).put(this.state.imageEmission);
//   uploadTask.on(
//     "state_changed",
//     snapshot => {},
//     error => {
//       console.log(error);
//     },
//     ()=>{
//       storage
//         .ref("images")
//         .child(this.state.imageEmission)
//         .getDownloadURL()
//         .then(url => {
//           console.log(url);
//           this.setState({imageEmission:url})
//           //upload de l'image du journaliste 

            
//     if(this.state.nom == "" || this.state.nom == undefined){
//       this.setState({errorNom:"veuillez saisir le nom de l'émission"})
//     }

//     if(this.state.type == "" || this.state.type== undefined){
//       this.setState({errorType:"veuillez saisir le type de l'emission"})
//     }

//     if(this.state.journaliste == "" || this.state.journaliste == undefined){
//       this.setState({errorJournaliste:"veuillez saisir le nom du journaliste "})
//     }

//     if(this.state.imageEmission == "" || this.state.imageEmission == undefined){
//       this.setState({errorImageEmission:"veuillez selectionner l'image descriptive de l'emission"})
//     }

//     if(this.state.imageJournaliste == "" || this.state.imageJournaliste == undefined){
//       this.setState({errorImageJournaliste:"veuillez choisir l'image du journaliste"})
//     }

//     if(this.state.description == "" || this.state.description == undefined){
//       this.setState({errorDescription:"veuillez saisir la description de l'emission"})
//     }

    
//     const newEmission ={
//         nom: this.state.nom,
//         type:this.state.type,
//         journaliste: this.state.journaliste,
//         photo:this.state.imageEmission,
//         photoJournaliste:this.state.imageJournaliste,
//         description: this.state.description,
//       }

      

//       console.log(newEmission);




//         });
//     }

//   )
// }

// handleSubmit = e => {
//     e.preventDefault();
  
    
//     if(this.state.nom == "" || this.state.nom == undefined){
//       this.setState({errorNom:"veuillez saisir le nom de l'émission"})
//     }

//     if(this.state.type == "" || this.state.type== undefined){
//       this.setState({errorType:"veuillez saisir le type de l'emission"})
//     }

//     if(this.state.journaliste == "" || this.state.journaliste == undefined){
//       this.setState({errorJournaliste:"veuillez saisir le nom du journaliste "})
//     }

//     if(this.state.imageEmission == "" || this.state.imageEmission == undefined){
//       this.setState({errorImageEmission:"veuillez selectionner l'image descriptive de l'emission"})
//     }

//     if(this.state.imageJournaliste == "" || this.state.imageJournaliste == undefined){
//       this.setState({errorImageJournaliste:"veuillez choisir l'image du journaliste"})
//     }

//     if(this.state.description == "" || this.state.description == undefined){
//       this.setState({errorDescription:"veuillez saisir la description de l'emission"})
//     }

    
//     const newEmission ={
//         nom: this.state.nom,
//         type:this.state.type,
//         journaliste: this.state.journaliste,
//         photo:this.state.imageEmission,
//         photoJournaliste:this.state.imageJournaliste,
//         description: this.state.description,
//       }

      

//       console.log(newEmission);
      
  
// }



  render(){
    return(
        <>
        
          <h1>Ajouter une Emission</h1>
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
            <Form.Control placeholder="Ex : Culture" type="text"onChange={this.changementType} />
            <span>{this.state.errorType}</span>
          </Col>
        
        </Row>
        
        <br/>
        <Row>
          <Col>
          <Form.Label>Présenté par </Form.Label>
            <Form.Control placeholder="Ex : Carine MUTAHAlI" type="text"onChange={this.changementJounaliste} />
            <span>{this.state.errorJournaliste}</span>
          </Col>
        
        </Row>

        <br/>

        <Row>
          <Col>
          <Form.Label className="labelFile" for="filePhotoEmission">Choisir une photo pour l'emission</Form.Label>
            <Form.Control id="filePhotoEmission" placeholder="First name" className="file" type="file" onChange={this.changementImageEmission} />
            <span>{this.state.errorImageEmission}</span>
          </Col>
          <Col>
          <Form.Label className="labelFile" for="filePhotoJournaliste">Choisir la photo du journaliste</Form.Label>
            <Form.Control id="filePhotoJournaliste" placeholder="First name" className="file" type="file" onChange={this.changementImageJournaliste} />
            <span>{this.state.errorImageJournaliste}</span>
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
export default withRouter(AjouterActeurStructure);