import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDfcy6coVb-tP4c-bmsEG6H-XgBW7AGXIk",
    authDomain: "protein-shakes.firebaseapp.com",
    databaseURL: "https://protein-shakes.firebaseio.com",
    projectId: "protein-shakes",
    storageBucket: "protein-shakes.appspot.com",
    messagingSenderId: "43141927982",
    appId: "1:43141927982:web:dc756959fc04b90f3bfbbf",
    measurementId: "G-93YPPM101P"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()