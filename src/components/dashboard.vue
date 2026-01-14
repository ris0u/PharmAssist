<template>
  <div class="dashboard-wrapper">
    <span class="header">
      <div class="left-header">
        <div class="logo-container">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <span class="logo-name">PharmAssist</span>
      </div>

      <nav class="navlink-wrapper">
        <ul class="navlink-container">
          <span class="navlink">
            <li>
              <router-link to="/dashboard/home">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/dashboard/editprofile"
                >Edit profile</router-link
              >
            </li>
            <li>
              <router-link to="/dashboard/editmedication"
                >Edit medication</router-link
              >
            </li>
          </span>
          <span class="logoutbtn">
            <li>
              <router-link to="/login">Logout</router-link>
            </li>
          </span>
        </ul>
      </nav>
    </span>

    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

.dashboard-wrapper {
  display: flex;
  gap: 0.5%;
  overflow-y: auto;
  height: 100vh;
}

.content-area {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  padding-top: 2.5rem;
  padding-bottom: 4rem;
  flex-direction: column;
  height: 100vh;
  width: 17%;
  gap: 5rem;
  background-color: #fff;
  box-shadow: 2px 2px 16px rgb(219, 219, 219);
}

.left-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  flex-wrap: wrap;
  flex-direction: row;
  user-select: none;
  margin-left: -8%;
}

.logo-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #44403c;
  background-color: transparent;
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

/* Navlinks */

.navlink-wrapper {
  height: 100%;
  display: flex;
  width: 75%;
  background-color: transparent;
}

.navlink-wrapper ul {
  list-style: none;
  background-color: transparent;
}

.navlink-container {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logoutbtn,
.navlink {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.logoutbtn li,
.navlink li {
  background-color: transparent;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.navlink li a {
  text-decoration: none;
  background-color: transparent;
  font-size: 1.3rem;
  font-weight: 600;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  display: flex;
  padding-left: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.navlink li a {
  color: #f59e0b;
  border: 3px solid transparent;
  border-radius: 12px;
  border: 3px solid;
  border-color: #f59e0b;
}

.logoutbtn li a {
  color: #1e40af;
  border: 3px solid;
  border-color: #1e40af;
  width: 100%;
  text-decoration: none;
  background-color: transparent;
  font-size: large;
  font-weight: 600;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
