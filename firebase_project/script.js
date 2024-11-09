// إعداد Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBhMXBMkDgf5rmg6XEpRllsGCalgdoxQtk",
    authDomain: "test-project-899c2.firebaseapp.com",
    databaseURL: "https://test-project-899c2-default-rtdb.firebaseio.com",
    projectId: "test-project-899c2",
    storageBucket: "test-project-899c2.appspot.com",
    messagingSenderId: "200667215684",
    appId: "1:200667215684:web:3d03b2275c1c664bfa0911",
    measurementId: "G-PTDY828H1D"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();
  
  // التعامل مع تسجيل الدخول وتسجيل الخروج
  auth.onAuthStateChanged(user => {
    if (user) {
      handleSignedInUser(user);
    } else {
      setupSignInForm();
    }
  });
  
  function handleSignedInUser(user) {
    console.log("User signed in: ", user.email);
  }
  
  function setupSignInForm() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <form id="signinForm">
        <input type="email" id="inputEmail" placeholder="Email address" required>
        <input type="password" id="inputPassword" placeholder="Password" required>
        <button type="submit">Sign In</button>
      </form>
    `;
  
    const signinForm = document.getElementById("signinForm");
    signinForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById("inputEmail").value;
      const password = document.getElementById("inputPassword").value;
      auth.signInWithEmailAndPassword(email, password).catch((error) => {
        console.error("Error signing in: ", error.message);
      });
    });
  }
  
  const customerForm = document.getElementById('customerForm');
  customerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phone_number').value;
  
    firebase.firestore().collection("customers").add({
      name: name,
      phone_number: phoneNumber
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });
  