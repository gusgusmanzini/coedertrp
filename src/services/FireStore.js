// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, query, where, collection, getDocs, Timestamp} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDm2BvdDZ27d8sjCjN8vDH6TEIz8KVkKMM",
    authDomain: "jimp-store.firebaseapp.com",
    projectId: "jimp-store",
    storageBucket: "jimp-store.appspot.com",
    messagingSenderId: "1088499801538",
    appId: "1:1088499801538:web:84bafe49408ad60ae84a5b",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(app);

export default fireStoreDb;

// Obtengo todos los items de la DB

export async function getAllItems() {
    const miProducts = collection(fireStoreDb,"items");
    const itemsSnapshot = await getDocs(miProducts);

    return itemsSnapshot.docs.map(doc => {
        return {
        ...doc.data(),
        id: doc.id
        }
})};

export async function getItemsByCategory(category){
    const miProducts = collection(fireStoreDb,'items');
    const queryItem = query(miProducts, where("category", '==', category));
    const itemSnapshot = await getDocs(queryItem);

    return itemSnapshot.docs.map(doc => {
        return {
        ...doc.data(),
        id: doc.id
        }
    
})};

export async function getItem(id){
    const miProducts = collection(fireStoreDb,'items');
    const itemRef = doc(miProducts, id);
    const itemSnapshot = await getDoc(itemRef);

    
        return {
        ...itemSnapshot.data(),
        id: itemSnapshot.id
        }
    
};

export async function createBuyOrder(orderData){
    const buyTimeStamp = Timestamp.now();
    const orderWithDate = {
        ...orderData,
        date: buyTimeStamp
    };
    const miProducts = collection(fireStoreDb,'buyOrders');
    const orderDoc = await addDoc(miProducts, orderWithDate);
    console.log("Orden lista con el id ",orderDoc.id);
    return orderDoc.id;   
}

