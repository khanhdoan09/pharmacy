import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCzVwcNd1YLNyWSINAM7PBk0oI_B1BwBQQ',
    authDomain: 'pharmacy-969d7.firebaseapp.com',
    projectId: 'pharmacy-969d7',
    storageBucket: 'pharmacy-969d7.appspot.com',
    messagingSenderId: '837093822542',
    appId: '1:837093822542:web:dc1fb8abca3340e429f31f',
    measurementId: 'G-E137VJTZLC',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
