<template>
  <div id="sidebar" class="flex flex-col justify-between w-24 h-screen border-r bg-white">
    <div class="pt-10">
      <!-- logo -->
      <div class="inline-flex items-center justify-center w-20 h-20">
        <div class="block w-10 h-10 text-white bg-emerald-500 rounded-lg"></div>
      </div>

      <!-- sidebar item -->
      <div class="">
        <nav class="flex flex-col p-1">
          <div class="py-auto mt-12 mb-2">
            <router-link
              to="/"
              class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
            >
              <HomeIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
              <!-- <span class="text-sm font-semibold px-4">Home</span> -->
            </router-link>
          </div>

          <ul class="pt-4 space-y-6">
            <li>
              <router-link
                to="/diary"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <BookOpenIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
                <!-- <span class="text-sm px-4">Diary</span> -->
              </router-link>
            </li>

            <li>
              <router-link
                to="/todolist"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <ClipboardListIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
                <!-- <span class="text-sm px-4">To-do list</span> -->
              </router-link>
            </li>

            <li>
              <router-link
                to="/note"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <DocumentTextIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
                <!-- <span class="text-sm px-4">Note</span> -->
              </router-link>
            </li>

            <!-- <li>
              <router-link
                to="/planner"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <CalendarIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm px-4">Planner</span>
              </router-link>
            </li> -->

            <li>
              <router-link
                to="/setting"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <CogIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
                <!-- <span class="text-sm px-4">Setting</span> -->
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
        class="flex justify-center w-full px-2 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
      >
        <LogoutIcon class="h-5 w-5 text-gray-500 hover:text-red-500" />
        <!-- <span class="text-sm font-semibold px-4">Logout</span> -->
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
