<template>
    <header class="header">
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
    padding: 0.8rem;
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
    background-color: #0b0c5d;
    justify-content: flex-end;
  }
  
  .nav a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
  }
  
  .nav a:hover {
    text-decoration: underline;
  }

  span {
    margin-left: 100px ;
  }
  </style>
  