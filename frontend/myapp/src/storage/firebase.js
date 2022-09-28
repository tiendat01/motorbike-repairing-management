import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBl5UZrISXkWJi6_p5pjeLILfu5Oac97cQ",
  authDomain: "sapo-storage-mock-project.firebaseapp.com",
  projectId: "sapo-storage-mock-project",
  storageBucket: "sapo-storage-mock-project.appspot.com",
  messagingSenderId: "358253176250",
  appId: "1:358253176250:web:4dd3ab3dcf10d178082983"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);