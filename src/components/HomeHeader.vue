<template>
  <header>
    <div class="max-w-screen-xl px-16 py-16 mx-auto my-12 bg-white rounded-2xl shadow">
      <div class="text-left">
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back, {{ getDisplayName() }}</h1>
        <p class="mt-1.5 text-medium text-gray-500">Let's share something 🎉</p>
      </div>
    </div>
  </header>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      displayName: '',
    }
  },
  methods: {
    getDisplayName() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user !== null) {
        this.displayName = user.displayName
        console.log('Display Name: ' + this.displayName)

        return `${this.displayName}`
      }
    },
  },
}
</script>
