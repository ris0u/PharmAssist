//handleschedule.js
import { defineStore } from 'pinia'
import { db } from './firebase.js'
import { ref, get } from 'firebase/database'

export const useHandleSchedule = defineStore('handleSchedule', {
  state: () => ({
    box1medicine: null,
    box1dose: 0,
    box1shed: null,

    box2medicine: null,
    box2dose: 0,
    box2shed: null,

    box3medicine: null,
    box3dose: 0,
    box3shed: null,

    box4medicine: null,
    box4dose: 0,
    box4shed: null
  }),
  actions: {
    async fetchBoxes() {
      const boxes = ['box1','box2','box3','box4']
      const types = ['daily','weekly']

      for (const box of boxes) {
        let medicine = null
        let dose = 0
        let shed = null

        for (const type of types) {
          const snap = await get(ref(db, medicine/${type}/${box}))
          if (!snap.exists()) continue

          const data = snap.val()

          // for weekly, skip if lastTaken is within 7 days
          if (type === 'weekly' && data.lastTaken) {
            const lastTaken = new Date(data.lastTaken)
            const now = new Date()
            const diffDays = (now - lastTaken)/(1000*60*60*24)
            if (diffDays < 7) continue
          }

          // assign only if not already assigned
          if (!medicine) medicine = data.medicine || null
          if (!dose && data.dose) dose = data.dose
          if (!shed && data.time) shed = data.time
        }

        this[`${box}medicine`] = medicine
        this[`${box}dose`] = dose
        this[`${box}shed`] = shed

        // 🔹 Debug console log
          console.log(Debug ${box}:, {
          medicine: this[`${box}medicine`],
          dose: this[`${box}dose`],
          scheduled: this[`${box}shed`]
        })
      }
    }
  }
})