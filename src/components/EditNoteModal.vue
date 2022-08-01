<template>
  <Transition name="EditNoteModal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">
            <XIcon class="w-5 h-5" />
          </button>

          <form class="flex flex-col">
            <label class="flex flex-col p-10">
              <h1 class="mb-6 text-xl text-emerald-500 text-start font-semibold">Edit</h1>
              <input
                v-model.trim="editNoteTitle"
                type="text"
                class="border-none focus:outline-none"
              />
              <textarea
                v-model.trim="editNoteContent"
                type="text"
                class="h-56 bg-slate-200 border-none focus:outline-none"
              ></textarea>
            </label>
            <div class="flex justify-center">
              <button
                type="submit"
                class="w-20 px-4 py-2 text-white font-semibold bg-emerald-500 hover:bg-emerald-700 rounded-full"
                @click.prevent="updateNote"
              >
                Save
              </button>
            </div>
          </form>
          <!-- <form class="flex flex-col">
            <label class="">
              Edit:
              <input v-model.trim="editNoteTitle" type="text" class="" />
              <input v-model.trim="editNoteContent" type="text" class="" />
            </label>
            <button type="submit" class="" @click.prevent="updateNote">Save</button>
          </form> -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { XIcon } from '@heroicons/vue/outline'
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
  props: {
    show: Boolean,
  },
  components: {
    XIcon,
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
  async created() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const uuid = user.uid
      this.uid = uuid
      console.log('get uid: ' + this.uid)
    }

    await this.subscribeNotesCollection()
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
      this.$emit('close')
    },
    async subscribeNotesCollection() {
      // diarysCollection => เปลี่ยนเป็น query แบบบรรทัดที่ 112 เพื่อให้เห็นเฉพาะของ user นั้นๆ
      const notesCollection = query(collection(db, 'notes'), where('uid', '==', this.uid))
      await onSnapshot(notesCollection, (snap) => {
        const docChanges = snap.docChanges()
        docChanges.forEach((docChange) => {
          const doc = docChange.doc
          switch (docChange.type) {
            case 'added': {
              let noteData = doc.data()
              noteData.id = doc.id
              this.notes.push(noteData)
              break
            }
            case 'removed': {
              this.notes = this.notes.filter((it) => it.id !== doc.id)
              break
            }
          }
        })
      })
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
    async deleteNote(noteID) {
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
#note {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  height: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
