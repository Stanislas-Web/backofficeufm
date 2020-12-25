import React from 'react';
import ajouterImage from './views/admins/bannierepublicitaire/ajouterImage';
// admin
const AdminDashboard = React.lazy(() => import('./views/admins/Dashboard'));
const ListerVBG= React.lazy(() => import('./views/admins/vbg/ListerVBG'));
const MonitoringVBG= React.lazy(() => import('./views/admins/vbg/MonitoringVBG'));
const ListerActeurStructure= React.lazy(() => import('./views/admins/acteurStructure/ListerActeurStructure'));
const AjouterActeurStructure= React.lazy(() => import('./views/admins/acteurStructure/AjouterActeurStructure'));
const AjouterVBG= React.lazy(() => import('./views/admins/vbg/AjouterVBG'));
const Profile= React.lazy(() => import('./views/admins/acteurStructure/DetailStructure'));
const ModifierActeurStructure = React.lazy(() => import('./views/admins/acteurStructure/ModifierActeurStructure'));
const CasSoumis=React.lazy(() => import('./views/admins/CasSoumisAdmin'));
const AjouterUtilisateur =React.lazy(() => import('./views/admins/utilisateurs/AjouterUtilistaeur'));
const ListerUtilisateurs = React.lazy(() => import('./views/admins/utilisateurs/ListerUtilisteurs'));
const ModifierUtilisateur = React.lazy(() => import('./views/admins/utilisateurs/ModifierUtilisateur'));


//ufm

const AjouterEmission= React.lazy(() => import('./views/admins/emissions/ajouterEmission'));
const ListerEmission= React.lazy(() => import('./views/admins/emissions/listerEmission'));
const AjouterPodcast= React.lazy(() => import('./views/admins/podcasts/ajouterPodcast'));
const ListerPodcast= React.lazy(() => import('./views/admins/podcasts/ListerPodcast'));
const ModifierEmission = React.lazy(() => import('./views/admins/emissions/modifierEmission'));
const AjouterBanniere= React.lazy(() => import('./views/admins/bannierepublicitaire/ajouterImage'));
const ListerBanniere= React.lazy(() => import('./views/admins/bannierepublicitaire/listerImage'));




// Acteurs et structures
const StructureDashboard = React.lazy(() => import('./views/structures/Dashboard'));
const CasSoumisActeur=React.lazy(() => import('./views/structures/CasSoumisActeur'));
const AjoutVBG = React.lazy(() => import('./views/structures/vbg/ActeurAjouterVBG'));
const ActeurListerVBG = React.lazy(() => import('./views/structures/vbg/ActeurListerVBG'));
const ActeurModifierVBG = React.lazy(() => import('./views/structures/vbg/ActeurModifierVBG'));





const routes = [
  { path: '/', exact: true, name: 'Home' },

  //Admin Ufm
  { path: '/admin/ajouteremission', name: 'Ajouter une Emission', component: AjouterEmission },
  { path: '/admin/listeremission', name: 'Voir Les Emissions', component: ListerEmission },
  { path: '/admin/ajouterpodcast', name: 'Ajouter un Podcast', component: AjouterPodcast },
  { path: '/admin/listerpodcast', name: 'Voir Les Podcasts', component: ListerPodcast },
  { path: '/admin/ajouterbanniere', name: 'Ajouter une image publicitaire ', component: AjouterBanniere },
  { path: '/admin/listerbanniere', name: 'Voir Les images publicitaires ', component: ListerBanniere },

  //   Admin
  
  { path: '/admin/Dashboard', name: 'Dashboard', component: AdminDashboard },

  { path: '/admin/vbg/listerVbg', name: 'ListeVbg', component: ListerVBG },
  { path: '/admin/vbg/monitoring', name: 'Monitoring', component: MonitoringVBG },
  { path: '/admin/acteurStructure/ListerVbg', name: 'ListeVbg', component: ListerVBG },
  { path: '/admin/acteurStructure/ListerActeurStructure', name: 'listerActeurStructure', component: ListerActeurStructure },
  { path: '/admin/acteurStructure/AjouterActeurStructure', name: 'AjouterActeurStructure', component: AjouterActeurStructure },
  { path: '/admin/acteurStructure/AjouterVBG/:id', name: 'AjouterVBG/:id', component: AjouterVBG },
  { path: "/admin/acteurStructure/Detail/:id", name: 'Detail/:id', component: Profile },
  { path: "/admin/acteurStructure/modifierActeurStructure/:id", name: 'modifierActeurStructure/:id', component: ModifierActeurStructure },
  { path: "/admin/modifieremission/:id", name: 'modifier Emissions/:id', component: ModifierEmission },
  { path: "/admin/acteurStructure/AjouterUtilsateur", name: 'AjouterUtilsateur', component: AjouterUtilisateur },
  { path: "/admin/acteurStructure/ListerUtilisateurs", name: 'ListerUtilisateurs', component: ListerUtilisateurs },
  { path: "/admin/acteurStructure/ModifierUtilisateur/:id", name: 'ModifierUtilisateur/:id', component: ModifierUtilisateur },
  { path: '/admin/CasSoumisAdmin', name: 'CasSoumisAdmin', component: CasSoumis },
  


  // Acteurs et structures

  { path: '/structure/Dashboard', name: 'Dashboard', component: StructureDashboard },
  { path: '/structure/CasSoumisActeur', name: 'CasSoumisActeur', component: CasSoumisActeur },
  { path: '/structure/vbg/AjoutVBG/:id', name: 'AjoutVBG/:id', component: AjoutVBG },
  { path: '/structure/vbg/ActeurListerVBG', name: 'ActeurListerVBG', component: ActeurListerVBG },
  { path: '/structure/vbg/ActeurModifierVbg/:id', name: 'ActeurModifierVbg/:id', component: ActeurModifierVBG },
];

export default routes;
