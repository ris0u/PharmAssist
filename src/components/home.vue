<script setup>
  import { ref, onMounted, watchEffect } from "vue";
  import { useHandleSchedule } from '../JS/handleschedule';
  import pendingIcon from '../assets/pending-icon.svg';
  import successIcon from '../assets/check-icon.svg';
  import missedIcon from '../assets/missed-icon.svg';
  import takenpillIcon from '../assets/graypill-icon.svg';
  import missedpillIcon from '../assets/missedpill-icon.svg';
  import pendingpillIcon from '../assets/coloredpill-icon.svg';
  import compartmentIcon from '../assets/compartment-icon.svg';
  import timeIcon from '../assets/time-icon.svg';
  import navBar from './navbar.vue';
  import NewHome from './homeExtension.vue';
  
  const scheduleStore = useHandleSchedule()
  
  // Color references
  const missedBackground = ref('#FFE6E6');
  const successBackground = ref("#ECFDF5");
  const pendingBackground = ref("#F3E9FF");
  const missedText = ref("#BE3939");
  const successText = ref("#059669");
  const pendingText = ref("#1E40AF");
  
  // Time, boxes, and messages
  const timeTake = ref([
    "before breakfast","with breakfast","after breakfast",
    "before lunch","with lunch","after lunch",
    "before dinner","with dinner","after dinner",
    "before bedtime",
  ]);
  const boxOrder = ref(["Compartment A","Compartment B","Compartment C","Compartment D"]);
  const successMessage = ref(["Missed","Great Job!","Coming up next!"]);
  const greetings = ref(["Good morning","Good afternoon","Good evening"]);
  
  // Reactive medData array
  const medData = ref([]);
  
  // Fetch schedule and update medData
  onMounted(async () => {
    await scheduleStore.fetchBoxes();
  
    // Fill medData once store is populated
    medData.value = [
      {
        Name: scheduleStore.box1medicine || "No medicine",
        supply: (scheduleStore.box1dose || 0) + " tablets",
        timeDesc: timeTake.value[3],
        scheduledTime: scheduleStore.box1shed || "N/A",
        dose: "500mg",
        compartment: boxOrder.value[0],
        status: successMessage.value[0],
        statusIcon: missedIcon,
        pillIcon: missedpillIcon,
        background: missedBackground,
        textColor: missedText,
      },
      {
        Name: scheduleStore.box2medicine || "No medicine",
        supply: (scheduleStore.box2dose || 0) + " tablets",
        timeDesc: timeTake.value[4],
        scheduledTime: scheduleStore.box2shed || "N/A",
        dose: "10mg",
        compartment: boxOrder.value[1],
        status: successMessage.value[1],
        statusIcon: successIcon,
        pillIcon: takenpillIcon,
        background: successBackground,
        textColor: successText,
      },
      {
        Name: scheduleStore.box3medicine || "No medicine",
        supply: (scheduleStore.box3dose || 0) + " tablets",
        timeDesc: timeTake.value[5],
        scheduledTime: scheduleStore.box3shed || "N/A",
        dose: "20mg",
        compartment: boxOrder.value[2],
        status: successMessage.value[2],
        statusIcon: pendingIcon,
        pillIcon: pendingpillIcon,
        background: pendingBackground,
        textColor: pendingText,
      },
      {
        Name: scheduleStore.box4medicine || "No medicine",
        supply: (scheduleStore.box4dose || 0) + " tablets",
        timeDesc: timeTake.value[6],
        scheduledTime: scheduleStore.box4shed || "N/A",
        dose: "10mg",
        compartment: boxOrder.value[3],
        status: successMessage.value[2],
        statusIcon: pendingIcon,
        pillIcon: pendingpillIcon,
        background: pendingBackground,
        textColor: pendingText,
      }
    ];
  });
  </script>
  

<template>
  <navBar />

  <div class="overview-container">
    <div class="overview-content">
      <div class="overview-icon">
        <img src="../assets/cloud-icon.svg" alt="Overview Logo" />
      </div>
      <span class="overview-heading">Weekly Overview</span>
    </div>
    <span class="overview-greetings">
      {{ greetings[0] }}, <span class="firstname">Lamuel!</span>
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
        <div class="medcard" 
        v-for="med in medData" 
        :key="med.Name"
                :style="{
          borderLeftColor: med.textColor
        }">
          <div class="medcard-header">
            <div class="medcard-alert-container"
              :style="{
                backgroundColor: med.background,
                color: med.textColor
              }">
              <div class="medcard-alert-icon">
                <img :src="med.statusIcon" />
              </div>
              <span class="medcard-alert-text">{{ med.status }}</span>
            </div>
            <div class="pillcolor">
              <img :src="med.pillIcon" alt="pill icon"/>
            </div>
          </div>

          <div class="medicine-name-container">
            <div class="medicine-name">
              <h3>{{ med.Name }}</h3>
              <p>{{ med.supply }} left</p>
            </div>
            <span class="medicine-description">
              Take {{ med.dose }} {{ med.timeDesc }}
            </span>
          </div>
          
          <div class="time-box-container">
            <div class="time-box">
              <div class="time-icon">
                <img :src="timeIcon" alt="time icon"/>
              </div>
              <span class="time-text">{{ med.scheduledTime }}</span>
            </div>
            <div class="time-box">
              <div class="compartment-icon">
                <img :src="compartmentIcon" alt="compartment icon"/>
              </div>
              <span class="box-text">{{ med.compartment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<NewHome />
  
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
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
  background-color: none;
}
.medcard {
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 8px solid ;
  background-color: transparent;
  background-color: #FFFFFF;
}
.medcard-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 1rem;
  background-color: transparent;
  fill: none;
}
.medcard-alert-container {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  border-radius: 28px;
  height: 2.5rem;
  width: fit-content;
  padding: 0 1rem;
}
.pillcolor img{
  background-color: #FFFFFF;
}
.medcard-alert-icon{
  background-color: transparent;
}
.medcard-alert-icon img {
  height: 24px;
  width: 24px;
  background-color: transparent;
}
.medcard-alert-text {
  background-color: transparent;
}
.medicine-name-container {
  background-color: transparent;
  
}
.medicine-name {
  margin-top: 1.5rem;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.medicine-name h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #44403C;
  background-color: transparent;
}
.medicine-name p {
  font-size: 1rem;
  font-weight: 500;
  color: #78716C;
  background-color: transparent;
}
.medicine-description {
  display: block;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #44403C;
  background-color: transparent;
}
.time-box-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
  background-color: transparent;
}
.time-box {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 12px;
  background-color: #f9f9f0;
  padding: 1.5rem 1rem;
  width: 100%;
  border-radius: 20px;
}
.time-icon {
  background-color: transparent;
}
.time-icon img {
  height: 28px;
  width: 28px;
  background-color: transparent;
}
.time-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #44403C;
  background-color: transparent;
}
.box-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #44403C;
  background-color: transparent;
}
.compartment-icon img {
  height: 28px;
  width: 28px;
  background-color: transparent;
}

/* Popup Modal styles */

</style>


