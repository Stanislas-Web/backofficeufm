import firebase from 'firebase';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCp1IFDBBaqXGtgJNn677iBtLfmj41TSQI",
    authDomain: "urbainfm-bd5e6.firebaseapp.com",
    databaseURL: "https://urbainfm-bd5e6.firebaseio.com",
    projectId: "urbainfm-bd5e6",
    storageBucket: "urbainfm-bd5e6.appspot.com",
    messagingSenderId: "272583848546",
    appId: "1:272583848546:web:1364ad9acdc07b6196573b",
    measurementId: "G-EGJ0NGRRG9"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };