<template>
  <div class="clouds" v-if="imagesLoaded">
    <TheImage
      v-for="(cloud, index) in cloudConfigs"
      :key="index"
      :imagePath="cloud.imagePath"
      alt="Pixel Cloud"
      class="pixelCloud"
      :style="{
        left: cloud.left + 'px',
        top: cloud.top + 'px',
        width: cloud.width + 'px',
        zIndex: cloud.zIndex,
        '--cloud-duration': cloud.duration + 's',
        '--cloud-movement-distance': cloud.movementDistance + 'px',
        '--cloud-transform': cloud.transform,
      }"
    />
  </div>

  <!-- <div v-else>Loading clouds...</div> -->
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import TheImage from '../Image/TheImage.vue';

  // Define cloud configurations
  const cloudConfigs = [
    {
      left: 520,
      top: 70,
      width: 320,
      duration: 7.5,
      movementDistance: 15,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudOne.webp',
    },
    {
      left: 1000,
      top: 50,
      width: 230,
      duration: 4,
      movementDistance: 10,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudTwo.webp',
    },
    {
      left: 1450,
      top: 50,
      width: 350,
      duration: 5,
      movementDistance: -20,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    {
      left: 480,
      top: 100,
      width: 250,
      duration: 6,
      movementDistance: -15,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudThree.webp',
    },
    {
      left: 70,
      top: 50,
      width: 300,
      duration: 7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudTwo.webp',
    },
    // Second ones
    {
      left: 2400,
      top: 50,
      width: 320,
      duration: 7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudTwo.webp',
      zIndex: 2,
    },
    {
      left: 1950,
      top: 50,
      width: 340,
      duration: 6,
      movementDistance: -14,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudOne.webp',
    },
    {
      left: 2600,
      top: 50,
      width: 280,
      duration: 5,
      movementDistance: -18,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    {
      left: 3000,
      top: 50,
      width: 220,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudTwo.webp',
    },
    {
      left: 3400,
      top: 50,
      width: 290,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    // Third ones
    {
      left: 4200,
      top: 50,
      width: 320,
      duration: 7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudTwo.webp',
      zIndex: 2,
    },
    {
      left: 3750,
      top: 50,
      width: 340,
      duration: 6,
      movementDistance: -14,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudOne.webp',
    },
    {
      left: 4400,
      top: 50,
      width: 280,
      duration: 5,
      movementDistance: -18,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    {
      left: 4800,
      top: 50,
      width: 220,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudTwo.webp',
    },
    {
      left: 5200,
      top: 50,
      width: 290,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    // Fourth ones
    {
      left: 6000,
      top: 50,
      width: 320,
      duration: 7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudTwo.webp',
      zIndex: 2,
    },
    {
      left: 5550,
      top: 50,
      width: 340,
      duration: 6,
      movementDistance: -14,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudOne.webp',
    },
    {
      left: 6200,
      top: 50,
      width: 280,
      duration: 5,
      movementDistance: -18,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    {
      left: 6600,
      top: 50,
      width: 220,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(1)',
      imagePath: 'pixelCloudTwo.webp',
    },
    {
      left: 7000,
      top: 50,
      width: 290,
      duration: 6.7,
      movementDistance: -12,
      transform: 'scaleX(-1)',
      imagePath: 'pixelCloudThree.webp',
    },
    // Fifth ones
    {
      left: 7400,
      top: 50,
      width: 250,
      duration: 6.7,
      movementDistance: -12,
      imagePath: 'pixelCloudThree.webp',
    },
    // Add more configurations as needed
  ];

  const imagesLoaded = ref(false);

  const preloadImages = imagePaths => {
    const promises = imagePaths.map(path => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        // Use import.meta.url to resolve paths correctly in Vite
        img.src = new URL(`/src/assets/images/${path}`, import.meta.url).href;
        img.onload = resolve;
        img.onerror = () => reject(`Failed to load image: ${path}`);
      });
    });

    return Promise.all(promises);
  };

  onMounted(async () => {
    const imagePaths = cloudConfigs.map(cloud => cloud.imagePath);
    try {
      console.log(imagePaths);
      await preloadImages(imagePaths);
      imagesLoaded.value = true;
      console.log('All cloud images preloaded successfully.');
    } catch (error) {
      console.error('Failed to preload some images:', error);
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_breakpoints.scss';

  .clouds {
    position: relative;
    width: 100%; /* Adjust as needed for your horizontal app */
    height: 200px; /* Cloud container height */
    overflow: visible; /* Allow clouds to move beyond container */

    @include breakpoint-height(v800) {
      bottom: 20px;
    }

    @include breakpoint-height(v500) {
      display: none;
    }
  }

  .pixelCloud {
    position: absolute;
    z-index: 1;
    animation: moveCloud var(--cloud-duration, 5s) steps(3) infinite;
    animation-direction: var(--cloud-direction, normal);
    --cloud-transform: scaleX(1);

    @include breakpoint-height(v800) {
      width: 250px !important;
    }

    @include breakpoint-height(v700) {
      width: 200px !important;
    }

    @include breakpoint-height(v600) {
      width: 170px !important;
    }
  }

  @keyframes moveCloud {
    0% {
      transform: var(--cloud-transform, none) translateX(0);
    }
    50% {
      transform: var(--cloud-transform, none)
        translateX(calc(var(--cloud-movement-distance, 10px)));
    }
    100% {
      transform: var(--cloud-transform, none) translateX(0);
    }
  }
</style>
