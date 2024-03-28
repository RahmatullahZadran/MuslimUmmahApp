    // firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth"; // Import getAuth from Firebase Auth



    const firebaseConfig = {
        apiKey: "AIzaSyACjuUnbTk-uUgBXkt0wFYUr-VdZMY9lCk",
        authDomain: "muslimummahapp.firebaseapp.com",
        databaseURL: "https://muslimummahapp-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "muslimummahapp",
        storageBucket: "muslimummahapp.appspot.com",
        messagingSenderId: "981979564801",
        appId: "1:981979564801:web:5d24b187adec3407572900",
        measurementId: "G-99QCLJLN9J"
    };

    const firebaseApp = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(firebaseApp);
    
    export { auth, firebaseApp };

