<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen bg-white">
    <HomeHeader />
    <HomeContent />
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeContent from '@/components/HomeContent.vue'

export default {
  components: {
    Sidebar,
    HomeHeader,
    HomeContent,
  },
}
</script>
