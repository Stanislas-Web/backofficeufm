import React from 'react';
// admin
const AdminDashboard = React.lazy(() => import('./views/admins/Dashboard'));
const ListerVBG= React.lazy(() => import('./views/admins/vbg/ListerVBG'));
const MonitoringVBG= React.lazy(() => import('./views/admins/vbg/MonitoringVBG'));
const ListerActeurStructure= React.lazy(() => import('./views/admins/acteurStructure/ListerActeurStructure'));
const AjouterActeurStructure= React.lazy(() => import('./views/admins/acteurStructure/AjouterActeurStructure'));
const AjouterVBG= React.lazy(() => import('./views/admins/vbg/AjouterVBG'));
const Profile= React.lazy(() => import('./views/admins/acteurStructure/DetailStructure'));
const ModifierActeurStructure = React.lazy(() => import('./views/admins/acteurStructure/ModifierActeurStructure'));
const ModifierVbg = React.lazy(() => import('./views/admins/vbg/ModifierVbg'));
const CasSoumis=React.lazy(() => import('./views/admins/CasSoumisAdmin'));
const AjouterUtilisateur =React.lazy(() => import('./views/admins/utilisateurs/AjouterUtilistaeur'));
const ListerUtilisateurs = React.lazy(() => import('./views/admins/utilisateurs/ListerUtilisteurs'));
const ModifierUtilisateur = React.lazy(() => import('./views/admins/utilisateurs/ModifierUtilisateur'));






// Acteurs et structures
const StructureDashboard = React.lazy(() => import('./views/structures/Dashboard'));
const CasSoumisActeur=React.lazy(() => import('./views/structures/CasSoumisActeur'));
const AjoutVBG = React.lazy(() => import('./views/structures/vbg/ActeurAjouterVBG'));
const ActeurListerVBG = React.lazy(() => import('./views/structures/vbg/ActeurListerVBG'));
const ActeurModifierVBG = React.lazy(() => import('./views/structures/vbg/ActeurModifierVBG'));





const routes = [
  { path: '/', exact: true, name: 'Home' },

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
  { path: "/admin/acteurStructure/modifierVbg/:id", name: 'modifierVbg/:id', component: ModifierVbg },
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
