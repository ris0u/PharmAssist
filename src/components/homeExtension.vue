<template>

  <body>
    <div>
      <h4 class="title">PharmAssist Serial Monitor</h4>
      <div class="feature-temphum">
        <div class="feature-title">
          <img src="../assets/icon-time.svg" alt="temphum-icon" class="icon" />
          <h5 style="">Everything's working great</h5>
        </div>
        <div class="temphum-holder">
          <div class="temphum-content">
            <img src="../assets/temp.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Temperature</p>
              <h5>{{ temphumStore.temperature }} - {{ temphumStore.tempStatus }}</h5>
            </div>
          </div>
          <div class="temphum-content">
            <img src="../assets/humidity.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Humidity</p>
              <h5>{{ temphumStore.humidity }} - {{ temphumStore.humStatus }}</h5>
            </div>
          </div>
          <div class="temphum-content">
            <img src="../assets/compartmentbox.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Scheduled medication in</p>
              <h5>{{ sched }}</h5>
            </div>
          </div>
        </div>
      </div>
      <h4 class="title">Your Weekly Medication Progress</h4>
      <div class="feature-weekly">
        <div class="feature-title">
          <h5>Your Week at a Glance</h5>
        </div>
        <div style="display: flex; gap: 5%; padding-left: 20px; background-color: #ffffff;">
          <div class="weekly-content">
            <p>{{ date1 }}</p>
            <img :src="statusIcon(status1)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date2 }}</p>
            <img :src="statusIcon(status2)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date3 }}</p>
            <img :src="statusIcon(status3)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date4 }}</p>
            <img :src="statusIcon(status4)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date5 }}</p>
            <img :src="statusIcon(status5)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date6 }}</p>
            <img :src="statusIcon(status6)" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>{{ date7 }}</p>
            <img :src="statusIcon(status7)" alt="temp-icon" class="temp-icon" />
          </div>
        </div>
        <div class="weekly-holder">
          <div class="weekly-legend">
            <img src="../assets/checkicon.svg" alt="temp-icon" class="legend-icon" />
            <p>Completed</p>
          </div>
          <div class="weekly-legend">
            <img src="../assets/upcoming-yellow.svg" alt="temp-icon" class="legend-icon" />
            <p>Incomplete</p>
          </div>
          <div class="weekly-legend">
            <img src="../assets/missed-1.svg" alt="temp-icon" class="legend-icon" />
            <p>Missed</p>
          </div>
        </div>
        <div class="weekly-expand">
          <img src="../assets/expand.svg" alt="weekly-graph" />
        </div>
      </div>
      <form action="https://api.web3forms.com/submit" method="POST" id="form">
        <input type="hidden" name="access_key" value="c0c02cbb-ab44-4de4-836d-fb5efaaf857a">

        <div class="feature-messeges">
          <div class="messeges-content">
            <h5>Note for the Developers</h5>

            <input type="hidden" name="name" value="Feedback" />
            <input type="hidden" name="email" value="lamuelbapilar@gmail.com" />

            <input name="message" placeholder="Share your thoughts..." required />
          </div>

          <div class="messeges-button">
            <button type="submit">
              <img src="../assets/arrow.svg" class="messeges-img">
              Send a message
            </button>
          </div>
        </div>
      </form>
    </div>

  </body>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHandleTemphum } from '../JS/handletemphum'
import { useHandleSchedule } from '../JS/handleschedule'
import completed_icon from '../assets/completed.svg'
import missed_icon from '../assets/missed.svg'
import upcoming_icon from '../assets/upcoming.svg'

const temphumStore = useHandleTemphum()
const scheduleStore = useHandleSchedule()

// --- reactive variables for upcoming schedule ---
const sched = ref("")

// --- reactive variables for each of the last 7 days ---
const date1 = ref(""); const status1 = ref("")
const date2 = ref(""); const status2 = ref("")
const date3 = ref(""); const status3 = ref("")
const date4 = ref(""); const status4 = ref("")
const date5 = ref(""); const status5 = ref("")
const date6 = ref(""); const status6 = ref("")
const date7 = ref(""); const status7 = ref("")

let intervalId = null

// assign last 7 days data to reactive variables
function assignLast7DaysData(data) {
  if (!data || data.length < 7) return
  date1.value = data[0].date; status1.value = data[0].status
  date2.value = data[1].date; status2.value = data[1].status
  date3.value = data[2].date; status3.value = data[2].status
  date4.value = data[3].date; status4.value = data[3].status
  date5.value = data[4].date; status5.value = data[4].status
  date6.value = data[5].date; status6.value = data[5].status
  date7.value = data[6].date; status7.value = data[6].status
}

function statusIcon(status) {
  if (status === "completed") return completed_icon
  else if (status === "missed") return missed_icon
  else return upcoming_icon
}



onMounted(async () => {
  temphumStore.connectMQTT()

  // fetch boxes and last 7 days immediately
  await scheduleStore.fetchBoxes()
  sched.value = scheduleStore.upcomingshed
  assignLast7DaysData(scheduleStore.last7days)

  // update every 3 seconds
  intervalId = setInterval(() => {
    sched.value = scheduleStore.upcomingshed
    assignLast7DaysData(scheduleStore.last7days)
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>



<style scoped>
* {
  font-family: 'inter', sans-serif;
}

body {
  font-family: "Inter", sans-serif;

  background-color: #fafaf9;
  margin: 0;
}

.title {
  font-size: 20.4px;
  font-weight: 700;
  color: #44403c;
  margin: 0;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: transparent;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 20px;
  background-color: #ffffff;
}

.feature-title img {
  width: 24px;
  height: 24px;
  background-color: #ffffff;
}

.feature-title h5 {
  color: #44403c;
  font-size: large;
  font-weight: 700;
  margin: 0;
  background-color: #ffffff;
}

.feature-temphum,
.feature-weekly {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}


.temphum-holder {
  display: flex;
  gap: 2%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.temphum-content {
  background-color: #fafaf9;
  width: 35%;
  padding: 15px;
  border-radius: 16px;
  display: flex;
  gap: 10px;
}

.temphum-content p {
  font-size: small;
  font-weight: 700;
  font-style: bold;
  color: #78716c;
  margin: 0;
  padding-bottom: 10px;
}

.temphum-content h5 {
  font-size: medium;
  font-weight: 700;
  font-style: bold;
  color: #44403c;
  margin: 0;
}

.temp-icon {
  width: 55px;
  height: 55px;
  background-color: transparent;
}

.weekly-holder {
  display: flex;
  gap: 2%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.weekly-content {
  width: 10%;
  padding: 15px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}


.weekly-content p {
  font-size: small;
  font-weight: 700;
  font-style: bold;
  color: #78716c;
  margin: 0;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.weekly-expand {
  width: 100%;
  background-color: #ffffff;
  position: relative;
}

.weekly-expand img {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: transparent;
}



.weekly-legend {
  display: flex;
  gap: 10%;
  padding-top: 15px;
  background-color: transparent;
}

.weekly-legend p {
  font-size: small;
  font-weight: 500;
  font-style: bold;
  color: #78716c;
  margin: 0;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.legend-icon {
  width: 16px;
  height: 16px;
  background-color: transparent;
}

.feature-messeges {
  background-color: #F3E9FF;
  border-radius: 16px;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
}

.messeges-content {
  background-color: transparent;
  min-width: 80%;
}

.messeges-content h5 {
  background-color: transparent;
  color: #1E40AF;
  font-size: medium;
  font-weight: 700;
  font-style: bold;
  padding: 5px;
}

.messeges-content input {
  background-color: transparent;
  color: #1E40AF;
  font-size: small;
  font-weight: 500;
  font-style: bold;
  padding: 10px;
  word-break: break-all;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}

.messeges-content input:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.messeges-button {
  position: relative;
  background-color: transparent;
  min-width: 20%;

}

.messeges-button button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 5px;
  color: #1E40AF;
  font-size: small;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 150px;
  height: 45px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: none;
}

.messeges-button button:hover {
  background-color: #F1F5F9;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);
  transition: all 0.7s ease;
}


.messeges-img {
  width: 18px;
  height: 17px;
  background-color: transparent;
}
</style>