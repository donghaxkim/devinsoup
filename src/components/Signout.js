import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Signout() {
  const handleLogout = () => {
    signOut(auth);
    alert("Logged out!");
  };

  return <button onClick={handleLogout}>Sign Out</button>;
} 