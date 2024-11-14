import {initializeApp} from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVC7rDvnfitrM7KAP9n81npMVZ-uZk4jM",
  authDomain: "crown-shopping-439207.firebaseapp.com",
  projectId: "crown-shopping-439207",
  storageBucket: "crown-shopping-439207.appspot.com",
  messagingSenderId: "545789251374",
  appId: "1:545789251374:web:29c372a19525f26d14f4bf",
  measurementId: "G-NCSPP4Z8H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();


let isSigningIn = false;

export const signInWithGooglePopup = async () => {
  if (isSigningIn) return; // Prevent multiple requests
  isSigningIn = true;

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
    return result;
  } catch (error) {
    console.error('Error during sign-in:', error);
  } finally {
    isSigningIn = false; // Allow new sign-in attempts
  }
};

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return; // Check if userAuth exists

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef); // Check if document already exists

  // If the document doesn't exist, create it with user data
  if (!userSnapshot.exists()) {
    const { displayName, email, uid} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        uid,
        displayName,
        email,
        createdAt,
      });
      console.log('User document created successfully:', userDocRef);
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  } else {
    console.log('User document already exists:', userDocRef);
  }
};
