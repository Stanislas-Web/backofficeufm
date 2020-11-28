import React,{Component} from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom'
import logo from '../../assets/icons/ufm.jpg'
import Api from '../../services/api'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

class Login extends Component {
  state={
    username:"",
    pwd:"",
    errorUsername: "",
    errorPassword:""
  }
  
 
  changementUserName = (e)=> (this.setState({username:e.target.value}));

  changementPwd = (e)=> (this.setState({pwd:e.target.value}));

  handleSubmit = (e)=>{
    e.preventDefault();    
    const user = {
      username:this.state.username,
      password:this.state.pwd
    }

    Api.post(`/authentification`, user).then(res => {
      localStorage.setItem("users", JSON.stringify( res.data));  
       localStorage.setItem("token", res.data.token)
       
      if(res.data.user.role_user == "Admin"){
       
         window.location.href = "#/admin/Dashboard";
         window.location.reload();
          
      }else if(res.data.user.role_user == "Admin_Structure"){
        
        this.props.history.push('/structure/Dashboard');
        window.location.reload();
         
      }else if (res.data.user.role_user == "User_Structure"){
       
        this.props.history.push('/structure/Dashboard');
        window.location.reload();
         
      }
      }).catch((erreur)=> {
          console.log(erreur.response.data);
          this.setState({errorUsername: erreur.response.data.error});
          this.setState({errorPassword: erreur.response.data.Error});
        }) 
  }
myStyle={
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
 }
bgStyle={
  background:"url('https://static.mediapart.fr/etmagine/default/files/2019/10/28/mainstop.jpg?width=2000&height=1333&width_format=pixel&height_format=pixel')",
  backgroundRepeat: "no-repeat",
  backgroundSize: " 100%"
} 
render(){
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer >
        <CRow className="justify-content-center" >
          <CCol md="8">
            <CCardGroup  >
              <CCard className="p-4">
                <CCardBody >
                  <CForm onSubmit={this.handleSubmit}  >
                    <h1>Connexion</h1>
                    <p className="text" style={{ color : "#3C4B64" }}>Connectez-vous avec vos identifiants</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={this.changementUserName} required />
              
                    </CInputGroup>
                    { this.state.errorUsername &&
                    <p class="text-danger">{ this.state.errorUsername }</p>
                 }
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.changementPwd} required />
                    </CInputGroup>
                    { this.state.errorPassword &&
                    <p class="text-danger">{ this.state.errorPassword }</p>
                 }
                    <CRow> 
                    
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4" style={{backgroundColor:"#F2E307",border:"2px solid #F2E307",color:"#000", fontWeight:"500"}}>Se connecter</CButton>
                      </CCol>
                     
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">Mot de passe oublié?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5 d-md-down-none"  >
                <CCardBody className="text-center"  >
                  <div>
                          <img src={logo}/>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
   )
  }
}

export default Login;