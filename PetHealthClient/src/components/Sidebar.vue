<template>
  <div class="sidebar">
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
      <router-link to="/manageDoctor" class="menu-item">
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
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar'
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
</style>