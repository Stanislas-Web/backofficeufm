import React, { Component } from 'react';
import "../../../scss/DetailActeurStructure.scss"
import API from "../../../services/api";
import { BsHouseFill, BsGridFill, BsPencilSquare } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import {
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
    WhatsappIcon,
    ViberIcon,
    WorkplaceIcon
  } from "react-share";


class Profile extends Component{
    state={
        id:null,
        donnees:null,
        nom:null,
        description:null,
        whatsapp:null,
        telephone:null,
        email:null,
        img:null,
        type:null,
        itineraire:null
    }
    

    componentDidMount(){
        console.log(this.props.match.params.id);
        const dat = this.props.match.params.id;

        this.setState({
            id:dat
        })

        API.get('acteurStructure/'+dat).then((res)=>{
            this.setState({
                 nom:res.data.nom,
                description: res.data.description,
                whatsapp:res.data.contact.numerosWhatsapp,
                telephone: res.data.contact.numerosTelephone,
                email: res.data.contact.email,
                itineraire: res.data.adresse.itineraire,
                image: res.data.img,
                type: res.data.type
            })
            
        })
        

        
    }

    render(){
        
        
        return(
            <>
                
              <div className="ContainerDetail"> 
                  <div className="gauche">
                        <img src={this.state.image} alt=""/>
                        <h3 className="nom_structure">{this.state.nom}</h3>
                  </div>
                  <div className="parent">
                  <div className="Niveau1">
                  <div className="Niveau2">
                        <div className="Niveau3">
                            {/* <BsGridFill size={50}/> */}
                            <h2>Type</h2>
                        </div>
                        <p>{this.state.type}</p>
                    </div>
                    <div className="Niveau2 " >
                        <div className="Niveau3 ">
                            {/* <BsPencilSquare size={50} /> */}
                            <h2>Description</h2>
                        </div>
                        <p>{this.state.description}</p>
                    </div>
                  </div>
                  <div className="Niveau1">
                    <div className="Niveau2">
                        <div className="Niveau3">
                            {/* <BsHouseFill size={50}/> */}
                            <h2>Adresse</h2>
                        </div>
                        <p>{this.state.itineraire}</p>
                    </div>
                    <div className="Niveau2">
                        <div className="Niveau3">
                            {/* <AiFillPhone size={50}/> */}
                            <h2>Contact</h2>
                        </div>
                        <p>{this.state.telephone}</p>
                        <p>{this.state.whatsapp}</p>
                        <p>{this.state.email}</p>
                    </div>
                  </div>
                  </div>
                  
              </div>
          </>
            )
    }
}


export default Profile;






















// import React, { Component } from 'react';
// import "../../../scss/DetailActeurStructure.scss"
// import API from "../../../services/api";
// import {
//     FacebookIcon,
//     TwitterIcon,
//     EmailIcon,
//     WhatsappIcon,
//     ViberIcon,
//     WorkplaceIcon
//   } from "react-share";


// class Profile extends Component{
//     state={
//         id:null,
//         donnees:null,
//         nom:null,
//         description:null,
//         whatsapp:null,
//         telephone:null,
//         email:null,
//         img:null,
//         type:null,
//         itineraire:null
//     }
    

//     componentDidMount(){
//         console.log(this.props.match.params.id);
//         const dat = this.props.match.params.id;

//         this.setState({
//             id:dat
//         })

//         API.get('acteurStructure/'+dat).then((res)=>{
//             this.setState({
//                  nom:res.data.nom,
//                 description: res.data.description,
//                 whatsapp:res.data.contact.numerosWhatsapp,
//                 telephone: res.data.contact.numerosTelephone,
//                 email: res.data.contact.email,
//                 itineraire: res.data.adresse.itineraire,
//                 image: res.data.img,
//                 type: res.data.type
//             })
            
//         })
        

        
//     }

//     render(){
        
        
//         return(
//             <>
                
//               <div className="ContainerDetail"> 
//                   <div className="gauche">
//                         <img src={this.state.image} alt=""/>
//                   </div>
//                   <div className="droit">
//                     <h1>{this.state.nom} </h1>
//                     <div className="gd">
//                         <p  className="libele">Contact</p>
//                         <div className="parent">
//                             <div>
//                                 <p className="social"><ViberIcon size={48} round={true} url="www.whatsapp.com"/></p>
//                                 <p>{this.state.telephone}</p>
//                             </div>
//                             <div>
//                                 <p><WhatsappIcon size={48} round={true} url="www.whatsapp.com" /></p>
//                                 <p>{this.state.whatsapp}</p>
//                             </div>
//                             <div>
//                                 <p><EmailIcon size={48} round={true} url="www.whatsapp.com" /></p>
//                                 <p>{this.state.email}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div >
//                         <p className="libele">Type</p>
//                         <WorkplaceIcon size={48} round={true} />
//                         <p>{this.state.type}</p>
//                     </div>
//                     <div>
//                         <p className="libele">Description</p>
//                         <p>{this.state.description}</p>
//                     </div>
                    
//                     <div >
//                     <p className="libele">Itineraire</p>
//                         <p>{this.state.itineraire}</p>
//                     </div>
//                   </div>
//               </div>
//           </>
//             )
//     }
// }


// export default Profile;