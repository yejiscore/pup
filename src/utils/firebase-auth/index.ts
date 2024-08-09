import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const firebaseLogin = async () => {
  const googleProvider = new GoogleAuthProvider();
  const {
    user: {
      email: googleEmail,
      displayName: googleDisplayName,
      uid: googleUid,
    },
  } = await signInWithPopup(auth, googleProvider);

  return googleUid;
};

export default firebaseLogin;
