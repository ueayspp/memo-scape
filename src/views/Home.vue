<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen bg-gray-100">
    <HomeHeader />
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  components: {
    Sidebar,
    HomeHeader,
  },
}
</script>
