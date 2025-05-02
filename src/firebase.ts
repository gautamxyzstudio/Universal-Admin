import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyABr7l6Vpyewp1NLLOq0Qcs0tIsykG5PsU',
  authDomain: 'universalproject-2ec97.firebaseapp.com',
  projectId: 'universalproject-2ec97',
  storageBucket: 'universalproject-2ec97.firebasestorage.app',
  messagingSenderId: '333110462709',
  appId: '1:333110462709:web:b737e1dc31de4e22e8ddbc',
  measurementId: 'G-B2C9BTJ1S8',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
