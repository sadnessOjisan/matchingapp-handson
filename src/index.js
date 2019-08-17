import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/messaging";

let messaging;

// このerror分岐ないとsafariでバグる(messaging.hogehoge読んだ瞬間に落ちるぽい)
if (firebase.messaging.isSupported()) {
  const FIREBASE_API_KEY = "AIzaSyDWnC9O1AM3IPDW-M42XEOl5qPMBevPZ9g";
  const FIREBASE_PROJECT_ID = "matchingapp-handson";
  const FIREBASE_VAPID_KEY =
    "BNwQsn4SQmn_UmHi2xNbNaqNJWl9Mya_hoffnGorBeZyqHhdaDgZeFyjqCnpfKjYxMnSLCVXlDh-CcvO-pE1cqI";
  const FIREBASE_SENDER_ID = "521635647289";

  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: FIREBASE_PROJECT_ID,
    messagingSenderId: FIREBASE_SENDER_ID
  };

  firebase.initializeApp(firebaseConfig);

  messaging = firebase.messaging();

  messaging.usePublicVapidKey(FIREBASE_VAPID_KEY);

  console.log("start");

  // tokenが変更されていたら更新する
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.log("refreshedToken:", refreshedToken);
        //  refreshedTokenをどこかに保存したい
      })
      .catch(err => {
        console.log("Unable to retrieve refreshed token ", err);
      });
  });

  // messageを受け取った時の処理
  messaging.onMessage(payload => {
    console.log("Message received. ", payload);
    //   TODO: messageをUIに反映させる
  });
} else {
  console.error("safariとかはダメ");
}
export const getToken = () => {
  if (messaging == null) return;
  const token = messaging.getToken();
  return token;
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
