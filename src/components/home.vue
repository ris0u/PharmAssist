<template>
    <div class="container">
      <h2>Medicine Scheduler</h2>
  
      <div class="scheduler">
        <!-- LEFT: Form -->
        <div class="form-card">
          <h3>Add Medicine</h3>
          <form @submit.prevent="save">
            <select v-model="box" required>
              <option disabled value="">Select Box</option>
              <option value="box1">Box 1</option>
              <option value="box2">Box 2</option>
              <option value="box3">Box 3</option>
              <option value="box4">Box 4</option>
            </select>
  
            <input
              type="text"
              v-model="medicine"
              placeholder="Medicine name"
              required
            />
  
            <input
              type="time"
              v-model="time"
              required
            />
  
            <input
              type="number"
              v-model="dose"
              placeholder="Dose"
              min="1"
              required
            />
  
            <button type="submit">Save</button>
          </form>
        </div>
  
        <!-- RIGHT: Display -->
        <div class="display-card">
          <h3>Scheduled Medicines</h3>
          <div class="med-list">
            <div
              v-for="(data, key) in store.medicines"
              :key="key"
              class="med-item"
            >
              <strong class="med-box">{{ key.toUpperCase() }}</strong>
              <p><span class="med-label">Medicine:</span> {{ data.medicine }}</p>
              <p><span class="med-label">Time:</span> {{ data.time }}</p>
              <p><span class="med-label">Dose left:</span> {{ data.dose }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useMedicineStore } from "../JS/handlemedicine";
  
  const store = useMedicineStore();
  
  const box = ref("");
  const medicine = ref("");
  const time = ref("");
  const dose = ref("");
  
  const save = async () => {
    await store.saveMedicine(box.value, medicine.value, time.value, dose.value);
  
    // reset form
    box.value = "";
    medicine.value = "";
    time.value = "";
    dose.value = "";
  };
  
  onMounted(() => {
    store.listenMedicines();
  });
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .container {
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .scheduler {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  
  /* FORM CARD */
  .form-card {
    flex: 1;
    min-width: 280px;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
  
  .form-card h3 {
    margin-bottom: 20px;
    color: #444;
    font-weight: 600;
  }
  
  .form-card input,
  .form-card select {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    transition: border 0.2s;
    font-family: 'Poppins', sans-serif;
  }
  
  .form-card input:focus,
  .form-card select:focus {
    border-color: #5b8df9;
    outline: none;
  }
  
  .form-card button {
    width: 100%;
    padding: 12px;
    background: #5b8df9;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'Poppins', sans-serif;
  }
  
  .form-card button:hover {
    background: #3f6ae0;
  }
  
  /* DISPLAY CARD */
  .display-card {
    flex: 1;
    min-width: 280px;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
    max-height: 500px;
    overflow-y: auto;
  }
  
  .display-card h3 {
    margin-bottom: 20px;
    color: #444;
    font-weight: 600;
  }
  
  .med-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .med-item {
    padding: 15px;
    border-radius: 10px;
    background: #f7f9fc;
    border-left: 5px solid #5b8df9;
    transition: transform 0.2s;
  }
  
  .med-item:hover {
    transform: translateX(5px);
  }
  
  .med-item p {
    margin: 4px 0;
    font-size: 14px;
    color: #555;
  }
  
  .med-item span {
    font-weight: 600;
    color: #333;
  }
  
  .med-box {
    font-family: 'Courier New', Courier, monospace; /* distinct, techy look */
    color: #5b8df9;
    font-size: 16px;
  }
  
  /* RESPONSIVE */
  @media (max-width: 700px) {
    .scheduler {
      flex-direction: column;
    }
  }
  </style>
  