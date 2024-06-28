<template>
    <div class="dashboard">
      <h1>Pet Health Care System Dashboard</h1>
      <div class="overview">
        <div class="card">
          <h2>Total Pets</h2>
          <p>{{ totalPets }}</p>
        </div>
        <div class="card">
          <h2>Upcoming Appointments</h2>
          <p>{{ upcomingAppointments.length }}</p>
        </div>
        <div class="card">
          <h2>Booked Services</h2>
          <p>{{ bookedServices.length }}</p>
        </div>
        <div class="card">
          <h2>Barn Status</h2>
          <p>{{ barnStatus }}</p>
        </div>
      </div>
      
      <div class="charts">
        <h2>Statistics</h2>
        <canvas id="petChart"></canvas>
      </div>
      
      <div class="appointments">
        <h2>Upcoming Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in upcomingAppointments" :key="appointment.id">
              <td>{{ appointment.petName }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.time }}</td>
              <td>{{ appointment.doctor }}</td>
              <td>{{ appointment.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="services">
        <h2>Booked Services</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Pet</th>
              <th>Service</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in bookedServices" :key="service.id">
              <td>{{ service.id }}</td>
              <td>{{ service.customer }}</td>
              <td>{{ service.pet }}</td>
              <td>{{ service.name }}</td>
              <td>{{ service.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    data() {
      return {
        totalPets: 10,
        upcomingAppointments: [
          { id: 1, petName: 'Buddy', date: '2024-07-01', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' },
          { id: 2, petName: 'Mittens', date: '2024-07-02', time: '11:00 AM', doctor: 'Dr. Brown', status: 'Pending' }
        ],
        bookedServices: [
          { id: 1, customer: 'Lê Chi', pet: 'Destiny', name: 'Grooming', date: '2024-07-01' },
          { id: 2, customer: 'Lê Chi', pet: 'Dorry', name: 'Vaccination', date: '2024-07-03' }
        ],
        barnStatus: 'Normal'
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.petChart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total Pets', 'Upcoming Appointments', 'Booked Services'],
            datasets: [{
              label: 'Statistics',
              data: [this.totalPets, this.upcomingAppointments.length, this.bookedServices.length],
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
              borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
  
  .dashboard {
    width: 80%;
    margin: auto;
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .overview {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex: 1;
    margin: 0 10px;
  }
  
  .card h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: #36a2eb;
  }
  
  .card p {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
  }
  
  .charts {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .appointments, .services {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  ul li:last-child {
    border-bottom: none;
  }
  </style>
  