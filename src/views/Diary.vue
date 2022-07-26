<template>
  <Sidebar />
  <RouterView />
  <div id="diary" class="w-screen bg-gray-100">
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          Title:
          <input v-model="newTitle" type="text" class="new-todo-input" />
          Story:
          <input v-model="newStory" type="text" class="new-todo-input" />
        </label>
        <button type="submit" class="new-todo-button" @click.prevent="addDiary">Add</button>
      </form>
      <ul class="todo-list">
        <li v-for="diary in diarys" :key="diary.id" class="todo-item">
          <!-- check if currentlyEditing or not -->
          <!-- if !currentlyEditing => display checkbox, todoContent -->
          <label v-if="currentlyEditing !== diary.id" class="todo-item-label">
            {{ diary.title }}
            {{ diary.story }}
          </label>

          <!-- if !currentlyEditing => display editBtn, delBtn -->
          <div class="pr-4" v-if="currentlyEditing !== diary.id">
            <button class="todo-button" @click.prevent="editDiary(diary)">
              <PencilIcon class="h-5 w-5 text-emerald-500" />
            </button>
            <button class="todo-button" @click.prevent="deleteDiary(diary.id)">
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
          </div>

          <!-- if currentlyEditing => display editForm, saveBtn -->
          <form v-else class="edit-todo-form">
            <label class="edit-todo-label">
              Edit:
              <input v-model.trim="editDiaryTitle" type="text" class="edit-todo-input" />
              <input v-model.trim="editDiaryStory" type="text" class="edit-todo-input" />
            </label>
            <button type="submit" class="edit-todo-button" @click.prevent="updateDiary">
              Save
            </button>
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
      newStory: '',
      diarys: [],
      currentlyEditing: null,
      editDiaryTitle: '',
      editDiaryStory: '',
      uid: null,
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

    await this.subscribeDiarysCollection()
  },
  methods: {
    async addDiary() {
      const colRef = collection(db, 'diarys')
      const dataObj = {
        title: this.newTitle,
        story: this.newStory,
        uid: this.uid,
      }
      const docRef = await addDoc(colRef, dataObj)
      console.log('Document written with ID: ', docRef.id)
      this.newTitle = this.newStory = ''
    },
    async subscribeDiarysCollection() {
      // diarysCollection => เปลี่ยนเป็น query แบบบรรทัดที่ 112 เพื่อให้เห็นเฉพาะของ user นั้นๆ
      const diarysCollection = query(collection(db, 'diarys'), where('uid', '==', this.uid))
      await onSnapshot(diarysCollection, (snap) => {
        const docChanges = snap.docChanges()
        docChanges.forEach((docChange) => {
          const doc = docChange.doc
          switch (docChange.type) {
            case 'added': {
              let diaryData = doc.data()
              diaryData.id = doc.id
              this.diarys.push(diaryData)
              break
            }
            case 'removed': {
              this.diarys = this.diarys.filter((it) => it.id !== doc.id)
              break
            }
          }
        })
      })
    },
    async editDiary(diary) {
      this.currentlyEditing = diary.id
      this.editDiaryTitle = diary.title
      this.editDiaryStory = diary.story
      console.log('Current doc ID: ', this.currentlyEditing)
      return this.currentlyEditing
    },
    async updateDiary() {
      await updateDoc(doc(db, 'diarys', this.currentlyEditing), {
        title: this.editDiaryTitle,
        story: this.editDiaryStory,
      })
    },
    async deleteDiary(diaryID) {
      // retrieve all the documents and delete them
      const colRef = collection(db, 'diarys')
      const diaryRef = doc(colRef, diaryID)
      await deleteDoc(diaryRef)
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
