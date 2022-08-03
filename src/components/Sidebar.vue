<template>
  <div id="sidebar" class="flex flex-col justify-between w-24 h-screen border-r bg-white">
    <div class="pt-10">
      <!-- logo -->
      <div class="inline-flex items-center justify-center w-20 h-20">
        <div
          class="flex justify-center items-center w-10 h-10 text-white bg-gradient-to-br from-green-400 to-blue-400 rounded-lg"
        >
          <CloudIcon class="h-7 w-7 text-white" />
        </div>
      </div>

      <!-- sidebar item -->
      <div class="">
        <nav class="flex flex-col p-1">
          <div class="py-auto mt-12 mb-2">
            <router-link
              to="/"
              class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <!-- <HomeIcon
                class="h-5 w-5 text-gray-400 hover:text-emerald-500"
                :class="[isActive ? activeClass : '']"
              />
              <span class="text-sm font-semibold px-4" :class="[isActive ? activeClass : '']"
                >Home</span
              > -->
            </router-link>
          </div>

          <ul class="pt-4 space-y-6">
            <li>
              <router-link
                to="/diary"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <!-- <BookOpenIcon
                  class="h-5 w-5 text-gray-400 hover:text-emerald-500"
                  :class="[isActive ? activeClass : '', errorClass]"
                />
                <span class="text-sm px-4">Diary</span> -->
              </router-link>
            </li>

            <li>
              <router-link
                to="/todolist"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <!-- <ClipboardListIcon
                  class="h-5 w-5 text-gray-400 hover:text-emerald-500"
                  :class="[isActive ? activeClass : '', errorClass]"
                />
                <span class="text-sm px-4">To-do list</span> -->
              </router-link>
            </li>

            <li>
              <router-link
                to="/note"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <!-- <DocumentTextIcon
                  class="h-5 w-5 text-gray-400 hover:text-emerald-500"
                  :class="[isActive ? activeClass : '', errorClass]"
                />
                <span class="text-sm px-4">Note</span> -->
              </router-link>
            </li>

            <!-- <li>
              <router-link
                to="/planner"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
              >
                <CalendarIcon class="h-5 w-5 text-gray-400 hover:text-emerald-500" />
                <span class="text-sm px-4">Planner</span>
              </router-link>
            </li> -->

            <li>
              <router-link
                to="/setting"
                class="flex justify-center px-8 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <!-- <CogIcon
                  class="h-5 w-5 text-gray-400 hover:text-emerald-500"
                  :class="[isActive ? activeClass : '', errorClass]"
                />
                <span class="text-sm px-4">Setting</span> -->
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
        <LogoutIcon class="h-5 w-5 text-gray-400 hover:text-red-500" />
        <!-- <span class="text-sm font-semibold px-4">Logout</span> -->
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {
  CloudIcon,
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
    CloudIcon,
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
nav .active {
  color: #10b981;
}
</style>
