<template>
  <div id="sidebar" class="flex flex-col justify-between w-96 h-screen border-r bg-white">
    <div>
      <div class="inline-flex items-center justify-center w-20 h-20">
        <div class="block w-10 h-10 bg-gray-200 rounded-lg"></div>
      </div>

      <div class="border-t border-gray-100">
        <nav class="flex flex-col p-2">
          <div class="py-auto mb-2">
            <router-link
              to="/"
              class="flex justify-start px-8 py-1.5 t text-gray-500 group relative"
            >
              <HomeIcon class="h-5 w-5 text-gray-500" />
              <span class="text-sm font-semibold px-4">Home</span>
            </router-link>
          </div>

          <ul class="pt-4 space-y-2 border-t border-gray-100">
            <li>
              <router-link
                to="/diary"
                class="flex justify-start px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <BookOpenIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Diary</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/todolist"
                class="flex relative group justify-start px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <ClipboardListIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">To-do list</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/memo"
                class="relative group flex justify-start px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <DocumentTextIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Memo</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/planner"
                class="flex justify-start px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <CalendarIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Planner</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/setting"
                class="relative group flex justify-start px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
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
      <button
        type="submit"
        @click="logout"
        class="flex justify-center w-full px-2 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 group relative"
      >
        <LogoutIcon class="h-5 w-5 text-gray-500" />
        <span class="text-sm font-semibold px-4">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardListIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/vue/outline'
import Cookies from 'js-cookie'
import { getAuth, signOut } from 'firebase/auth'

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
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          Cookies.remove('accessToken')
          this.$router.push('/login')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
        })
    },
  },
}
</script>

<style lang="scss">
#sidebar {
  position: static;
}
</style>
