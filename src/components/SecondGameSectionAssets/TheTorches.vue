<template>
  <div class="torches">
    <TheImage
      v-for="(cloud, index) in cloudConfigs"
      :key="index"
      :imagePath="cloud.imagePath"
      alt="Pixel Torch"
      class="pixelTorch"
      :style="{
        left: cloud.left + 'px',
        zIndex: cloud.zIndex,
      }"
    />
  </div>
</template>

<script setup>
  import { nextTick, watch } from 'vue';
  import TheImage from '../Image/TheImage.vue';

  // Prop for showing torches
  const props = defineProps(['lightTorches']);

  // Watch for torches prop changes
  watch(
    () => props.lightTorches,
    async newLightTorches => {
      await nextTick();
      if (newLightTorches) {
        // Loop through cloud configurations and add class to each of the elements but in seperate times
        cloudConfigs.forEach((cloud, index) => {
          setTimeout(() => {
            const torch = document.querySelector(
              `.pixelTorch:nth-child(${index + 1})`
            );
            torch.classList.add('torches--active');
          }, index * 500);
        });
      }
    }
  );

  // Define cloud configurations
  const cloudConfigs = [
    {
      left: 2600,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 3100,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 3600,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 4100,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 4600,
      imagePath: 'pixelTorch.webp',
    },
    // After Skills Section
    {
      left: 6000,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 6500,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 7000,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 7500,
      imagePath: 'pixelTorch.webp',
    },
    // After ending section
    {
      left: 8800,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 9300,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 9800,
      imagePath: 'pixelTorch.webp',
    },
    {
      left: 10300,
      imagePath: 'pixelTorch.webp',
    },
    // Add more configurations as needed
  ];
</script>

<style lang="scss" scoped>
  @import '../../assets/css/breakpoints.scss';

  .torches {
    position: absolute;
    width: 100%;
    height: 200px;
    overflow: visible;
    bottom: 460px;

    @include breakpoint-height(v800) {
      bottom: 370px;
    }

    @include breakpoint-height(v700) {
      bottom: 300px;
    }

    @include breakpoint-height(v600) {
      bottom: 230px;
    }

    @include breakpoint-height(v500) {
      bottom: 185px;
    }

    @include breakpoint-height(v450) {
      bottom: 150px;
    }

    @include breakpoint-height(v400) {
      bottom: 90px;
    }
  }

  .pixelTorch {
    position: absolute;
    z-index: 1;
    width: 20px;
    opacity: 0;
    transition: 0.4s;

    @include breakpoint-height(v700) {
      width: 18px;
    }

    @include breakpoint-height(v600) {
      width: 16px;
    }

    @include breakpoint-height(v500) {
      width: 14px;
    }
  }

  // Glow and float toarch animation
  .torches--active {
    opacity: 1;
    animation:
      torchGlow 0.7s infinite alternate,
      torchFloat 2s infinite;
  }

  @keyframes torchGlow {
    0% {
      filter: drop-shadow(0 0 14px #f9aa50);
    }
    100% {
      filter: drop-shadow(0 0 22px #f9aa50);
    }
  }

  @keyframes torchFloat {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
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
