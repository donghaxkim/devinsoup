import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // other keys as provided by Firebase config snippet
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }; 