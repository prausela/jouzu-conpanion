import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBVDZFXp6Xq5KZS3C-yG8oi9vio1l4iwkU",
    authDomain: "jouzu-musubi-staging.firebaseapp.com",
    databaseURL: "https://jouzu-musubi-staging-default-rtdb.firebaseio.com",
    projectId: "jouzu-musubi-staging",
    storageBucket: "jouzu-musubi-staging.appspot.com",
    messagingSenderId: "325158412154",
    appId: "1:325158412154:web:fd2c7144c0ef4f28b5c0c3",
    measurementId: "G-EWNHK49WQS"
};

let defaultApp = null;
let db = null;

const getAppInstance = () => {
    if(!defaultApp)
        defaultApp = initializeApp(firebaseConfig);
    return defaultApp;
} 

const getDbInstance = () => {
    if(!db)
        db = getDatabase(getAppInstance());
    return db;
}

const getFirebaseInstance = () => {
    return getDbInstance();
}

export default {
    getFirebaseInstance
};