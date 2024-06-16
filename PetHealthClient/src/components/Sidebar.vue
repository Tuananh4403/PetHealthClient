<template>
    <div>
      <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
        <template #default="{ hide }">
          <div class="p-3">
            <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <nav class="mb-3">
              <b-nav vertical>
                <b-nav-item active @click="hide">Active</b-nav-item>
                <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
                <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
              </b-nav>
            </nav>
            <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
  </template>
  
  <script>
  import { BSidebar } from 'bootstrap-vue'
  export default {
    name: 'SidebarComponet',
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #f0f0f0;
    padding: 20px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar-nav {
    margin-bottom: 20px;
  }
  
  .sidebar-link {
    display: block;
    padding: 10px 0;
    color: #333;
    text-decoration: none;
  }
  
  .sidebar-link:hover {
    background-color: #ddd;
  }
  
  .sidebar-widgets {
    margin-top: 20px;
  }
  
  .sidebar-widgets h4 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .sidebar-widgets ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar-widgets ul li {
    margin-bottom: 5px;
  }
  
  .sidebar-widgets ul li a {
    color: #555;
    text-decoration: none;
  }
  
  .sidebar-widgets ul li a:hover {
    text-decoration: underline;
  }
  </style>
  