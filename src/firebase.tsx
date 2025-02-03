// Import the functions and types you need from the SDKs you need
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const botToken = '7715858254:AAHrrc5HlqhA6bzZ-9Wru2uF7-MbCGHyr8o';
const chatId = '6573517202';
const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Function to get a single document by ID from CONFIG collection
const getDocument = async (docId: string): Promise<DocumentData | null> => {
  const docRef = doc(db, "CONFIG", docId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};

// Function to get all documents in a collection
const getCollection = async (
  collectionName: string
): Promise<Array<{ id: string } & DocumentData>> => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);

  const documents: Array<{ id: string } & DocumentData> = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return documents;
};

export { db, botToken, chatId, url, getDocument, getCollection };