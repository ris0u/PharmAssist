<template>
    <div class="container">
      <h2 class="title">Register & Add Medicines</h2>
  
      <div class="card scrollable">
        <h3>Register & Add Medicines</h3>
  
        <form @submit.prevent="submitForm">
          <!-- USER INFO -->
          <input type="text" v-model="name" placeholder="Full Name" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <input type="password" v-model="confirm" placeholder="Confirm Password" required />
  
          <button type="submit">Register & Save Medicines</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { handleregister } from '../JS/handleregister'
    
    const profile = handleregister()
    
    // User
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirm = ref('')
    
    // Medicines Boxes
    const medicine1 = ref(''); const time1 = ref(''); const dose1 = ref('')
    const medicine2 = ref(''); const time2 = ref(''); const dose2 = ref('')
    const medicine3 = ref(''); const time3 = ref(''); const dose3 = ref('')
    
    const submitForm = async () => {
      if (password.value !== confirm.value) {
        alert('Passwords do not match!')
        return
      }
    
      const userData = { name: name.value, email: email.value, password: password.value }
    
      // Save to Pinia store
      profile.saveProfile(userData)
    
      // Optional: sync to Firebase
      const saved = await profile.saveToFirebase()
      if (saved) alert('Registration successful!')
    
      // Reset form
      name.value = ''; email.value = ''; password.value = ''; confirm.value = ''
    }
    </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  .container {
    max-width: 600px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: Poppins, sans-serif;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-weight: 600;
  }
  
  /* CARD STYLE */
  .card {
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
  
  /* Scrollable if form gets long */
  .scrollable {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
  }
  
  /* HEADINGS */
  h3 {
    margin-bottom: 15px;
    color: #444;
    font-weight: 600;
  }
  
  h4 {
    margin-bottom: 10px;
    color: #5b8df9;
    font-weight: 600;
    margin-top: 15px;
  }
  
  /* FORM INPUTS */
  form input,
  form button {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  
  /* BUTTON STYLE */
  form button {
    background: #5b8df9;
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
  
  form button:hover {
    background: #3f6ae0;
  }
  
  hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #eee;
  }
  </style>
  