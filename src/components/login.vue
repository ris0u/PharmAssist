<template>
    <div class="page">
      <h2 class="title">Login</h2>
  
      <div class="card auth-card">
        <h3>Welcome Back</h3>
  
        <form @submit.prevent="submitlogin">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
  
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
  
          <button type="submit">Login</button>
        </form>
  
        <p class="switch">
          Wala pang account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { handlelogin } from "../JS/handlelogin";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const email = ref("");
  const password = ref("");

  let logpass = false;
  let loginhandler = handlelogin();
    
    function submitlogin(){
        logpass = loginhandler.loginCredentials(email.value, password.value);

        if (logpass){
            router.push('/home');
        }
    }

  
  </script>
  
  <style scoped>
  .page {
    min-height: 100vh;
    background: #f4f6f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
  }
  
  .title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
  
  .card {
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }
  
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #444;
  }
  
  input, button {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  
  button {
    background: #4f46e5;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background: #4338ca;
  }
  
  .switch {
    text-align: center;
    font-size: 14px;
    color: #555;
  }
  
  .switch a {
    color: #4f46e5;
    text-decoration: none;
  }
  </style>
  