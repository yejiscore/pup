import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const firebaseLogin = async () => {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);

  return user;
};

export default firebaseLogin;
