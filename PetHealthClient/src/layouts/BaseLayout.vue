<template>
    <div>
      <HeaderComponet />
      <div class="main-content">
        <SidebarComponet />
        <router-view />
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <FooterComponet />
    </div>
  </template>
  
  <script>
  import HeaderComponet from '../components/Header.vue';
  import FooterComponet from '../components/Footer.vue';
  import SidebarComponet from '../components/Sidebar.vue';
  
  export default {
    name: 'BaseLayout',
    components: {
        HeaderComponet,
        FooterComponet,
        SidebarComponet,
    },
  };
  </script>
  
  <style>
  .main-content {
    display: flex;
  }
  .content {
    flex: 1;
  }
  </style>
  