<template>

  <body>
    <div>
      <h4 class="title">PharmAssist Serial Monitor</h4>
      <div class="feature-temphum">
        <div class="feature-title">
          <img src="../assets/img/icon-time.svg" alt="temphum-icon" class="icon" />
          <h5 style="">Everything's working great</h5>
        </div>
        <div class="temphum-holder">
          <div class="temphum-content">
            <img src="../assets/img/temp.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Temperature</p>
              <h5>72°F - Perfect</h5>
            </div>
          </div>
          <div class="temphum-content">
            <img src="../assets/img/humidity.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Humidity</p>
              <h5>74 - Optimal range</h5>
            </div>
          </div>
          <div class="temphum-content">
            <img src="../assets/img/compartmentbox.svg" alt="temp-icon" class="temp-icon" />
            <div style="display: column">
              <p>Scheduled medication in</p>
              <h5>54 min</h5>
            </div>
          </div>
        </div>
      </div>
      <h4 class="title">Your Weekly Medication Progress</h4>
      <div class="feature-weekly">
        <div class="feature-title">
          <h5>Your Week at a Glance</h5>
        </div>
        <div style="display: flex; gap: 5%; padding-left: 20px;">
          <div class="weekly-content">
            <p>Mon</p>
            <img src="../assets/img/completed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Teu</p>
            <img src="../assets/img/completed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Wed</p>
            <img src="../assets/img/missed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Thu</p>
            <img src="../assets/img/completed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Fri</p>
            <img src="../assets/img/completed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Sat</p>
            <img src="../assets/img/completed.svg" alt="temp-icon" class="temp-icon" />
          </div>
          <div class="weekly-content">
            <p>Sun</p>
            <img src="../assets/img/upcoming.svg" alt="temp-icon" class="temp-icon" />
          </div>
        </div>
        <div class="weekly-holder">
          <div class="weekly-legend">
            <img src="../assets/img/checkicon.svg" alt="temp-icon" class="legend-icon" />
            <p>Taken</p>
          </div>
          <div class="weekly-legend">
            <img src="../assets/img/upcoming-yellow.svg" alt="temp-icon" class="legend-icon" />
            <p>Upcoming</p>
          </div>
          <div class="weekly-legend">
            <img src="../assets/img/missed-1.svg" alt="temp-icon" class="legend-icon" />
            <p>Missed</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Inter", sans-serif;
  padding-left: 10%;
  padding-right: 10%;
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
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 20px;
}

.feature-title img {
  width: 24px;
  height: 24px;
}

.feature-title h5 {
  color: #44403c;
  font-size: large;
  font-weight: 700;
  margin: 0;
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
}

.weekly-holder {
  display: flex;
  gap: 2%;
  align-items: center;
  justify-content: center;
}

.weekly-content {
  width: 10%;
  padding: 15px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
}


.weekly-legend{
  display: flex; 
  gap: 10%; 
  padding-top: 15px;
}

.weekly-legend p{
  font-size: small;
  font-weight: 500;
  font-style: bold;
  color: #78716c;
  margin: 0;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
}

.legend-icon {
  width: 16px;
  height: 16px;
}
</style>
