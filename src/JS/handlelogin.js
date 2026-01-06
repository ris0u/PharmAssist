//handlelogin.js
import { defineStore } from 'pinia'
import { getDatabase, ref, get, update } from 'firebase/database'
import { useMedicineStore } from './handlemedicine'
export const handlelogin = defineStore('profile', {
  state: () => ({
    email: '',
    password: '',
    lastLog: null  
  }),
  actions: {
    async loginCredentials(Email, Password) {
      this.email = Email
      this.password = Password

      console.log('Login credentials saved:', this.email, this.password)

      const db = getDatabase()
      const safeEmail = this.email.replace(/\./g, ',').replace(/@/g, '_')
      const userRef = ref(db, `users/${safeEmail}`)

      const medicineStore = useMedicineStore()

      try {
        const snapshot = await get(userRef)

        if (!snapshot.exists()) {
          console.error('No user found with email:', this.email)
          return false
        } else if (snapshot.val().password !== this.password) {
          console.error('Incorrect password for email:', this.email)
          return false
        } else {
          console.log('User logged in successfully:', this.email)

          const now = new Date().toISOString()
          await update(userRef, { lastLog: now })

          this.lastLog = now
          console.log('Updated lastLog:', now)
          medicineStore.safeEmail = safeEmail
          return true
        }
      } catch (err) {
        console.error('Firebase error:', err)
        return false
      }
    }
  }
})
