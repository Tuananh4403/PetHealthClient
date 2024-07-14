<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div >
    <button @click="toggleSidebar" class="toggle-btn" :class="{ 'open': isSidebarOpen }">
      <span class="material-icons">{{ isSidebarOpen ? 'Menu' : 'Menu' }}</span>
    </button>
    <div class="sidebar" :class="{ 'sidebar-closed': !isSidebarOpen }">
      <div class="menu">
        <router-link to="/dashboard" class="menu-item">
          <span class="material-icons">Dashboard</span>
        </router-link>
        <router-link to="/home" class="menu-item">
          <span class="material-icons">Home</span>
        </router-link>
        <router-link to="/medicalHistory" class="menu-item">
          <span class="material-icons">Medical History</span>
        </router-link>    
        <router-link to="/petList" class="menu-item">
          <span class="material-icons">Pet List</span>
        </router-link>
        <router-link to="/vaccineCalendar" class="menu-item">
          <span class="material-icons">Vaccine Calendar</span>
        </router-link>
        <router-link to="/kennel" class="menu-item">
          <span class="material-icons">Kennel</span>
        </router-link>
        <router-link to="/service" class="menu-item">
          <span class="material-icons">Service</span>
        </router-link>
        <router-link to="/manage-doctor" class="menu-item">
          <span class="material-icons">Manage Doctor</span>
        </router-link>  
        <router-link to="/manage-staff" class="menu-item">
          <span class="material-icons">Manage Staff</span>
        </router-link> 
        <router-link to="/manage-user" class="menu-item">
          <span class="material-icons">Manage User</span>
        </router-link>   
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isSidebarOpen = ref(true);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      toggleSidebar
    };
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #000;
  color: #fff;
  width: 200px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.sidebar-closed {
  transform: translateX(-100%);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.material-icons {
  margin-right: 10px;
}

.toggle-btn {
  position: fixed;
  top: 20px;
  left: 10px;
  z-index: 1000;
  background-color: #725cca;
  color: #fff;
  border: none;
  width: 100px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: #333;
}
</style>