import firebase from "firebase/app";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyD91wGwoWwTfT8cbV29Zhlq5zizdStPD0o",
  authDomain: "jeem-fcm.firebaseapp.com",
  projectId: "jeem-fcm",
  storageBucket: "jeem-fcm.appspot.com",
  messagingSenderId: "853495304430",
  appId: "1:853495304430:web:b340a7a8ac1f8a6f24a3ff",
  measurementId: "G-MD3T6PXPHP",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

/**
 * Receive Messages
 *
 * @return  Messages payload
 */

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

/**
 * Get Token Of Device
 *
 * @return  Messages payload
 */

export const getToken = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() =>
        messaging.getToken({
          vapidKey:
            "BCOmFeQP6dpywwi97aun2iUPBCy3JLogzLmY1uzuOVcx_VX-vmHmIsI09WS402hkJajhi_ot3ZtIwaHQjXr4sC4",
        })
      )
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });
