<template>
    <div class="text-container" ref="textContainer" id="sendLove">
      <p class="before-text">{{ $t('home.footerTextBefore') }}</p>
      <p class="text">{{ $t('home.footerText') }}</p>
    </div>
    <div class="form-container">
      <form @submit.prevent="validateAndSend" id="form">
        <input 
          type="text" 
          v-model="name"
          name="from_name"
          :placeholder="$t('home.namePh')"
          :class="{ 'red-border': !nameFilled && formSubmitted }"
          required
        >
        <!-- Display error message if name is not filled -->
        <div v-if="formSubmitted && !nameFilled" class="error-message">Please fill your name</div>
        <input 
          type="email" 
          v-model="email"
          name="from_email"
          :placeholder="$t('home.emailPh')"
          :class="{ 'red-border': !emailFilled && formSubmitted }"
          required
        >
        <!-- Display error message if email is not filled -->
        <div v-if="formSubmitted && !emailFilled" class="error-message">Please fill your email</div>
        <textarea 
          name="message"
          v-model="message"
          cols="1" rows="20"
          :placeholder="$t('home.msgPh')"
          :class="{ 'red-border': !messageFilled && formSubmitted }"
          required
        ></textarea>
        <!-- Display error message if message is not filled -->
        <div v-if="formSubmitted && !messageFilled" class="error-message">Please fill your message</div>
        
        <input type="submit" value="Send">
      </form>
    </div>
  </template>  
  
  <script setup>
  import { ref } from 'vue';
  import emailjs from 'emailjs-com';
  
  const name = ref('');
  const email = ref('');
  const message = ref('');
  const formSubmitted = ref(false);
  
  const nameFilled = ref(false);
  const emailFilled = ref(false);
  const messageFilled = ref(false);
  const isEmailValid = ref(true); // Initialize as valid
  
  function validateAndSend() {
    // Check if any of the fields are empty
    if (!name.value || !email.value || !message.value) {
      formSubmitted.value = true;
  
      // Check which fields are empty
      nameFilled.value = !!name.value;
      emailFilled.value = !!email.value;
      messageFilled.value = !!message.value;
  
      return;
    }
  
    // Validate email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid.value = emailRegex.test(email.value);
  
    // Check if the email is valid
    if (!isEmailValid.value) {
      formSubmitted.value = true;
      return;
    }
  
    try {
        const form = document.getElementById('form');
      emailjs.sendForm('service_6pp8szh', 'template_qrlfzrs', form, 'user_BQFQijhqHXFB6Bf3qVGTt');
    } catch (error) {
      console.log({ error });
    }
  
    // Reset form fields and flags
    name.value = '';
    email.value = '';
    message.value = '';
    formSubmitted.value = false;
    nameFilled.value = false;
    emailFilled.value = false;
    messageFilled.value = false;
    isEmailValid.value = true; // Reset email validation flag
  }
  </script>
  
  <style scoped lang="scss">
  @media (max-width: 767px) {
    .text-container .text {
    padding: 5rem 2rem 2rem 2rem !important;
  }

  .text-container {
    font-size: var(--t-header2) !important;
    margin-top: 0rem !important;
  }

  form {
    padding: 5rem 2rem 2rem 2rem !important;
  }

  input[type=submit] {
    width: 40% !important;
  }

  .before-text {
    width: 70vw !important;
  }
  }
  .text-container {
    height: auto;
    width: 100vw;
    font-size: var(--t-bigText);
    background-color: var(--c-white);
    position: relative;
    overflow: hidden;
  }
  
  .text-container .text {
    padding: 6rem 15rem 4rem 3rem;
    line-height: 3rem;
    font-family: var(--f-thin);
  }
  
  .before-text {
    font-size: var(--t-body);
    text-transform: uppercase;
    padding: 0 3rem;
    width: 18vw;
  }
  
  .before-text::before {
    content: '';
    width: 15px;
    height: 15px;
    background-color: #F0444A;
    border-radius: 50%;
    position: absolute;
    left: 1.5rem;
    top: 0.07rem;
    z-index: 2;
    line-height: 0px;
  }
  
  form {
    padding: 0rem 3rem 6rem 3rem;
    display: flex;
    flex-direction: column;
  }
  
  input[type=text], [type=email], textarea {
    width: 100%;
    padding: 15px;
    background-color: #E8E3E0;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 4px;
    resize: vertical;
  }

  input::placeholder {
  font-family: var(--f-regular);
  text-transform: uppercase;
  font-size: 1.2rem;
  }

  textarea::placeholder {
  font-family: var(--f-regular);
  text-transform: uppercase;
  font-size: 1.2rem;
  }
  
  input[type=submit] {
    background-color: var(--c-red);
    color: var(--c-white);
    padding: 12px 20px;
    border: none;
    border-radius: 50px;
    cursor:url('../assets/cursor.png'), auto;
    width: 20%;
    margin-top: 30px;
    font-family: var(--f-thin);
    text-transform: uppercase;
    font-size: 1.2rem;
  }

  
  .red-border {
    border: 1px solid var(--c-red);
  }

  .error-message {
  color: var(--c-red);
  font-size: 12px;
}
  </style>
  