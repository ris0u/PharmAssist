<template>
    <div class="editprofile-container">
        <div class="editprofile-content">
            <div class="editprofile-header">
                <router-link to="/dashboard/home" class="hometext"> Go Back </router-link>
            </div>

            <div class="main-content">
                <div class="formcontent">
                    <h2> Update User Profile </h2>
                    <form @submit.prevent="submitForm">
                        <!-- USER INFO -->
                        <span class="name-field inputfield">
                            <span>Name:</span>
                            <input type="text" v-model="profile.user.name" placeholder="Full Name"/>
                        </span>
                        <span class="email-field inputfield">
                            <span>Email:</span>
                            <input type="email" v-model="profile.user.email" placeholder="Email"/>
                        </span>
                        <span class="password-field inputfield">
                            <span>Password:</span>
                            <input type="password" v-model="profile.user.password" placeholder="Password"/>
                        </span>
                        <button type="submit">Update details</button>
                    </form>
                </div>

                <div class="updated-details">
                    <div class="userdetails">
                        <div class="userdetails-header">
                            <h3>Current User Details</h3>
                        </div>
                        <p class="userdetails-title"><strong>Name:</strong> {{ profile.user.name }}</p>
                        <p class="userdetails-title"><strong>Email:</strong> {{ profile.user.email }}</p>
                        <p class="userdetails-title"><strong>Password:</strong> {{ profile.user.password ? '********' : '' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { handleregister } from '../JS/handleregister.js'
import { handlelogin } from '../JS/handlelogin.js'
import { getDatabase, ref as dbRef, get } from 'firebase/database'

const router = useRouter();
const profile = handleregister();
const login = handlelogin();
const confirm = ref('');

onMounted(async () => {
    if (!login.safeEmail) {
        alert('Please login first');
        router.push('/login');
        return;
    }
    const db = getDatabase();
    const userRef = dbRef(db, `users/${login.safeEmail}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        profile.saveProfile(data);
    } else {
        alert('User data not found');
    }
});

const submitForm = async () => {
    const updated = await profile.updateProfile();
    if (updated) {
        alert("Profile updated successfully!");
        confirm.value = '';
    } else {
        alert("Update failed");
    }
};
</script>

<style scoped>
.editprofile-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.editprofile-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 65vh;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
}

.editprofile-header {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 70%;
}

.hometext {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: #f3e9ff;
    width: 7rem;
    height: 3rem;
    border-radius: 12px;
    color: #1e40af;
    margin-right: 5%;
    border: 10px solid #f3e9ff;
}

h2 {
    font-size: x-large;
    font-weight: 600;
    color: #444430;
    background-color: transparent;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    gap: 2rem;
    background-color: #fafaf9;
}


.formcontent {
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 24px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    gap: 1rem;
    padding-top: 3rem;
}

.formcontent form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: transparent;
    padding: 1rem;
}

.formcontent input,
.formcontent button {
    width: 20vw;
    padding: 1rem;
    background-color: transparent;
    border-radius: 12px;
    height: 3.5rem;
    border: 1px solid #ccc;

}

.formcontent button {
    background-color: #d0fae6;
    color: #059669;
    font-weight: 600;
    border: 2px solid #96ffdc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputfield {
    display: flex;
    align-items: left;
    flex-direction: column;
    background-color: transparent;
}

.inputfield span{
    background-color: transparent;
    font-weight: 600;
    color: #44403c;
}

.updated-details {
    background-color: #fff;
    color: #44403c;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.userdetails {
    height: 90%;
    width: 90%;
    background-color: transparent;
}

.userdetails p, .userdetails h3 {
    background-color: transparent;
}

.userdetails h3{
    font-weight: 600;
    margin-top: 1rem;
}

.userdetails p{
    margin-left: 1rem;
    margin-top: 2rem;
}

.userdetails-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.userdetails-title p {
    background-color: #fff;
}



</style>
