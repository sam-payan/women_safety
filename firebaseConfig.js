import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBL90H7W4RQSpMdVjPLsq4qjcxUH6JnmAY",
  authDomain: "women-safety-ff6f2.firebaseapp.com",
  projectId: "women-safety-ff6f2",
  storageBucket: "women-safety-ff6f2.appspot.com",
  messagingSenderId: "621246185666",
  appId: "1:621246185666:web:21158a234dbcd9d39f7b5b",
  databaseURL: 'https://women-safety-6f2-default-rtdb.asia-southeast1.firebasedatabase.app/' 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app); 

