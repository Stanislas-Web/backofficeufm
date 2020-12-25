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
    urlBanniere:"", 
    errorUrlBanniere:""
}


changementUrlBanniere = e =>{
  this.setState({urlBanniere:e.target.files[0]})
  this.setState({errorUrlBanniere:""})
}



uploadImage = ()=>{
  const uploadTask = storage.ref(`images/${this.state.urlBanniere.name}`).put(this.state.urlBanniere);
  uploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    ()=>{
      storage
        .ref("images")
        .child(this.state.urlBanniere.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({urlBanniere:url})
              
          const newPub ={
            urlBanniere: this.state.urlBanniere,
          }
        
            API.post('bannieres', newPub)
            .then(res => {
              console.log(res);
              console.log(res.data);
              toast.info("Enregistrement effectuer", toast.POSITION.TOP_RIGHT);
              this.props.history.push('/admin/listeremission');
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
  console.log(this.state.urlBanniere);

  let verificateur=true;
  
     if(this.state.urlBanniere== "" || this.state.urlBanniere == undefined){
      this.setState({errorUrlBanniere:"veuillez choisir l'image de la bannière publicitaire"});
      verificateur = false;
    }


  if(verificateur){
    this.uploadImage();
  }
}



  render(){
    return(
        <>
        
          <h1>Ajouter une Bannière publicitaire </h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>



     

        <br/>

        <Row>
          <Col>
          <Form.Label className="labelFile" for="filePhotoEmission">Choisir une photo pour la bannière publicitaire</Form.Label>
            <Form.Control id="filePhotoEmission" placeholder="First name" className="file" type="file" onChange={this.changementUrlBanniere} />
            <span>{this.state.errorImageEmission}</span>
          </Col>
       
        </Row>

        <br/>
       






 

    


  
  
    <Button type="submit" variant="primary" className="bouton_form" style={{backgroundColor:"#303C50",}} >Enregistrer</Button>
</Form>
        
        </div>
        </>
    ) 
   }
}
export default withRouter(AjouterActeurStructure);