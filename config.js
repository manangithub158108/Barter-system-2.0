import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBAQLUaOs8khGId8yDGO4mq0unJsXIvTrk",
    authDomain: "bartersystem-1fbb9.firebaseapp.com",
    projectId: "bartersystem-1fbb9",
    storageBucket: "bartersystem-1fbb9.appspot.com",
    messagingSenderId: "721653115439",
    appId: "1:721653115439:web:587a6ab0da6c1a38bdf4da"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();

  