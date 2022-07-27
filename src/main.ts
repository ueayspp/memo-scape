import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/main.scss'
import 'v-calendar/dist/style.css'
import SetupCalendar from 'v-calendar'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCF5pPOE7DFK9OArPANs9oKIELBEFNO0yw',
  authDomain: 'memo-scape.firebaseapp.com',
  projectId: 'memo-scape',
  storageBucket: 'memo-scape.appspot.com',
  messagingSenderId: '588975336657',
  appId: '1:588975336657:web:6c0725fc20e48ca93529f0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

createApp(App).use(SetupCalendar, {}).use(router).mount('#app')
