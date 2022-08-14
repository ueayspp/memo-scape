<template>
  <Sidebar />
  <RouterView />
  <div class="w-screen h-screen p-20 bg-gray-100">
    <h1 class="text-5xl text-center font-bold">Diary</h1>

    <!-- NEW DIARY MODAL -->
    <div class="flex justify-start">
      <button
        id="show-modal"
        @click="showModal = true"
        class="flex px-4 py-2 my-8 text-white font-bold bg-emerald-500 hover:bg-emerald-700 rounded-full"
      >
        <PlusSmIcon class="w-5 h-5" />
        New Diary
      </button>

      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <CreateDiaryModal :show="showModal" @close="showModal = false"> </CreateDiaryModal>
      </Teleport>
    </div>

    <div class="flex">
      <!-- DISPLAY -->
      <div class="w-1/3 h-128 overflow-auto">
        <!-- Loading -->
        <div v-if="!diarys.length" class="flex-col w-96 animate-pulse">
          <div class="p-16 mb-1 bg-gray-200"></div>
          <div class="p-16 mb-1 bg-gray-200"></div>
          <div class="p-16 mb-1 bg-gray-200"></div>
        </div>
        <ul class="flex-col w-96">
          <li v-for="diary in diarys" :key="diary.id" class="border-b-2 bg-white hover:bg-gray-50">
            <label @click.prevent="editDiary(diary)" class="relative hover:cursor-pointer">
              <p class="text-sm text-start text-emerald-500 font-bold p-6">{{ diary.createdAt }}</p>
              <h1 class="text-xl text-start font-bold px-6 pb-6">{{ diary.title }}</h1>
              <div class="absolute top-4 right-4">
                <button @click.prevent="deleteDiary(diary.id)" class="bg-red-500 h-8 w-8 px-1">
                  <TrashIcon class="h-5 w-5 text-white" />
                </button>
              </div>
            </label>
          </li>
        </ul>
      </div>

      <!-- FORM -->
      <div class="w-2/3 bg-green-50">
        <form class="w-full h-full p-20 text-start bg-white rounded-lg">
          <label class="flex flex-col">
            <input
              v-model.trim="editDiaryTitle"
              type="text"
              class="text-2xl text-start font-bold m-2 border-none focus:outline-none"
            />
            <textarea
              v-model.trim="editDiaryStory"
              type="text"
              class="h-48 resize-none text-md text-start font-bold mx-2 border-none focus:outline-none"
            ></textarea>

            <!-- DISPLAY IF SELECT DIARY -->
            <div v-if="currentlyEditing" class="pl-4">
              <button
                type="submit"
                class="w-16 px-4 py-2 text-sm text-white font-semibold bg-emerald-500 hover:bg-emerald-700 rounded-full"
                @click.prevent="updateDiary"
              >
                Save
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'
import Sidebar from '@/components/Sidebar.vue'
import CreateDiaryModal from '@/components/CreateDiaryModal.vue'
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
  orderBy,
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
    CreateDiaryModal,
  },
  name: 'diary',
  data() {
    return {
      newTitle: '',
      newStory: '',
      diarys: [],
      currentlyEditing: null,
      editDiaryTitle: '',
      editDiaryStory: '',
      uid: null,
      showModal: false,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.uid = user.uid
        console.log('getUID: ', this.uid)
        this.displayName = user.displayName
        this.subscribeDiarysCollection()
      })
    },
    subscribeDiarysCollection() {
      const diarysCollection = query(
        collection(db, 'diarys'),
        where('uid', '==', this.uid),
        orderBy('createdAt', 'desc'),
      )
      onSnapshot(diarysCollection, (snap) => {
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
            case 'modified': {
              let diaryData = doc.data()
              diaryData.id = doc.id
              console.log(diaryData)
              console.log(this.diarys)

              // search index
              var index = this.diarys
                .map(function (e) {
                  return e.id
                })
                .indexOf(diaryData.id)
              this.diarys[index] = diaryData
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
    editDiary(diary) {
      this.currentlyEditing = diary.id
      this.editDiaryTitle = diary.title
      this.editDiaryStory = diary.story
      console.log('Current doc ID: ', this.currentlyEditing)
      return this.currentlyEditing
    },
    updateDiary() {
      updateDoc(doc(db, 'diarys', this.currentlyEditing), {
        title: this.editDiaryTitle,
        story: this.editDiaryStory,
      })
    },
    deleteDiary(diaryID) {
      // retrieve all the documents and delete them
      const colRef = collection(db, 'diarys')
      const diaryRef = doc(colRef, diaryID)
      deleteDoc(diaryRef)
    },
  },
}
</script>

<style lang="scss" scoped>
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
