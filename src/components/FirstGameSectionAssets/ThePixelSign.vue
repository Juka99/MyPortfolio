<template>
  <div :class="signClass">
    <p :class="`${signClass}__text pixelSignText`">{{ signText }}</p>
    <TheImage :imagePath="imagePath" :alt="altText" class="pixelSign" />
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';

  // Props
  defineProps({
    signClass: String, // Custom class for the sign
    signText: String, // Text displayed on the sign
    imagePath: {
      type: String,
      default: 'pixelSignDirection.webp', // Default image path
    },
    altText: String, // Alt text for the image
  });
</script>

<style scoped>
  @import '../../assets/css/_pixelSigns.scss';
  /* Any shared styles can go here */
</style>
