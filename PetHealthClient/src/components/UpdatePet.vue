<template>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="signup-container">
        <h1>Update your pet</h1>
        <form>
          <label for="pet-name">Pet Name</label>
          <input type="text" id="pet-name" placeholder="Pet Name" />
  
          <label for="kind-of-pet">Kind Of Pet</label>
          <input type="text" id="kind-of-pet" placeholder="Kind Of Pet" />
  
          <label for="gender">Gender</label>
          <input type="text" id="gender" placeholder="Gender" />
  
          <label for="birthday">Birthday</label>
          <input type="date" id="birthday" />
  
          <label for="species">Species</label>
          <input type="text" id="species" placeholder="Species" />
  
          <button type="submit">Save change</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        backgroundImage: null,
        email: '',
        emailError: '',
        password: ''
      }
    },
    mounted() {
      import('@/assets/images/background.png')
        .then((image) => {
          this.backgroundImage = image.default
        })
        .catch((error) => {
          console.error('Error loading image:', error)
        })
    },
    
    
  }
  </script>
  <style>
  .full-screen-background {
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
  }
  
  .signup-container {
    max-width: 450px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f2f2f2;
    align-items: center;
  }
  label {
    display: block;
    margin-top: 10px;
    font-family: Arial, sans-serif;
  }

  input[type='text'],
  input[type='date'] {
    width: 100%;
    padding: 12px 20px;
    margin: 6px 0 16px; 
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .name-inputs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .birthday {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .birthday input[type='text'],
  .birthday input[type='date'] {
    flex: 1;
  }
  
  input[type='text'] {
    width: 100%;
    padding: 12px 20px;
    margin: 6px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Arial, sans-serif;
  }
  
  button[type='submit'] {
    background-color: #9b0f0a;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-family: Arial, sans-serif;
  }
  
  .or {
    text-align: center;
    margin: 10px 0;
  }
  
  .social-buttons button {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  </style>