<template>
  <div class="chat-box" :class="{ 'chat-box-open': isOpen }">
    <div class="chat-header">
      <h3>Chat Box</h3>
      <button @click="$emit('close')">Close</button>
    </div>
    <div class="chat-messages">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.type">
        {{ msg.text }}
      </div>
    </div>
    <div class="chat-input">
      <input type="text" v-model="message" placeholder="Type a message..." @keyup.enter="sendMessage">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { HubConnectionBuilder } from '@microsoft/signalr';
import { SYS_API_URL } from "../constants/global";

export default {
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      message: '',
      messages: []
    };
  },
  mounted() {
    // Create a new SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl(SYS_API_URL + '/chathub')
      .build();

    // Start the connection
    connection.start()
      .then(() => {
        console.log('SignalR Connected.');

        // Handle incoming messages
        connection.on('ReceiveMessage', (user, message) => {
          this.messages.push({ type: 'received', text: message });
          this.scrollToBottom(); // Scroll to bottom on new message
        });
      })
      .catch(error => {
        console.error('SignalR Connection Error: ', error);
      });

    // Assign connection to a property for cleanup if needed
    this.connection = connection;
  },
  beforeUnmount() {
    // Ensure to stop SignalR connection when component unmounts
    if (this.connection) {
      this.connection.stop();
    }
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        // Send message via SignalR
        this.connection.invoke('SendMessage', 'User', this.message)
          .catch(error => {
            console.error('Error sending message:', error);
          });

        // Add sent message to local messages array
        this.messages.push({ type: 'sent', text: this.message });
        this.message = '';

        this.scrollToBottom(); // Scroll to bottom after sending message
      }
    },
    scrollToBottom() {
      // Scroll to bottom of messages container
      const chatMessages = this.$refs.chatMessages;
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }
};
</script>

<style scoped>
.chat-box {
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: bottom 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-box-open {
  bottom: 0;
}

.chat-header {
  padding: 15px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.chat-header button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #fff;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #f1f3f5;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
}

.chat-input button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.sent, .received {
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
}

.sent {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  margin-left: auto;
}

.received {
  align-self: flex-start;
  background-color: #e9ecef;
  color: #343a40;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>