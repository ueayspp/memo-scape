<template>
  <Sidebar />
  <RouterView />
  <div id="setting" class="w-screen bg-gray-100">
    <header class="page-header"></header>
    <section class="wrapper">
      <div class="new-todo-form h-80">
        <div
          id="img"
          @click.prevent="uploadImage()"
          class="block w-40 h-40 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          {{ photoURL }}
        </div>
        <label class="new-todo-label">
          {{ displayName }}
          <button class="todo-button" @click.prevent="editDisplayName()">
            <PencilIcon class="h-3 w-3 text-gray-500" /></button
        ></label>
        <label class="new-todo-label">Email: {{ email }}</label>
        <button
          @click="changePassword()"
          class="w-96 mt-10 px-auto py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg"
        >
          Change Password
        </button>
        <button
          @click="deleteAccount()"
          class="w-96 mt-2 mb-2 px-auto py-3 text-sm font-semibold text-white bg-red-500 rounded-lg"
        >
          Delete Account
        </button>
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
  updateProfile,
  updatePassword,
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
      photoURL: null,
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
    uploadImage() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        photoURL: '',
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        })
    },
    editDisplayName() {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
        displayName: prompt('Enter your username:'),
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
    changePassword() {
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #42b983;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-todo-form {
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgb(0 0 0 / 15%);
  margin-top: -3rem;
  background: white;
  flex-direction: column;
  align-items: center;
}
.new-todo-label {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: normal;
}
.new-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #42b983;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #42b983;
}
#img {
  margin-top: -5rem;
}
</style>
