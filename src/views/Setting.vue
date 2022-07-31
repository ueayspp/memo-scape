<template>
  <Sidebar />
  <RouterView />
  <div id="setting" class="w-screen flex flex-row bg-gray-50">
    <section class="w-1/3">
      <h1 class="text-start text-2xl font-bold mt-20 mb-4 ml-20">Account</h1>
      <h2 class="text-start text-gray-500 text-lg font-semibold ml-20">Profile & Setting</h2>
    </section>
    <section class="w-2/3 text-start bg-white my-20 mr-20 shadow rounded-lg">
      <div class="flex flex-col text-start content-center px-20 py-20">
        <div class="flex justify-center">
          <img
            :src="photoURL"
            alt="profile"
            class="w-40 h-40 mb-8 rounded-full cursor-pointer"
            @click.prevent="editImgURL()"
          />
        </div>

        <div class="flex justify-center">
          <label class="font-semibold">
            {{ displayName }}
            <button class="" @click.prevent="editDisplayName()">
              <PencilIcon class="h-3 w-3 text-gray-500" /></button
          ></label>
        </div>

        <div class="flex justify-center">
          <label class="font-medium">{{ email }}</label>
        </div>

        <div class="grid justify-center">
          <button
            @click="updateEmail()"
            class="w-96 mt-10 px-auto py-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border rounded-lg"
          >
            Update Email
          </button>

          <button
            @click="resetPassword()"
            class="w-96 mt-2 px-auto py-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border rounded-lg"
          >
            Reset Password
          </button>

          <button
            @click="deleteAccount()"
            class="w-96 mt-2 mb-2 px-auto py-3 text-sm font-semibold text-red-500 bg-gray-50 hover:text-white hover:bg-red-700 border rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import Sidebar from '@/components/Sidebar.vue'
import { db } from '@/main'
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  updateProfile,
  deleteUser,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'

export default {
  components: {
    PencilIcon,
    Sidebar,
  },
  name: 'setting',
  data() {
    return {
      uid: null,
      displayName: '',
      email: '',
      photoURL: '',
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      this.displayName = user.displayName
      this.email = user.email
      this.photoURL = user.photoURL
      console.log('DisplayName: ' + this.displayName)
      console.log('Email: ' + this.email)
      console.log('Photo: ' + this.photoURL)
    }
  },
  methods: {
    editImgURL() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        photoURL: prompt('Enter your imgURL:'),
      })
        .then(() => {
          // Profile updated!
          alert('Update Image!')
        })
        .catch((error) => {
          // An error occurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
    editDisplayName() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        displayName: prompt('Enter your username:'),
      })
        .then(() => {
          // Profile updated!
          alert('Update Display Name!')
        })
        .catch((error) => {
          // An error occurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
    updateEmail() {
      const auth = getAuth()
      const newEmail = prompt('Enter your new email:')

      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          // Email updated!
          alert('Update Email!')
        })
        .catch((error) => {
          // An error occurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
    resetPassword() {
      const auth = getAuth()

      const user = auth.currentUser
      const newPassword = prompt('Enter your new password:')

      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          alert('Update Password!')
        })
        .catch((error) => {
          // An error ocurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
    deleteAccount() {
      const auth = getAuth()
      const user = auth.currentUser

      deleteUser(user)
        .then(() => {
          // User deleted.
          alert('Delete User!')
          this.$router.push('/login')
        })
        .catch((error) => {
          // An error ocurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#todolist {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
