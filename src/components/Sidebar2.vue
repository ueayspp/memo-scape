<template>
  <div id="sidebar" class="flex flex-col justify-between w-144 h-screen border-l bg-white">
    <div class="pt-10 mx-auto">
      <div class="flex">
        <div class="block w-16 h-16 bg-gray-300 rounded-full"></div>
        <div class="flex flex-col ml-4">
          <h1 class="text-lg text-start font-bold">username</h1>
          <h2 class="text-sm text-start text-gray-500 font-semibold">email</h2>
        </div>
      </div>

      <div class="w-72 h-72 py-10">
        <v-calendar is-expanded title-position="left" :attributes="attrs" />
      </div>

      <div class="mt-12">
        <h1 class="text-lg text-start font-bold">Upcoming events</h1>
        <ul class="mt-4 text-start">
          <li>event</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: 'green',
          dates: new Date(),
        },
        {
          dot: true,
          dates: [
            new Date(2022, 7, 1), // Jan 1st
            new Date(2022, 7, 10), // Jan 10th
            new Date(2022, 7, 22), // Jan 22nd
          ],
        },
        {
          dot: 'red',
          dates: [
            new Date(2022, 7, 4), // Jan 4th
            new Date(2022, 7, 10), // Jan 10th
            new Date(2022, 7, 15), // Jan 15th
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
#sidebar {
  position: static;
}
</style>
