import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0rcr-Mrg390uQn8Z4a1YASDLeF3ooiSw",
  authDomain: "devinsoup-adc5d.firebaseapp.com",
  projectId: "devinsoup-adc5d",
  storageBucket: "devinsoup-adc5d.firebasestorage.app",
  messagingSenderId: "312712607794",
  appId: "1:312712607794:web:4ee3eb8d68ca6ce81c642b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }; 
