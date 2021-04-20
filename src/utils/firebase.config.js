import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDbh7OKYnrOPDUpr0_J7BVcYRBBJM1-iNM',
  authDomain: 'sakib-11.firebaseapp.com',
  projectId: 'sakib-11',
  storageBucket: 'sakib-11.appspot.com',
  messagingSenderId: '965218514037',
  appId: '1:965218514037:web:f788e8e60f77e27c95b43c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
