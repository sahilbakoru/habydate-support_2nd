
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import allConfig from '../config';


export const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: allConfig.firebaseCredentials.apiKey,
            authDomain: allConfig.firebaseCredentials.authDomain,
            databaseURL: allConfig.firebaseCredentials.databaseURL,
            projectId: allConfig.firebaseCredentials.projectId,
            storageBucket: allConfig.firebaseCredentials.storageBucket,
            messagingSenderId: allConfig.firebaseCredentials.messagingSenderId,
            appId: allConfig.firebaseCredentials.appId,
            measurementId: allConfig.firebaseCredentials.measurementId
        });
    } else {
        firebase.app();
    }
    return firebase
}