<template>
  <Sidebar />
  <RouterView />
  <div id="note" class="w-screen bg-gray-100">
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          Title:
          <input v-model="newTitle" type="text" class="new-todo-input" />
          Content:
          <input v-model="newContent" type="text" class="new-todo-input" />
        </label>
        <button type="submit" class="new-todo-button" @click.prevent="addNote">Add</button>
      </form>
      <ul class="todo-list">
        <li v-for="note in notes" :key="note.id" class="todo-item">
          <!-- check if currentlyEditing or not -->
          <!-- if !currentlyEditing => display checkbox, todoContent -->
          <label v-if="currentlyEditing !== note.id" class="todo-item-label">
            {{ note.title }}
            {{ note.content }}
          </label>

          <!-- if !currentlyEditing => display editBtn, delBtn -->
          <div class="pr-4" v-if="currentlyEditing !== note.id">
            <button class="todo-button" @click.prevent="editNote(note)">
              <PencilIcon class="h-5 w-5 text-emerald-500" />
            </button>
            <button class="todo-button" @click.prevent="deleteNote(note.id)">
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
          </div>

          <!-- if currentlyEditing => display editForm, saveBtn -->
          <form v-else class="edit-todo-form">
            <label class="edit-todo-label">
              Edit:
              <input v-model.trim="editNoteTitle" type="text" class="edit-todo-input" />
              <input v-model.trim="editNoteContent" type="text" class="edit-todo-input" />
            </label>
            <button type="submit" class="edit-todo-button" @click.prevent="updateNote">Save</button>
          </form>
        </li>
      </ul>
    </section>
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
      newTitle: '',
      newContent: '',
      notes: [],
      currentlyEditing: null,
      editNoteTitle: '',
      editNoteContent: '',
      uid: null,
    }
  },
  created() {
    this.getNote()

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid
      console.log('UID: ' + uid)
      return (this.uid = user.uid)
    })
  },
  methods: {
    async addNote() {
      const colRef = collection(db, 'notes')
      const dataObj = {
        title: this.newTitle,
        content: this.newContent,
        uid: this.uid,
      }
      const docRef = await addDoc(colRef, dataObj)
      console.log('Document written with ID: ', docRef.id)
      this.newTitle = this.newContent = ''
    },
    async getNote() {
      const colRef = collection(db, 'notes')
      const q = query(collection(db, 'notes'), where('uid', '==', this.uid))
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     const todoData = doc.data()
      //     todoData.id = doc.id
      //     console.log(doc.id, ' => ', doc.data())
      //     this.todos.push(todoData)
      //   })
      //   console.log('TodoList: ', this.todos)
      // })
      await onSnapshot(colRef, (snap) => {
        snap.forEach((doc) => {
          let noteData = doc.data()
          noteData.id = doc.id
          console.log(doc.id, ' => ', doc.data())
          this.notes.push(noteData)
        })
      })
      // console.log(this.todos)
      // const querySnapshot = await getDocs(q)
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data())
      //   // add each doc to 'todos' array
      //   this.todos.push(doc.data())
      // })
    },
    async editNote(note) {
      this.currentlyEditing = note.id
      this.editNoteTitle = note.title
      this.editNoteContent = note.content
      console.log('Current doc ID: ', this.currentlyEditing)
      return this.currentlyEditing
    },
    async updateNote() {
      await updateDoc(doc(db, 'notes', this.currentlyEditing), {
        title: this.editNoteTitle,
        content: this.editNoteContent,
      })
    },
    async deleteMemo(noteID) {
      // retrieve all the documents and delete them
      const colRef = collection(db, 'notes')
      const noteRef = doc(colRef, noteID)
      await deleteDoc(noteRef)
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#todolist {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #42b983;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-todo-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: -3rem;
  background: white;
}
.new-todo-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: normal;
}
.new-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #42b983;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #42b983;
}
.edit-todo-form {
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding: 1rem;
}
.edit-todo-label {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}
.edit-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  font-weight: normal;
  flex: 1;
  margin-left: 1rem;
}
.edit-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: #42b983;
  font-weight: bold;
  margin-left: 1rem;
  border: 1px solid #42b983;
}
.todo-item {
  display: flex;
  align-items: center;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  justify-content: space-between;
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  &:last-of-type {
    border-bottom: 1px solid lightgrey;
    border-radius: 0 0 3px 3px;
  }
}
.todo-item-label {
  cursor: pointer;
  padding: 1rem;
}
.todo-item__checkbox {
  margin-right: 1rem;
}
.todo-list {
  max-width: 100%;
  margin: 2rem auto;
}
.todo-button {
  background: transparent;
  border: 0;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
