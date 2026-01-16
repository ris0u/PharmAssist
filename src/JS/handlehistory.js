import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "./firebase"
import { ref as dbRef, get } from "firebase/database"

export const useRecordsStore = defineStore("records", () => {
  const records = ref({})
  const loading = ref(false)

  async function fetchByDate(date) {
    loading.value = true
    records.value = {}

    const snap = await get(dbRef(db, `records/${date}`))
    if (snap.exists()) {
      records.value = snap.val()
    }

    loading.value = false
  }

  return {
    records,
    loading,
    fetchByDate
  }
})
