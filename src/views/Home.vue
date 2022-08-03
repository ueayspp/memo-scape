<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen h-screen px-16 py-16 bg-gray-50">
    <div class="w-full">
      <h1 class="text-3xl text-start font-bold">Welcome Back, {{ displayName }} !</h1>
      <p class="text-lg text-gray-500 text-start font-semibold mt-2">Let's share something</p>
      <hr class="mt-8" />
    </div>

    <div class="flex flex-col">
      <!--  -->
      <section class="">
        <h1 class="text-xl text-start font-bold pt-8 pb-4">Summary</h1>
        <div class="w-full h-72 bg-emerald-500 shadow rounded-lg">
          <h1 class="">Sai a rai dee</h1>
        </div>
      </section>

      <!-- Query Today's Duedate -->
      <section class="">
        <h1 class="text-xl text-start font-bold pt-8 pb-4">Todo</h1>
        <div class="w-full h-48 space-y-8 overflow-auto">
          <ul class="grid grid-cols-2 gap-2 w-full text-start">
            <li
              v-for="todo in todos"
              :key="todo.id"
              class="flex justify-between px-8 py-4 rounded-md bg-white shadow-lg"
            >
              <label v-if="currentlyEditing !== todo.id">
                <input v-model="todo.done" @click="checkTodo(todo)" type="checkbox" class="mr-4" />
                {{ todo.content }}
              </label>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
  <Sidebar2 />
</template>

<script>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import Sidebar from '@/components/Sidebar.vue'
import Sidebar2 from '@/components/Sidebar2.vue'
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
    Sidebar2,
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
      const todosCollection = query(
        collection(db, 'todos'),
        where('uid', '==', this.uid),
        where('done', '==', false),
      )
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
      console.log('done: ', todo.id)

      await updateDoc(doc(db, 'todos', todo.id), {
        done: true,
      })
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
</style>
