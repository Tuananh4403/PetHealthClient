<template>
    <footer class="footer">
      <div class="inner">
        <p>&copy; 2024 My App. All rights reserved.</p>
        <nav class="nav">
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/terms">Terms of Service</router-link>
        </nav>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponet',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  
  .footer .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer .nav {
    display: flex;
  }
  
  .footer .nav a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
  }
  
  .footer .nav a:hover {
    text-decoration: underline;
  }
  </style>
  