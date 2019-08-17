importScripts("/__/firebase/6.2.4/firebase-app.js");
importScripts("/__/firebase/6.2.4/firebase-messaging.js");

var firebaseConfig = {
  messagingSenderId: "521635647289"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("push", function(event) {
  console.log("get push");
  event.waitUntil(
    self.registration.showNotification("Push Received", {
      body: "Push Notification Received",
      tag: "push-notification-tag"
    })
  );
});

self.addEventListener(
  "notificationclick",
  function(event) {
    event.notification.close();
  },
  false
);

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = "Background Message Title";
  var notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
