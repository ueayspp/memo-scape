<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen bg-gray-50">
    <div class="px-10 py-10">
      <div
        class="w-full h-48 px-16 py-16 bg-gradient-to-br from-emerald-300 to-blue-200 rounded-lg"
      >
        <h1 class="text-3xl text-start font-bold">Welcome Back, {{ displayName }} !</h1>
        <p class="text-lg text-gray-500 text-start font-semibold">How's Your Day?</p>
      </div>

      <div class="flex">
        <!-- Calendar -->
        <div class="w-96 h-96 py-10"><v-calendar is-expanded :attributes="attrs" /></div>

        <!-- Query Today's Duedate -->
        <div class="w-128 h-96 mx-10 my-10 px-10 space-y-8">
          <h1 class="text-xl text-start font-bold">Today's Task</h1>
          <ul class="grid gap-2 w-full text-start">
            <li
              v-for="todo in todos"
              :key="todo.id"
              class="flex justify-between px-8 py-4 rounded-md bg-white shadow-lg"
            >
              <label v-if="currentlyEditing !== todo.id">
                <input @click="checkTodo(todo)" type="checkbox" class="mr-4" />
                {{ todo.content }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import Sidebar from '@/components/Sidebar.vue'
import { db } from '@/main'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'

export default {
  components: {
    PencilIcon,
    TrashIcon,
    Sidebar,
  },
  name: 'note',
  data() {
    return {
      displayName: '',
      newTodo: '',
      todos: [],
      currentlyEditing: null,
      uid: null,
      dueDate: '',
      attrs: [
        {
          key: 'today',
          highlight: 'green',
          dates: new Date(),
        },
      ],
    }
  },
  async created() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const uuid = user.uid
      this.uid = uuid
      console.log('get uid: ' + this.uid)
    }

    await this.getDisplayName()
    await this.subscribeTodosCollection()
  },
  methods: {
    async getDisplayName() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user !== null) {
        this.displayName = user.displayName
        console.log('Display Name: ' + this.displayName)

        return `${this.displayName}`
      }
    },
    async subscribeTodosCollection() {
      // diarysCollection => เปลี่ยนเป็น query แบบบรรทัดที่ 112 เพื่อให้เห็นเฉพาะของ user นั้นๆ
      const todosCollection = query(collection(db, 'todos'), where('uid', '==', this.uid))
      await onSnapshot(todosCollection, (snap) => {
        const docChanges = snap.docChanges()
        docChanges.forEach((docChange) => {
          const doc = docChange.doc
          switch (docChange.type) {
            case 'added': {
              let todoData = doc.data()
              todoData.id = doc.id
              this.todos.push(todoData)
              break
            }
            case 'removed': {
              this.todos = this.todos.filter((it) => it.id !== doc.id)
              break
            }
          }
        })
      })
    },
    async checkTodo(todo) {
      await updateDoc(doc(db, 'todos', this.currentlyEditing), {
        done: true,
      })
      this.currentlyEditing = null
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#diary {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.vc-weeks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
  -webkit-overflow-scrolling: touch;
  padding: 40px;
  min-width: 250px;
}
.vc-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 0;
}
.vc-day-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  width: 40px;
  height: 40px;
  line-height: 28px;
  border-radius: var(--rounded-full);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: pointer;
}
</style>
