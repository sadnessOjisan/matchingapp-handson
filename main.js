const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  "BNwQsn4SQmn_UmHi2xNbNaqNJWl9Mya_hoffnGorBeZyqHhdaDgZeFyjqCnpfKjYxMnSLCVXlDh-CcvO-pE1cqI"
);

messaging
  .requestPermission()
  .then(() => {
    console.log("have a permission");
    return messaging.getToken();
  })
  .then(token => {
    console.log("token", token);
  })
  .catch(err => {
    console.log(err);
  });

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  // ...
});
