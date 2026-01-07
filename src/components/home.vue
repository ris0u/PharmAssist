<script setup>
import { ref, onMounted } from "vue";
import { useMedicineStore } from "../JS/handlemedicine";
import pendingIcon from '../assets/pending-icon.svg';
import successIcon from '../assets/check-icon.svg';
import missedIcon from '../assets/missed-icon.svg';
import takenpillIcon from '../assets/graypill-icon.svg';
import missedpillIcon from '../assets/missedpill-icon.svg';
import pendingpillIcon from '../assets/coloredpill-icon.svg';
import compartmentIcon from '../assets/compartment-icon.svg';
import timeIcon from '../assets/time-icon.svg';

const store = useMedicineStore();

const intakeType = ref("");
const box = ref("");
const medicine = ref("");
const time = ref("");
const dose = ref("");
const lastTaken = ref("");

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};


const save = async () => {
  await store.saveMedicine(
    intakeType.value,
    box.value,
    medicine.value,
    time.value,
    dose.value,
    lastTaken.value
  );

  intakeType.value = "";
  box.value = "";
  medicine.value = "";
  time.value = "";
  dose.value = "";
  lastTaken.value = "";
};

onMounted(() => {
  store.listenMedicines();
});

const missedBackground = ref('#F1DBDB');
const successBackground = ref("#ECFDF5");
const pendingBackground = ref("#F3E9FF");
const missedText = ref("#BE3939");
const successText = ref("#059669");
const pendingText = ref("#1E40AF");

const medData = ref([
  {
    Name: "Metformin",
    supply: "15 tablets",
    time: "12:00 PM",
    dose: "500mg",
    status: "missed",
    statusIcon: missedIcon,
    pillIcon: missedpillIcon,
    background: missedBackground,
    textColor: missedText,
  },
  {
    Name: "Lisinopril",
    supply: "19 tablets",
    time: "8:00 AM",
    dose: "10mg",
    status: "Great Job!",
    statusIcon: successIcon,
    pillIcon: takenpillIcon,
    background: successBackground,
    textColor: successText,
  },
  {
    Name: "Atorvastatin",
    supply: "11 tablets",
    time: "8:00 PM",
    dose: "20mg",
    status: "Coming up next",
    statusIcon: pendingIcon,
    pillIcon: pendingpillIcon,
    background: pendingBackground,
    textColor: pendingText,
  },
  {
    Name: "Amoxicillin",
    supply: "8 tablets",
    time: "10:00 PM",
    dose: "10mg",
    status: "Coming up next",
    statusIcon: pendingIcon,
    pillIcon: pendingpillIcon,
    background: pendingBackground,
    textColor: pendingText,
  }
]);

const timeTake = ref([
  "before morning",
  "with breakfast",
  "after lunch",
  "before dinner",
  "before bedtime",
]);

const boxType = ref([
  "Compartment A",
  "Compartment B",
  "Compartment C",
  "Compartment D",
]);

const successMessage = ref([
  "Great Job!",
  "Coming up next!",
]);
</script>

<template>
  <div class="header">
    <div class="left-header">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="Logo" />
      </div>
      <span class="logo-name">PharmAssist</span>
    </div>

    <nav class="avatar-dropdown">
      <ul>
        <li class="dropdown">
          <button class="dropbtn" @click="toggleDropdown">LB</button>
          <ul :class="{ 'dropdown-content': true, show: isDropdownOpen }">
            <li><router-link to="/Edit profile">Edit profile</router-link></li>
            <li>
              <router-link to="/Edit medication">Edit medication</router-link>
            </li>
            <li><router-link to="/login">Logout</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>

  <div class="overview-container">
    <div class="overview-content">
      <div class="overview-icon">
        <img src="../assets/cloud-icon.svg" alt="Overview Logo" />
      </div>
      <span class="overview-heading">Weekly Overview</span>
    </div>
    <span class="overview-greetings">
      Good afternoon, <span class="firstname">Lamuel!</span>
    </span>
    <span class="greetings-extension">Hope your day is going wonderfully.</span>
  </div>

  <div class="schedule-container">
    <div class="schedule-heading">
      <span class="schedule-title">Your Weekly's Schedule</span>
      <span class="medprogress-container">
        <span class="medication-progress"> 2 remaining </span>
      </span>
    </div>

    <div class="medication-container">
      <div class="medcards">
        <div class="medcard glass-panel" 
        v-for="med in medData" 
        :key="med.Name">
          <div class="medcard-header">
            <div class="medcard-alert-container"
              :style="{
                backgroundColor: med.background,
                color: med.textColor
              }"
            >
              <div class="medcard-alert-icon">
                <img :src="med.statusIcon" />
              </div>
              <span class="medcard-alert-text">{{ med.status }}</span>
            </div>
            <div class="pillcolor">
              <img :src="med.pillIcon" alt="pill icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  margin-left: 10%;
  margin-right: 10%;
}
.left-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #44403C;
}

.logo-container {
  background-color: #fff;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: -1px 2px 6px rgb(219, 219, 219);
}

.logo-container img {
  height: 32px;
  width: 32px;
  background-color: transparent;
}

/* Avatar Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
  gap: 10px;
}

.dropbtn {
  background: #f3e9ff;
  color: #1e40af;
  cursor: pointer;
  height: 3.8rem;
  width: 3.8rem;
  border: none;
  border-radius: 50%;
  font-size: x-large;
  font-weight: 500;
}

.dropdown-content {
  display: none;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 4.4rem;
  background: white;
  min-width: 160px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: large;
  text-align: right;
  border-radius: 16px;
  overflow: hidden;
}

.dropdown-content.show {
  display: flex;
}

.dropdown-content li {
  list-style: none;
}

.dropdown-content li a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #1e40af;
}

/* overview */
.overview-container {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
}
.overview-content {
  display: flex;
  align-items: center;
  gap: 16px;
}
.overview-heading {
  font-size: 1.2rem;
  font-weight: 600;
  color: #F59E0B;
}
.overview-icon img {
  height: 40px;
  width: 40px;
}
.overview-greetings {
  display: block;
  margin-top: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #44403C;
}
.firstname {
  font-weight: 700;
  color: #1E40AF;
}
.greetings-extension {
  display: block;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #78716C;
}

/* schedule */
.schedule-container {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 2.5rem;
}
.schedule-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.schedule-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #44403C;
}
.medprogress-container {
  background-color: #fcf7e5;
  padding: 0.5rem 1.5rem;
  border-radius: 28px;
}
.medication-progress {
  font-size: 1rem;
  font-weight: 700;
  color: #F59E0B;
  overflow: hidden;
  background-color: transparent;
}
.medication-container {
  display: grid;
  gap: 2rem;
  overflow-x: auto;
}
.medcards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35%, 1fr));
  gap: 1.5rem;
}
.glass-panel {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.medcard {
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 8px solid #1E40AF;
  background-color: transparent;
  background-color: #FFFFFF;

}
.medcard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: transparent;
}
.medcard-alert-container {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  background-color: medbackground;
  border-radius: 28px;
  height: 2.5rem;
  width: fit-content;
  padding: 0 1rem;
}
.pillcolor img{
  background-color: transparent;
}
.medcard-alert-icon{
  background-color: transparent;
}
.medcard-alert-icon img {
  height: 24px;
  width: 24px;
  background-color: transparent;
}
.medcard-alert-text{
  background-color: transparent;
}

</style>
