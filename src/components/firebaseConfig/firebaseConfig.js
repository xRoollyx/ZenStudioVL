import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const StartFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCkPqhorhg7CWfOQei7mO81YPLtp2k8vEU",
        authDomain: "zen-studiovl.firebaseapp.com",
        databaseURL: "https://zen-studiovl-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "zen-studiovl",
        storageBucket: "zen-studiovl.appspot.com",
        messagingSenderId: "921348682773",
        appId: "1:921348682773:web:2f6d4bcfa9333f06818a1c",
        measurementId: "G-5H5PMKQMPR"
    };

    const app = initializeApp(firebaseConfig);

    return getDatabase(app)
}
