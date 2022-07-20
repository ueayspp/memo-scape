<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen bg-gray-100"></div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar,
  },
}
</script>
