<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen h-screen p-20 bg-gray-100">
    <h1 class="text-5xl text-center font-bold">Take a Note</h1>

    <div class="flex justify-center">
      <button
        id="show-modal"
        @click="showModal = true"
        class="flex px-4 py-2 my-8 text-white font-bold bg-emerald-500 hover:bg-emerald-700 rounded-full"
      >
        <PlusSmIcon class="w-5 h-5" />
        Create
      </button>

      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <CreateNoteModal :show="showModal" @close="showModal = false"> </CreateNoteModal>
      </Teleport>
    </div>

    <div class="h-128 overflow-auto">
      <ul class="grid grid-cols-4 gap-4">
        <li
          v-for="note in notes"
          :key="note.id"
          class="w-56 h-fit relative bg-white rounded-lg drop-shadow-xl"
        >
          <!-- check if currentlyEditing or not -->
          <!-- DISPLAY FORM -->
          <label v-if="currentlyEditing !== note.id" class="">
            <h1 class="text-xl text-start font-bold p-6">{{ note.title }}</h1>
            <p class="text-sm text-start font-bold px-6 pb-6">{{ note.content }}</p>
          </label>
          <div class="absolute bottom-4 right-4" v-if="currentlyEditing !== note.id">
            <button class="" id="show-modal" @click.prevent="editNote(note)">
              <PencilIcon class="h-5 w-5 text-emerald-500" />
            </button>
            <button class="" @click.prevent="deleteNote(note.id)">
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
          </div>

          <!-- EDIT FORM -->
          <form v-else class="w-56 h-fit">
            <label class="flex flex-col p-4">
              <input
                v-model.trim="editNoteTitle"
                type="text"
                class="text-xl text-start font-bold m-2 border-none focus:outline-none"
              />
              <textarea
                v-model.trim="editNoteContent"
                type="text"
                class="h-48 resize-none text-sm text-start font-bold mx-2 border-none focus:outline-none"
              ></textarea>
            </label>

            <button
              type="submit"
              class="w-12 px-auto absolute bottom-4 right-4 text-sm text-white font-semibold bg-emerald-500 hover:bg-emerald-700 rounded-full"
              @click.prevent="updateNote"
            >
              Save
            </button>
          </form>
        </li>
      </ul>
    </div>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <EditNoteModal :show="showModal" @close="showModal = false"> </EditNoteModal>
    </Teleport>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'
import Sidebar from '@/components/Sidebar.vue'
import CreateNoteModal from '@/components/CreateNoteModal.vue'
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
    show: false,
  },
  components: {
    PencilIcon,
    TrashIcon,
    PlusSmIcon,
    Sidebar,
    CreateNoteModal,
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
      showModal: false,
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
    },
    async subscribeNotesCollection() {
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
            case 'modified': {
              let noteData = doc.data()
              noteData.id = doc.id
              console.log(noteData)
              console.log(this.notes)

              // search index
              var index = this.notes
                .map(function (e) {
                  return e.id
                })
                .indexOf(noteData.id)
              this.notes[index] = noteData
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
      this.currentlyEditing = null
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
*:focus {
  outline: none !important;
}
</style>
