// public/js/firebaseConfig.js

// Firebase v10 (compat) – browser-friendly
const firebaseConfig = {
//add u r app configuration
  };
  
  // Initialize Firebase App
  firebase.initializeApp(firebaseConfig);
  
  // Make Auth and Firestore accessible globally
  window.auth = firebase.auth()
  window.db = firebase.firestore();
  
