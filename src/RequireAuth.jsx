import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mb-4 text-lg">You must be signed in to book an appointment.</p>
        <button
          onClick={async () => {
            const provider = new GoogleAuthProvider();
            try {
              await signInWithPopup(auth, provider);
            } catch (err) {
              alert('Google sign-in failed');
            }
          }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            padding: 0,
          }}
          title="Sign in with Google"
        >
          <FcGoogle size={28} />
        </button>
      </div>
    );
  }

  return children;
} 