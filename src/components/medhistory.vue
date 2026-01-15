<template>
    <div class="history-wrapper">
        <div class="header">
            <h2 class="header-title">Medication History</h2>
            <p class="header-description">Track and view your medication history in one place</p>
        </div>

        <div class="main-content">
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

            <div class="result-history-container">
                <span class="calendar-header">On this day, you have taken</span>
                
                <div v-if="selectedDate && filteredMedicines.length > 0" class="medicines-list">
                    <div v-for="(med, idx) in filteredMedicines" :key="idx" class="medicine-card">
                        <div class="med-header">
                            <span class="med-box">{{ med.box.toUpperCase() }}</span>
                            <span class="med-time">{{ med.time }}</span>
                        </div>
                        <p class="med-name">{{ med.medicine }}</p>
                        <p class="med-dose">Dose: {{ med.dose }}</p>
                    </div>
                </div>

                <div v-else-if="selectedDate" class="no-medicines">
                    <p>No medications scheduled for this date</p>
                </div>

                <div v-else class="no-date-selected">
                    <p>Select a date to view medications</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useMedicineStore } from '../JS/handlemedicine'

const selectedDate = ref(null)
const store = useMedicineStore()

const formattedDate = computed(() => {
    if (!selectedDate.value) return ''
    const date = new Date(selectedDate.value)
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
})

const filteredMedicines = computed(() => {
    if (!selectedDate.value) return []
    
    const selected = new Date(selectedDate.value).toISOString().split('T')[0]
    const medicines = []

    // Check daily medicines
    if (store.medicines.daily) {
        Object.entries(store.medicines.daily).forEach(([box, med]) => {
            if (med.lastTaken && new Date(med.lastTaken).toISOString().split('T')[0] === selected) {
                medicines.push({ ...med, box })
            }
        })
    }

    // Check weekly medicines
    if (store.medicines.weekly) {
        Object.entries(store.medicines.weekly).forEach(([box, med]) => {
            if (med.lastTaken && new Date(med.lastTaken).toISOString().split('T')[0] === selected) {
                medicines.push({ ...med, box })
            }
        })
    }

    return medicines.sort((a, b) => a.time.localeCompare(b.time))
})
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.history-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.header-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #44403c;
    background-color: transparent;
}

.header-description {
    font-weight: 600;
    color: #78716C;
}

.main-content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    height: fit-content;
}

.calendar-container {
    height: fit-content;
    background-color: #fff;
    padding: 2rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.calendar-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #44403c;
    background-color: transparent;
}

.date-picker {
    width: 100%;
    max-width: 100%;
}

:deep(.dp__input_wrap) {
    width: 100%;
    max-width: 100%;
}

:deep(.dp__input) {
    width: 100%;
    background-color: #f7f9fc;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    color: #44403c;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

:deep(.dp__input):focus {
    border-color: #5b8df9;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(91, 141, 249, 0.1);
}

:deep(.dp__menu) {
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

:deep(.dp__cell_inner) {
    border-radius: 6px;
    font-weight: 500;
    color: #44403c;
}

:deep(.dp__cell_inner:hover) {
    background-color: #f0f4ff;
}

:deep(.dp__active_date) {
    background-color: #5b8df9;
    color: white;
}

.date-info {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: #f0f4ff;
    border-radius: 8px;
    border-left: 4px solid #5b8df9;
}

.date-display {
    font-weight: 600;
    color: #5b8df9;
    font-size: 0.95rem;
    background-color: transparent;
}

.result-history-container {
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.medicines-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    background-color: transparent;
}

.medicine-card {
    background: linear-gradient(135deg, #f7f9fc 0%, #f0f4ff 100%);
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 5px solid #5b8df9;
    transition: all 0.3s ease;
    cursor: pointer;
}

.medicine-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(91, 141, 249, 0.15);
}

.med-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    background-color: transparent;
}

.med-box {
    display: inline-block;
    background-color: #5b8df9;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.med-time {
    font-weight: 600;
    color: #5b8df9;
    font-size: 0.95rem;
    background-color: transparent;
}

.med-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #44403c;
    margin-bottom: 0.5rem;
    background-color: transparent;
}

.med-dose {
    font-size: 0.9rem;
    color: #78716C;
    background-color: transparent;
}

.no-medicines,
.no-date-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    text-align: center;
}

.no-medicines p,
.no-date-selected p {
    font-size: 1rem;
    color: #a19f9c;
    background-color: transparent;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr;
    }

    .calendar-container {
        width: 100%;
    }
}

@media (max-width: 640px) {
    .medicines-list {
        grid-template-columns: 1fr;
    }

    .header-title {
        font-size: 1.8rem;
    }
}
    
</style>