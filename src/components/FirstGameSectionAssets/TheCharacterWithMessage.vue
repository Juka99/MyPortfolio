<template>
  <div :class="`${characterClass}-container`">
    <TheImage :imagePath="imagePath" :alt="altText" :class="characterClass" />

    <div :class="bubbleClass">
      <p :class="`${bubbleClass}__text`">{{ bubbleText }}</p>
      <TheImage
        imagePath="pixelBubble.webp"
        alt="Pixel Talking Bubble"
        class="pixelBubble"
      />
    </div>
  </div>
</template>

<script setup>
  import TheImage from '../Image/TheImage.vue';

  // Props
  defineProps({
    imagePath: String, // Path to the character image
    altText: String, // Alt text for the character image
    characterClass: String, // Custom class for the character image
    bubbleText: String, // Text displayed in the bubble
    bubbleClass: String, // Custom class for the bubble container
  });
</script>

<style scoped>
  @import '../../assets/css/_characterMessages.scss';
  /* You can add any shared styles here, but specific styles should stay in the parent context */
</style>
