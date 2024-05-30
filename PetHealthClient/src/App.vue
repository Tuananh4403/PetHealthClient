<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import MainPage from "./components/MainPage.vue";
import LoginPage from "./components/LoginPage.vue";
// import RegisterPage from "./components/RegisterPage.vue";
import BookingModal from "./components/BookingModal.vue";
import MainPage_2 from './components/MainPage_2.vue'

export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MainPage,
    // eslint-disable-next-line vue/no-unused-components
    LoginPage,
    // eslint-disable-next-line vue/no-unused-components
    // RegisterPage,
    // eslint-disable-next-line vue/no-unused-components
    BookingModal,
    // eslint-disable-next-line vue/no-unused-components
    MainPage_2,
  },
};
</script>

<style>

</style>
