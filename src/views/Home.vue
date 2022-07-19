<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen bg-gray-100">
    <header>
      <div class="max-w-screen-xl px-16 py-16 mx-auto mt-12 bg-white rounded-2xl shadow">
        <div class="text-left">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back, Ueay!</h1>
          <p class="mt-1.5 text-medium text-gray-500">Let's share something! 🎉</p>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar,
  },
}
</script>
