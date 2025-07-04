importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyABr7l6Vpyewp1NLLOq0Qcs0tIsykG5PsU',
    authDomain: 'universalproject-2ec97.firebaseapp.com',
    projectId: 'universalproject-2ec97',
    storageBucket: 'universalproject-2ec97.firebasestorage.app',
    messagingSenderId: '333110462709',
    appId: '1:333110462709:web:b737e1dc31de4e22e8ddbc',
    measurementId: 'G-B2C9BTJ1S8',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase Messaging instance
const messaging = firebase.messaging();



// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const link = payload?.fcmOptions?.link || payload?.data?.link;
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo.png',
        data: {
            link: link,
        },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type:'window',includeUncontrolled:true}).then(windowClients => {
             const url = event.notification.data.url;
             if(!url){
                return;
             }
             for(const windowClient of windowClients){
                if(windowClient.url === url && 'focus' in windowClient){
                    return windowClient.focus();
             }
            }
             if(clients.openWindow){
                return clients.openWindow(url);
             }
        })
    );
});