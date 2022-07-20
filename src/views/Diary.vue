<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen h-screen bg-emerald-50">
    <div class="max-w-screen-xl h-5/6 px-16 py-16 mx-auto my-16 bg-white rounded-2xl shadow">
      <h1 class="text-2xl font-semibold">Tell us your story</h1>
    </div>
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
