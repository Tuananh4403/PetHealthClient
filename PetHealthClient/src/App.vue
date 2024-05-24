<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import MainPage from "./components/MainPage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";

export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MainPage,
    // eslint-disable-next-line vue/no-unused-components
    LoginPage,
    // eslint-disable-next-line vue/no-unused-components
    RegisterPage,
  },
};
</script>

<style>

</style>
