<template>
  <div id="sidebar" class="flex flex-col justify-between w-72 h-screen">
    <div>
      <div class="inline-flex items-center justify-center w-16 h-16">
        <span class="block w-10 h-10 bg-gray-200 rounded-lg"></span>
      </div>

      <div class="border-t border-gray-100">
        <nav class="flex flex-col p-2">
          <div class="py-auto mb-2">
            <router-link
              to="/home"
              class="flex justify-start px-12 py-1.5 t text-blue-700 rounded bg-green-50 group relative"
            >
              <HomeIcon class="h-5 w-5 text-gray-500" />
              <span class="text-sm font-semibold px-4">Home</span>
            </router-link>
          </div>

          <ul class="pt-4 space-y-2 border-t border-gray-100">
            <li>
              <router-link
                to=""
                class="flex justify-start px-12 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <BookOpenIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Diary</span>
              </router-link>
            </li>

            <li>
              <router-link
                to=""
                class="flex relative group justify-start px-12 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <ClipboardListIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">To-do list</span>
              </router-link>
            </li>

            <li>
              <router-link
                to=""
                class="relative group flex justify-start px-12 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <DocumentTextIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Memo</span>
              </router-link>
            </li>

            <li>
              <router-link
                to=""
                class="flex justify-start px-12 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <CalendarIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Planner</span>
              </router-link>
            </li>

            <li>
              <router-link
                to=""
                class="relative group flex justify-start px-12 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <CogIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Setting</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky inset-x-0 bottom-0 p-4 bg-white border-t border-gray-100">
      <form action="/logout">
        <button
          type="submit"
          class="flex justify-start w-full px-12 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 group relative"
        >
          <LogoutIcon class="h-5 w-5 text-gray-500" />
          <span class="text-sm font-semibold px-4">Logout</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardListIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/vue/outline'

export default {
  components: {
    HomeIcon,
    BookOpenIcon,
    ClipboardListIcon,
    CalendarIcon,
    DocumentTextIcon,
    CogIcon,
    LogoutIcon,
  },
}
</script>

<style lang="scss">
#sidebar {
  position: static;
}
</style>
