import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBovpCVgAfNMhK0AjXGIhE2q6B5yPrhD_4",
    authDomain: "prime-8c8f6.firebaseapp.com",
    projectId: "prime-8c8f6",
    storageBucket: "prime-8c8f6.appspot.com",
    messagingSenderId: "206663141328",
    appId: "1:206663141328:web:9e45e530796ed11b7a9bd5"
  };

  firebase.initializeApp(firebaseConfig);
export default firebase;