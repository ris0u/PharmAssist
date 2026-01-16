<template>
    <div class="history-wrapper">
      <div class="header">
        <h2 class="header-title">Medication History</h2>
        <p class="header-description">
          Track and view your medication history in one place
        </p>
      </div>
  
      <div class="main-content">
        <!-- LEFT -->
        <div class="calendar-container">
          <p class="calendar-header">Select a date</p>
  
          <VueDatePicker
            v-model="selectedDate"
            class="date-picker"
            placeholder="Pick a date"
            :enable-time-picker="false"
          />
  
          <div class="date-info" v-if="selectedDate">
            <p class="date-display">{{ formattedDate }}</p>
          </div>
        </div>
  
        <!-- RIGHT -->
        <div class="result-history-container">
          <span class="calendar-header">On this day, you have taken</span>
  
          <div v-if="selectedDate && medicines.length > 0" class="medicines-list">
            <div
              v-for="(med, idx) in medicines"
              :key="idx"
              class="medicine-card"
            >
              <div class="med-header">
                <span class="med-box">TAKEN</span>
                <span class="med-time">{{ med.time }}</span>
              </div>
  
              <p class="med-name">{{ med.medicine }}</p>
              <p class="med-dose">
                Last taken: {{ formatISO(med.lastTaken) }}
              </p>
            </div>
          </div>
  
          <div v-else-if="selectedDate && !store.loading" class="no-medicines">
            <p>No medications taken on this date</p>
          </div>
  
          <div v-else class="no-date-selected">
            <p>Select a date to view medications</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue"
  import { VueDatePicker } from "@vuepic/vue-datepicker"
  import "@vuepic/vue-datepicker/dist/main.css"
  import { useRecordsStore } from "../JS/handlehistory"
  
  const selectedDate = ref(null)
  const store = useRecordsStore()
  
  // fetch records when date changes
  watch(selectedDate, (val) => {
    if (!val) return
    const dateKey = new Date(val).toISOString().split("T")[0]
    store.fetchByDate(dateKey)
  })
  
  const formattedDate = computed(() => {
    if (!selectedDate.value) return ""
    return new Date(selectedDate.value).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  })
  
  // convert records object to array
  const medicines = computed(() => {
    return Object.entries(store.records).map(([medicine, data]) => ({
      medicine,
      time: data.time,
      lastTaken: data.lastTaken
    })).sort((a, b) => a.time.localeCompare(b.time))
  })
  
  function formatISO(iso) {
    return new Date(iso).toLocaleString("en-US")
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .history-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .header-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #44403c;
  }
  
  .header-description {
    color: #78716c;
  }
  
  .main-content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
  }
  
  .calendar-container,
  .result-history-container {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
  
  .calendar-header {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .date-info {
    background: #f0f4ff;
    padding: 1rem;
    border-left: 4px solid #5b8df9;
    border-radius: 8px;
  }
  
  .date-display {
    color: #5b8df9;
    font-weight: 600;
  }
  
  .medicines-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }
  
  .medicine-card {
    background: #f7f9fc;
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 5px solid #5b8df9;
  }
  
  .med-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .med-box {
    background: #5b8df9;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .med-time {
    color: #5b8df9;
    font-weight: 600;
  }
  
  .med-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #44403c;
  }
  
  .med-dose {
    color: #78716c;
    font-size: 0.9rem;
  }
  
  .no-medicines,
  .no-date-selected {
    text-align: center;
    padding: 3rem;
    color: #a19f9c;
  }
  
  @media (max-width: 1024px) {
    .main-content {
      grid-template-columns: 1fr;
    }
  }
  </style>
  