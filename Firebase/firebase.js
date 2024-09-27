// Firebase/firebase.js
import firebase from 'firebase/compat/app'; // Using compat for v8 support
import 'firebase/compat/database'; // Ensure to import database from compat

const firebaseConfig = {
    apiKey: "AIzaSyDfD7lLsgnZ7_XlMq_1rqtj7hEMmRkGkZE",
    authDomain: "t0do-list.firebaseapp.com",
    databaseURL: "https://t0do-list-default-rtdb.firebaseio.com",
    projectId: "t0do-list",
    storageBucket: "t0do-list.appspot.com",
    messagingSenderId: "592674060070",
    appId: "1:592674060070:web:6d7efbefc4c802e571b3e7",
    measurementId: "G-88667HVBS1"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
