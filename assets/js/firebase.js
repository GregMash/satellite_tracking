var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA4BGdaQAQNzg71DD4Bg3b3O31IA9fl7m4",
  authDomain: "satellite-tracker-ee856.firebaseapp.com",
  databaseURL: "https://satellite-tracker-ee856.firebaseio.com",
  projectId: "satellite-tracker-ee856",
  storageBucket: "satellite-tracker-ee856.appspot.com",
  messagingSenderId: "986398204382"
};
var defaultApp = firebase.initializeApp(config);
var db = firebase.firestore();


// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// Initialize the default app
// var defaultApp = firebase.initializeApp(defaultAppConfig);

console.log(defaultApp.name);  // "[DEFAULT]"
console.log(defaultApp)

// You can retrieve services via the defaultApp variable...
// var defaultStorage = defaultApp.storage();
// var defaultDatabase = defaultApp.database();

// ... or you can use the equivalent shorthand notation
// defaultStorage = firebase.storage();
// defaultDatabase = firebase.firestore();

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);

// // Initialize the default app
// var defaultApp = firebase.initializeApp(defaultAppConfig);

// console.log(defaultApp.name);  // "[DEFAULT]"

// // You can retrieve services via the defaultApp variable...
// // var defaultStorage = defaultApp.storage();
// // var defaultDatabase = defaultApp.database();

// // ... or you can use the equivalent shorthand notation
// // defaultStorage = firebase.storage();
// defaultDatabase = firebase.database();


db.collection("satellites").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});