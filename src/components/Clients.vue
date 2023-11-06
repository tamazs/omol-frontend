<template>
    <div class="image-grid" @mousemove="handleMouseMove" ref="imageGrid">
      <div class="image" v-for="(client, index) in cState.clients" :key="index">
        <img v-if="client.attributes.url" :src="client.attributes.url" alt="Image" />
      </div>
      <div ref="myDiv" class="my-div" @click="sendEmail">
        Wanna work with us?
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import client from '../modules/client';

const { cState, getClients } = client();

  const myDiv = ref(null);
  const imageGrid = ref(null);
  
  const handleMouseMove = (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
  
    const rect = imageGrid.value.getBoundingClientRect();
  
    const divHalfWidth = myDiv.value.offsetWidth / 2;
    const divHalfHeight = myDiv.value.offsetHeight / 2;
  
    const isInside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;
  
    if (isInside) {
      gsap.to(myDiv.value, {
        x: clientX - rect.left - divHalfWidth,
        y: clientY - rect.top - divHalfHeight,
        duration: 0.5
      });
    }
  };
  
  const sendEmail = () => {
    window.location.href = "mailto:example@email.com?subject=Hello&body=Hi there!";
  };
  
  onMounted(() => {
    imageGrid.value.addEventListener("mousemove", handleMouseMove);
    getClients();
  });
  
  </script>
  
  <style scoped>
  @media (max-width: 767px) {
   .my-div {
    visibility: hidden !important;
   }

   .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important;
  }
  }
  .image-grid {
    display: grid;
    padding: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 0px;
    cursor: none;
    margin-bottom: 10rem;
  }
  
  .image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    padding: 2.5rem;
  }
  
  .image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .my-div {
    width: 8rem;
    height: 8rem;
    background-color: var(--c-red);
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(16, 0, 54, 0.2);
    color: var(--c-white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    visibility: visible;
  }
  </style>
  