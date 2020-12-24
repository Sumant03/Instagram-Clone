  import firebase from "firebase";

  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBdCg--5SnHx1p5We2z3y55VcoxEkrVivM",
    authDomain: "instagram-clone-react-d4c40.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-d4c40-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-d4c40",
    storageBucket: "instagram-clone-react-d4c40.appspot.com",
    messagingSenderId: "977633339446",
    appId: "1:977633339446:web:5ee2373a57b7f1c3b31097",
    measurementId: "G-RSNGPJJE8Y"
  });

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};




  //export default firebaseConfig;