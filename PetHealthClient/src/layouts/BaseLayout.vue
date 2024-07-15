<template>
  <div>
    <HeaderComponent />
    <div class="main-content">
      <SidebarComponent />
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'; // Adjust path as needed
import SidebarComponent from '@/components/Sidebar.vue'; // Adjust path as needed
import FooterComponent from '@/components/Footer.vue'; // Adjust path as needed
import { useStore } from 'vuex';

export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  },
  setup() {
    const store = useStore();

    const toggleSidebar = () => {
      store.dispatch('toggleSidebar'); // Ensure 'toggleSidebar' matches the action name in your store
    };

    return {
      toggleSidebar,
      isSidebarOpen: store.state.isSidebarOpen // Optionally, if you need to access the sidebar state
    };
  }
};
</script>

<style>
.main-content {
  display: flex;
}
</style>
