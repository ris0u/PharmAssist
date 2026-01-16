// handleschedule.js
import { defineStore } from 'pinia'
import { db } from './firebase.js'
import { ref, get } from 'firebase/database'
import { toRaw } from 'vue'

// ---------------- HELPERS ----------------
function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

function isPastScheduledTime(timeStr) {
  if (!timeStr) return false
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  const sched = new Date()
  sched.setHours(h, m, 0, 0)
  return now > sched
}

function getRemainingTime(timeStr) {
  if (!timeStr) return null
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  const sched = new Date()
  sched.setHours(h, m, 0, 0)
  if (sched <= now) return null
  const diffMs = sched - now
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

// ---------------- STORE ----------------
export const useHandleSchedule = defineStore('handleSchedule', {
  state: () => ({
    // --- Boxes ---
    box1medicine: null,
    box1dose: 0,
    box1shed: null,
    box1schedtype: null,
    box1status: 'empty',

    box2medicine: null,
    box2dose: 0,
    box2shed: null,
    box2schedtype: null,
    box2status: 'empty',

    box3medicine: null,
    box3dose: 0,
    box3shed: null,
    box3schedtype: null,
    box3status: 'empty',

    box4medicine: null,
    box4dose: 0,
    box4shed: null,
    box4schedtype: null,
    box4status: 'empty',

    medremain: 0,
    upcomingshed: null,

    // --- Last 7 days status ---
    last7days: [] // [{date: 'YYYY-MM-DD', status: 'completed/incomplete/missed'}]
  }),

  actions: {
    // ---------------- FETCH BOXES + LAST 7 DAYS ----------------
    async fetchBoxes() {
      const boxes = ['box1','box2','box3','box4']
      const types = ['daily','weekly']

      this.medremain = 0
      this.upcomingshed = null
      let soonestDiff = null

      // --- FETCH BOXES ---
      for (const box of boxes) {
        let medicine = null
        let dose = 0
        let shed = null
        let status = 'empty'
        let schedType = null
        let hasData = false

        for (const type of types) {
          const snap = await get(ref(db, `medicine/${type}/${box}`))
          if (!snap.exists()) continue

          hasData = true
          schedType = type
          const data = snap.val()
          const now = new Date()
          const lastTaken = data.lastTaken ? new Date(data.lastTaken) : null

          if (type === 'daily') {
            if (lastTaken && isSameDay(lastTaken, now)) {
              status = 'taken'
            } else if (isPastScheduledTime(data.time)) {
              status = 'missed'
            } else {
              status = 'pending'
            }
          }

          if (type === 'weekly') {
            if (lastTaken) {
              const diffDays = (now - lastTaken) / (1000 * 60 * 60 * 24)
              status = diffDays < 7 ? 'taken' : 'missed'
            } else {
              status = 'pending'
            }
          }

          if (!medicine) medicine = data.medicine || null
          if (!dose && data.dose) dose = data.dose
          if (!shed && data.time) shed = data.time

          // -------- UPCOMING SHED LOGIC --------
          if (status === 'pending' && data.time) {
            const [h, m] = data.time.split(':').map(Number)
            const sched = new Date()
            sched.setHours(h, m, 0, 0)
            const diff = sched - now
            if (diff > 0 && (soonestDiff === null || diff < soonestDiff)) {
              soonestDiff = diff
              this.upcomingshed = getRemainingTime(data.time)
            }
          }
        }

        if (!hasData || !medicine) {
          status = 'empty'
          schedType = null
        }

        this[`${box}medicine`] = medicine
        this[`${box}dose`] = dose
        this[`${box}shed`] = shed
        this[`${box}schedtype`] = schedType
        this[`${box}status`] = status

        if (status === 'pending' || status === 'missed') {
          this.medremain++
        }
      }

      // --- FETCH LAST 7 DAYS STATUS ---
      const today = new Date()
      const last7 = []

      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]

        const snap = await get(ref(db, `records/${dateStr}`))
        let status = 'missed'

        if (snap.exists()) {
          const data = snap.val()
          const takenCount = Object.values(data).filter(med => med.lastTaken).length

          if (takenCount >= 3) status = 'completed'
          else if (takenCount >= 1) status = 'incomplete'
          else status = 'missed'
        }

        last7.push({ date: dateStr, status })
      }

      this.last7days = last7

      // --- LOG AS PLAIN ARRAY ---
      console.log('Upcoming scheduled time:', this.upcomingshed)
    }
  }
})
