<template>
  <header>
    <div class="w-screen mx-10 py-10 border-b border-gray-200">
      <section class="w-1/2 text-start">
        <h1 class="text-2xl font-bold text-gray-900">Welcome Back, {{ displayName }} !</h1>
        <p class="mt-1.5 text-medium text-gray-500">Let's share something 🎉</p>
      </section>
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
  created() {
    this.getDisplayName()
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
