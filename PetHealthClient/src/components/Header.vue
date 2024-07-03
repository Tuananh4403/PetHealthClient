<template>
    <header class="header">
      <div class="logo">
        <!-- <img src="/path/to/logo.png" alt="Logo" /> -->
        <span>My App</span>
      </div>
      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponet',
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #0b0c5d;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    height: 30px;
    margin-right: 10px;
  }
  
  .nav {
    display: flex;
  }
  
  .nav a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
  }
  
  .nav a:hover {
    text-decoration: underline;
  }
  </style>
  