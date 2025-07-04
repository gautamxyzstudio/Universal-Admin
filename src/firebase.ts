import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABr7l6Vpyewp1NLLOq0Qcs0tIsykG5PsU',
  authDomain: 'universalproject-2ec97.firebaseapp.com',
  projectId: 'universalproject-2ec97',
  storageBucket: 'universalproject-2ec97.firebasestorage.app',
  messagingSenderId: '333110462709',
  appId: '1:333110462709:web:b737e1dc31de4e22e8ddbc',
  measurementId: 'G-B2C9BTJ1S8',
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
};

export { app, messaging };

// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyABr7l6Vpyewp1NLLOq0Qcs0tIsykG5PsU',
//   authDomain: 'universalproject-2ec97.firebaseapp.com',
//   projectId: 'universalproject-2ec97',
//   storageBucket: 'universalproject-2ec97.firebasestorage.app',
//   messagingSenderId: '333110462709',
//   appId: '1:333110462709:web:b737e1dc31de4e22e8ddbc',
//   measurementId: 'G-B2C9BTJ1S8',
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const fbMethods = { messaging, getToken, onMessage };
