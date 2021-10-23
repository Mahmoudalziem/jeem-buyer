importScripts('https://www.gstatic.com/firebasejs/8.6.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.4/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyD91wGwoWwTfT8cbV29Zhlq5zizdStPD0o",
    authDomain: "jeem-fcm.firebaseapp.com",
    projectId: "jeem-fcm",
    storageBucket: "jeem-fcm.appspot.com",
    messagingSenderId: "853495304430",
    appId: "1:853495304430:web:b340a7a8ac1f8a6f24a3ff",
    measurementId: "G-MD3T6PXPHP"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', event => {
    return event;
});